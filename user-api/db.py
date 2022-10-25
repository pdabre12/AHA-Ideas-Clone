from datetime import datetime
from time import time
import pymysql
from aws_credentials import rds
import uuid

conn = pymysql.connect(
    host=rds['host'],
    port= rds['port'],
    user=rds['user'],
    password=rds['password'],
    db=rds['db']
)

# cursor = conn.cursor()

# create_table = """
# create table Users (username varchar(20) primary key not null, firstname char(20) not null, lastname char(20) not null, password char(100) not null , company char(30) not null)
# """
# cursor.execute(create_table)

# cursor = conn.cursor()
# cursor.execute("DROP TABLE Sessions")
# create_table_sessions = """
# create table Sessions (username varchar(20) not null, ip_address varchar(100) not null primary key,  SessionID varchar(100) not null , time_created int(20) not null)

# """
# cursor.execute(create_table_sessions)



def insert_details(username,firstname,lastname,password,company):
    cur = conn.cursor()
   
    cur.execute("""
    INSERT INTO Users (username,firstname,lastname,password,company) 
    VALUES ('{0}','{1}','{2}','{3}','{4}')
    """ .format(username,firstname,lastname,password,company))
    ## values must be wrapped in " " or else mysql will think you are trying to copy values from one column to another one.
    conn.commit()



def get_all_users():
    curr = conn.cursor()
    curr.execute("SELECT * FROM Users")
    users = curr.fetchall()
    return users


def login_check(username):
    curr = conn.cursor()
    curr.execute("""
    SELECT * from Users where `username` = '{0}' 
""".format(username))

    user = curr.fetchone()
    return user


def create_session(username,ip_address):
    curr = conn.cursor()
    session = uuid.uuid4()
    timestamp = datetime.now()

    time_created_at = timestamp.timestamp()
    curr.execute("""INSERT INTO Sessions (username,ip_address,SessionID,time_created) 
    VALUES ('{0}','{1}','{2}',{3})
    """ 
    .format(username,ip_address,session,time_created_at))
    conn.commit()


def get_session_id(username,ip_address):
    curr = conn.cursor()
    curr.execute("""SELECT SessionID FROM Sessions WHERE `username` = '{0}' and `ip_address` = '{1}'
    """
    .format(username,ip_address))
    session_id = curr.fetchone()  
    return session_id


def get_session_from_username(username,session_id):
    curr = conn.cursor()
    timestamp = datetime.now()

    time_created_at = timestamp.timestamp()
    curr.execute("""
    DELETE FROM Sessions WHERE {0} - time_created > 1800
    """
    .format(time_created_at))
    conn.commit()

    curr.execute("""SELECT ip_address FROM Sessions WHERE `username` = '{0}' and `SessionID` = '{1}'
    """
    .format(username,session_id))

    ip_address = curr.fetchone()
    return ip_address