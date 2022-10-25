import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {Link, useLocation, useParams, useNavigate} from 'react-router-dom';
import {Alert, Image, Row, Col, Card, Button, Form} from 'react-bootstrap';
import axios from 'axios';
import FormContainer from '../components/FormContainer';
const users_URL = 'https://xcyqlagewb.execute-api.us-west-2.amazonaws.com/';

const RegisterScreen = ({ }) => {
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [company, setCompany] = useState('');
    const [warning, setWarning] = useState(false);
    const [error, setError] = useState(null);

    const navigate = useNavigate();
    let location = useLocation();

    const user = null;

    const redirect = location.search ? location.search.split('=')[1] : '/';


    useEffect(() => {


    }, [user, warning])

    const submitHandler = (e) => {
        e.preventDefault();
        setError(null);

        const data ={
            firstname: firstname,
            lastname: lastname,
            username: username,
            password: password,
            company: company,
        }
          
        var config = {
            method: 'post',
            url: `${users_URL}/user/register`,
            headers: { 
                'Content-Type': 'application/json'
        },
            data : data
        };

        
        if(password === confirmPassword){
            setWarning(false);
            //Make request & if successful redirect to portal
            axios(config)
            .then(function (response) {
                console.log(JSON.stringify(response.data));
                localStorage.setItem('userInfo', JSON.stringify(response.data));
                navigate('/')
            })
            .catch(function (error) {
                setError(error);
                console.log(error.response.data.error.message);
            });
        }else{
            setWarning(true);
        }
        
    }

    return(
        <div style={{height:'100vh'}}>
       <FormContainer>
            <h2>Register</h2>
            {warning &&
                <Alert variant='warning'>
                    Passwords must match!
                </Alert>
            }
            {error && 
                <Alert variant='warning'>
                    {error.response.data.error.message}
                </Alert>
            }
            <Form onSubmit={submitHandler}>
                <Form.Group controlId='firstname' className='my-3'>
                    <Form.Label>First Name</Form.Label>
                    <Form.Control 
                        required={true}
                        type='text' 
                        placeholder='Enter First Name'
                        value={firstname}
                        onChange={(e) => setFirstname(e.target.value)}>
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='lastname' className='my-3'>
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control 
                        required={true}
                        type='text' 
                        placeholder='Enter Last Name'
                        value={lastname}
                        onChange={(e) => setLastname(e.target.value)}>
                    </Form.Control>
                </Form.Group>

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

                <Form.Group controlId='email' className='my-3'>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control 
                        required={true}
                        type='email' 
                        placeholder='Enter Email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}>
                    </Form.Control>
                </Form.Group>
                
                <Form.Group controlId='password'  className='my-3'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control 
                        required={true}
                        type='password' 
                        placeholder='Enter Password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}>
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='confirmpassword'  className='my-3'>
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                        required={true}
                        type='password' 
                        placeholder='Confirm Password'
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}>
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='company' className='my-3'>
                    <Form.Label>Company</Form.Label>
                    <Form.Control 
                        required={true}
                        type='text' 
                        placeholder='Enter Company'
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}>
                    </Form.Control>
                </Form.Group>
                
                <div style={{display: 'flex', justifyContent: 'flex-end'}}>
                    <Button type='submit' variant='primary'  className='my-3'>
                        Create An Account
                    </Button>
                </div>
            </Form>

           <Row className='py-3'>
               <Col>
                    Already Registered?{' '}
                    <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>
                        Log In
                    </Link>
               </Col>
           </Row>
           
       </FormContainer >
       </div>
    )
}

export default RegisterScreen;