#!/bin/env python

from flask import Flask, request,jsonify
from werkzeug.security  import generate_password_hash, check_password_hash
from flask_cors import CORS,cross_origin


import db
from errors import errors
from pymysql.err import IntegrityError,DataError

app = Flask(__name__)

CORS(app)


@app.route('/user/register',methods=['POST'])
@cross_origin()
def register():
    if request.method == 'POST':
        try:

            data = request.get_json()
            firstname = data['firstname']
            lastname = data['lastname']
            username = data['username']
            company = data['company']
            
            hashed_password = generate_password_hash(data['password'],method = 'sha256')


            #Get the public ip address
            ip_addr = request.environ.get('HTTP_X_FORWARDED_FOR', request.remote_addr)
            #Hash the IP address
            hashed_ip = generate_password_hash(ip_addr,method = 'sha256')

            
            if (firstname and lastname and username and company and hashed_password ):
                db.insert_details(username,firstname,lastname,hashed_password,company)
                if hashed_ip:
                    db.create_session(username,hashed_ip)
                    session_id = db.get_session_id(username,hashed_ip)
                    if not session_id:
                     raise Exception
                
                    return jsonify({'username':username,'SessionID':session_id[0]}),200
            else:
                return jsonify({'error':errors['SchemaValidationError']}), 400

        except (IntegrityError):
            return jsonify({'error':errors['UserNameAlreadyExistsError']}), 401

        except Exception :
            return(jsonify({'error':errors['InternalServerError']}), 500)
            



    


@app.route('/all-users',methods=['GET'])
@cross_origin()
def all_users():
    try:
        user_count = db.get_all_users()
        result = []
        if not user_count:
            raise Exception
            
        for user in user_count:
            result.append({'username':user[0],'firstname':user[1],'lastname':user[2],'company':user[4]})
        # Output the query result as JSON
        return jsonify(result)

    except Exception:
        return (jsonify({'error':errors['InternalServerError']}), 500)
    

@app.route('/user/login',methods=['POST'])
@cross_origin()
def login():
    if request.method == 'POST':
        try:
            data = request.get_json()
            username = data['username']
            password =  data['password']

            #Get the public ip address
            ip_addr = request.environ.get('HTTP_X_FORWARDED_FOR', request.remote_addr)
            #Hash the IP address
            hashed_ip = generate_password_hash(ip_addr,method = 'sha256')
            
            user = db.login_check(username)
            if user is None:
                raise DataError
            correct_password = check_password_hash(user[3],password)
            if correct_password and hashed_ip:
                db.create_session(username,hashed_ip)
                session_id = db.get_session_id(username,hashed_ip)
                if not session_id:
                    raise Exception

                return jsonify({'username':username,'SessionID':session_id[0]}),200
            else:
                raise IntegrityError

        except(DataError):
            return jsonify({'error':errors['UsernameNotExistsError']}),400

        except (IntegrityError):
            return jsonify({'error':errors['UnauthorizedError']}), 401

        except Exception :
            return(jsonify({'error':errors['InternalServerError']}), 500)



@app.route('/users/get-sessions/<username>/<session_id>')
@cross_origin()
def get_session_from_id(username,session_id):
    try:
        if username and session_id:
            userloggedin = db.get_session_from_username(username,session_id)
            
            if not userloggedin:
                raise DataError
            else:
                return jsonify({'message':'User is already logged in'}),200
        
        else:
            raise Exception

    except(DataError):
        return jsonify({'message':'Please login again'}),400
    
    except Exception:
        return (jsonify({'error':errors['InternalServerError']}), 500)



if __name__=='__main__':
    app.run(host='0.0.0.0', port=5000,debug=True)