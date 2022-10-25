import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import {Link, useLocation, useParams, useNavigate} from 'react-router-dom';
import {Row, Col, Button, ButtonGroup, ListGroup, Container} from 'react-bootstrap';
const ideas_URL = 'https://5r3zbiuz85.execute-api.us-west-2.amazonaws.com';

const Votes = ({id, setSmShow, setSigninModalShow}) =>{
    let customButtonColor = 'steelblue';
    const [votes, setVotes] = useState('');

    const userLogin = useSelector((state) => state.userLogin);
    const {loading, error, userInfo} = userLogin;


    useEffect(() => {
        if(votes.length === 0){
            getVotes(id)
        }
    }, [votes])
    
    const getVotes = (id) =>{
        var config = {
            method: 'get',
            url: `${ideas_URL}/ideas/vote/${id}`,
            headers: {'Content-Type': 'application/json' }
        };
        
        axios(config)
        .then(function (response) {
            console.log('count:', response.data.count);
            setVotes(response?.data?.count)
        })
        .catch(function (error) {
            console.log(error);
            setVotes('0');
        });
    }

    const voteHandler = (e) => {
        e.preventDefault();
        if(userInfo){
            const request = {
                username: userInfo.username,
                ideaId: id,
            }
            console.log('request', request);

            //Make request
            var config = {
                method: 'post',
                url: `${ideas_URL}/ideas/vote`,
                headers: {'Content-Type': 'application/json' },
                data : request
            };
            
            axios(config)
            .then(function (response) {
                if(response.status === 200){
                    console.log(response.data);
                    getVotes(id);

                }
            })
            .catch(function (error) {
                console.log(error);
                
                    console.log("400 user as already voted");
                    setSmShow(true);
                
        });
        }else{
            setSigninModalShow(true);
        }
    }


    return(
        <div>
            <Row >
                <h3 className="text-center">{votes}</h3>
            </Row>
            <Row>
                <Button style={{ borderColor: customButtonColor, backgroundColor:  customButtonColor}} onClick={voteHandler}>VOTE</Button>
            </Row>
        </div>
    )
}

export default Votes;