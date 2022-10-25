import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {Link, useLocation, useNavigate} from 'react-router-dom';
import {Row, Col, Button, Form, Alert} from 'react-bootstrap';
import FormContainer from '../components/FormContainer';
import {login} from '../actions/userActions';




const LoginScreen = ({ }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    let location = useLocation();
    const dispatch = useDispatch();

    const redirect = location.search ? location.search.split('=')[1] : '/';

    const userLogin = useSelector((state) => state.userLogin);
    const {loading, error, userInfo} = userLogin;


    useEffect(() => {
        if(userInfo){
            navigate('/');
        }
    }, [userInfo])

    const submitHandler = (e) => {
        e.preventDefault();

        dispatch(login(username, password));
    }

    return(
        <div style={{height:'100vh'}}>
        <FormContainer>
            <h2>Sign In</h2>
            {error &&
                <Alert variant='warning'>
                    {error.response.data.error.message}
                </Alert>
            }
            <Form onSubmit={submitHandler}>
                <Form.Group controlId='username' className='my-3'>
                    <Form.Label>Username</Form.Label>
                    <Form.Control 
                        required={true}
                        type='text' 
                        placeholder='Enter Username'
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}>
                    </Form.Control>
                </Form.Group>
                
                <Form.Group controlId='password' className='my-3'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control 
                        required={true}
                        type='password' 
                        placeholder='Enter Password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}>
                    </Form.Control>
                </Form.Group>

                <div style={{display: 'flex', justifyContent: 'flex-end'}}>
                    <Button type='submit' variant='primary' className='my-3'>
                        Sign In
                    </Button>
                </div>
            </Form>

           <Row className='py-3'>
               <Col>
                    New User?{' '}
                    <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>
                        Register
                    </Link>
               </Col>
           </Row>
           
       </FormContainer >
       </div>
    )
}

export default LoginScreen;