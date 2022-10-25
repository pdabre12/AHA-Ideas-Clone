import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import {Link, useLocation, useParams, useNavigate} from 'react-router-dom';
import {Modal, Row, Col, Button, ButtonGroup, ListGroup, Container} from 'react-bootstrap';
import {FiMessageSquare} from 'react-icons/fi';
import Guest from '../images/guest.PNG';
//import Votes from './Votes';
const ideas_URL = 'https://5r3zbiuz85.execute-api.us-west-2.amazonaws.com';


const AdminScreen = ({idea}) => {
    let customButtonColor = 'steelblue';
    let navigate = useNavigate();
    const [smShow, setSmShow] = useState(false);
    

    const [ideas, setIdeas] = useState([]);
    const [signinModelShow, setSigninModalShow] = useState(false);

    const userLogin = useSelector((state) => state.userLogin);
    const {loading, error, userInfo} = userLogin;


    useEffect(() =>{
        if(!userInfo){
            //redirect to login
        }else{
            console.log(idea);
        }
    }, [])

    const getVotes = (id) =>{
        var config = {
            method: 'get',
            url: `${ideas_URL}/ideas/vote/${id}`,
            headers: {'Content-Type': 'application/json' }
        };
        
        axios(config)
        .then(function (response) {
            //console.log('count:', response.data.count);
            //setVotes(response?.data?.count)
        })
        .catch(function (error) {
            console.log(error);
            //setVotes('0');
        });
    }
    
    const getColor = (status) => {
        switch (status){
            case 'Submitted':
                return 'khaki';
            case 'Under review':
                return 'lightgreen';
            case 'Needs more information':
                return 'lavender';
            case 'Future consideration':
                return 'palegoldenrod ';
            case 'Planned for future release':
                return 'beige';
            case 'Functionally already exists':
                return 'thistle';
            case 'Is a defect':
                return 'springgreen'
            case 'Not under consideration':                  
                return 'lightgrey'
            case 'Delivered': 
                return 'green';                             
            default:
                return 'white';
            
        }

    }

    const getDate = (input) => {
        var date = new Date(input);
        var mm = date.getMonth()+1;
        var dd = date.getDate();
        var yy = date.getFullYear();
        return mm + '/' + dd + '/' + yy;
    }

    

    return(
        <>

            <Container className='' >
            <Row>
                
                <Col>  

                <Row>
                    <Link to={`/ideas/${idea.id}`} style={{color: 'black', textDecoration: 'none' }} ><h5>{idea.title}</h5></Link>
                </Row>
                <Row className='px-2'>
                    {idea.description}
                </Row>
    
                </Col>
                <Col>
                    <Row>
                        {getDate(idea.created)}
                    </Row>
                    <Row>
                        {idea.category}   
                    </Row>

                    <Row>
                        <Button
                            size='sm' 
                            disabled={true}
                            style={{
                                color:'black', 
                                backgroundColor: (getColor(idea.status)),
                                borderColor:  (getColor(idea.status))
                            }}>
                                {idea.status}
                            </Button>
                    </Row>
                    
                </Col>
            </Row>
            
            </Container>
        </>
    )
}

export default AdminScreen;