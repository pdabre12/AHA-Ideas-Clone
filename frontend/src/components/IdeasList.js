import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import {Link, useLocation, useParams, useNavigate} from 'react-router-dom';
import {Modal, Row, Col, Button, ButtonGroup, ListGroup, Container} from 'react-bootstrap';
import {FiMessageSquare} from 'react-icons/fi';
import Guest from '../images/guest.PNG'
import Votes from './Votes'

const IdeasList = ({title, ideas}) => {
    let customButtonColor = 'steelblue';
    const [smShow, setSmShow] = useState(false);
    const [signinModelShow, setSigninModalShow] = useState(false);

    useEffect(() => {
        
    }, [])
    
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
            <Modal
                size="sm"
                show={smShow}
                onHide={() => setSmShow(false)}
                aria-labelledby="example-modal-sizes-title-sm"
                centered
            >
                <Modal.Header closeButton>
                <Modal.Title id="example-modal-sizes-title-sm">
                    Alert
                </Modal.Title>
                </Modal.Header>
                <Modal.Body>You have already voted!</Modal.Body>
                
            </Modal>

            <Modal
                size="sm"
                show={signinModelShow}
                onHide={() => setSigninModalShow(false)}
                aria-labelledby="example-modal-sizes-title-sm"
                centered
            >
                <Modal.Header closeButton>
                <Modal.Title id="example-modal-sizes-title-sm">
                    Alert
                </Modal.Title>
                </Modal.Header>
                <Modal.Body>Please sign in to vote!</Modal.Body>
                
            </Modal>

            <Container style={{backgroundColor: 'white'}} className='py-4 px-4' >
                <Row>
                    <h2>{title}</h2>
                </Row>
                <br/>
                <ListGroup>
                    {ideas.length === 0 ? (
                    <>
                        <Row className='mx-3'> 0 Ideas</Row>
                    </>
                    )
                    : (
                    
                    ideas?.map(idea => {
                        return(
                            <Container key={idea.id}>
                                <Row>
                                    <Col xs={1}>
                                        <Votes id={idea.id} setSmShow={setSmShow} setSigninModalShow={setSigninModalShow}/>                        
                                    </Col>
                                    
                                    <Col>  
                                        <Container>
                                            <Row>
                                                <Link to={`/ideas/${idea.id}`} style={{color: 'black', textDecoration: 'none' }} ><h5>{idea.title}</h5></Link>
                                            </Row>
                                            <Row className='px-2'>
                                                {idea.description}
                                            </Row>
                                            <Row>
                                                
                                                <p className='pt-3'style={{color: 'gray'}}>
                                                    <img src={Guest} width={20} height={20} style={{borderRadius: '50%'}}></img>
                                                    &emsp;
                                                    {getDate(idea?.created)} in {idea.category}   {<FiMessageSquare/>} {idea.response_count} 
                                                    &emsp;
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
                                                </p>
                                                
                                            </Row>

                                        </Container>
                                        
                                    
                                    </Col>

                                </Row>
                                <hr></hr>
                            </Container>
                        )
                    }))}
                </ListGroup>
            </Container>
        </>
    )
}

export default IdeasList;