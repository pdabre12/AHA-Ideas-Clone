import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {Link, useLocation, useParams, useNavigate} from 'react-router-dom';
import {Image, Row, Col, Button, ButtonGroup, ListGroup, Container, Form} from 'react-bootstrap';
import {FiMessageSquare} from 'react-icons/fi';
import Guest from '../images/guest.PNG'

const ProfileScreen = () => {
    let customButtonColor = 'steelblue';
    let navigate = useNavigate();

    const userLogin = useSelector((state) => state.userLogin);
    const {loading, error, userInfo} = userLogin;

    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');

    useEffect(() => {

    }, [userInfo])

    const updateEmailHandler = (e) => {
        //Send update request
        //Fetch user details to update UI
    }

    
    const updateNameHandler = (e) => {
        //Send update request
        //Fetch user details to update UI
    }

    const backButtonHandler = (e) => {
        navigate('/');
    }

    return(
        <div style={{height: '100vh'}}>
        <Row>
            <Col xs={3} className='pb-3'>
                <Button style={{backgroundColor: customButtonColor, borderColor: customButtonColor}} onClick={backButtonHandler}>Back to all ideas</Button>
            </Col>
            <Col className='pb-3'>
                <h5>Edit Profile</h5>
            </Col>
        </Row>
        <Row>
             <Col xs={3}  className='align-items-center justify-content-center text-center'>
                <Container style={{backgroundColor: 'white'}} className='py-5'>
                    <Image width={80} height={80} src={Guest} roundedCircle={true}/>
                    <Row>
                        <p className='text-center pt-4'>{userInfo?.username || 'Username'}</p>
                    </Row>

                    <Row>
                        <Col>
                            <h6 style={{backgroundColor: 'aliceblue'}} className='text-center py-3 px-3'>{userInfo?.ideas || 0} Ideas</h6>
                        </Col>
                        <Col>
                            <h6 style={{backgroundColor: 'aliceblue'}} className='text-center py-3 px-3'>{userInfo?.votes || 0} Votes</h6>
                        </Col>
                    </Row>
                </Container>     
            </Col>

            <Col>
                <Container style={{backgroundColor: 'white'}} className='py-3'>
                    <h5>Name</h5>
                    <p>Your name will be hidden from other ideas portal users but will be visible to your internal Aha! team.</p>
                    <Row>
                        <Form onSubmit={updateNameHandler}>
                            <Form.Group controlId='firstname'>
                                <Form.Label>First Name</Form.Label>
                                <Form.Control 
                                    type='text' 
                                    placeholder='First Name'
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}>
                                </Form.Control>
                            </Form.Group>
                            <Form.Group controlId='lastname'>
                                <Form.Label>Last Name</Form.Label>
                                <Form.Control 
                                    type='text' 
                                    placeholder='Last Name'
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}>
                                </Form.Control>
                            </Form.Group>
                            <Button  style={{backgroundColor: customButtonColor, borderColor: customButtonColor}} className='my-2' type='submit'>Update Name</Button>
                       </Form>
                    </Row>
                </Container>
                <br/>
                <Container style={{backgroundColor: 'white'}} className='py-3'>
                    <h5>Email</h5>
                    <Row>
                        <Form onSubmit={updateEmailHandler}>
                            <Form.Group controlId='email'>
                                <Form.Control 
                                    required={true}
                                    type='email' 
                                    placeholder='Enter Email'
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}>
                                </Form.Control>
                            </Form.Group>
                            <Button style={{backgroundColor: customButtonColor, borderColor: customButtonColor}} className='my-2' type='submit'>Update Email</Button>
                        </Form>
                
                    </Row>
                    
                </Container>
            </Col>
        </Row>
        </div>
    )

}

export default ProfileScreen;