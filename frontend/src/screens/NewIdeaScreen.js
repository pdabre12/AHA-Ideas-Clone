import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {Link, useLocation, useParams, useNavigate} from 'react-router-dom';
import {Container, Row, Col, Button, Form} from 'react-bootstrap';
import axios from 'axios';
const ideas_URL = 'https://5r3zbiuz85.execute-api.us-west-2.amazonaws.com';
const categoryList = ['Analytics Engine', 'Big Replicate', 'Cloud Pak for Data', 'Cognos Analytics', 'Connectivity', 'DataStage', 'Optim', 'Watson']

const NewIdeaScreen = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [neededBy, setNeededBy] = useState('Yesterday');
    const [email, setEmail] = useState('');
    let navigate = useNavigate();

    const userLogin = useSelector((state) => state.userLogin);
    const {loading, error, userInfo} = userLogin;


    useEffect(() => {
        if(category.length === 0){
            setCategory(categoryList[0]);
        }
        if(!userInfo){

        }
    }, [])

    const submitHandler = (e) => {
        e.preventDefault()

        const data = {
            title: title,
            description: description,
            category: category,
            neededBy: neededBy,
            status: 'Submitted',
            username: userInfo?.username || 'Guest'
        };

        console.log('data:', data);
          
        var config = {
            method: 'post',
            url: `${ideas_URL}/ideas`,
            headers: { 
                'Content-Type': 'application/json'
            },
            data : data
        };
        
        axios(config)
        .then(function (response) {
            console.log(JSON.stringify(response.data));
            navigate(`/ideas/${response?.data?.id}`)
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    return(
        <Container style={{backgroundColor: '', height:'100vh'}} >
            <Container className='py-4 px-5' style={{backgroundColor: 'white'}}>
                <Form onSubmit={submitHandler}>
                    <Form.Group className='pb-4' controlId='formTitle'>
                        <Form.Label><h5>Your idea</h5></Form.Label>
                        <Form.Control 
                            type='text' 
                            placeholder='One sentence summary of the idea' 
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                        
                    </Form.Group>

                    <Form.Group className='pb-4' controlId='formDescription'>
                        <Form.Label><h5>Please add more details</h5></Form.Label>
                        <Form.Control 
                            as='textarea' rows={5}
                            placeholder='Why is it useful, who would benefit from it, how should it work?' 
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group className='pb-4'>
                        <Form.Label><h5>Choose a category for this idea</h5></Form.Label>
                        <Form.Select onChange={(e) => setCategory(e.target.value)} >
                            {
                                categoryList.map(category => {
                                    return(
                                        <option value={category}>{category}</option>
                                    )
                                })
                            }
                        </Form.Select>
                    </Form.Group>

                    <Form.Group className='pb-4'>
                        <Form.Label><h5>Needed by</h5></Form.Label>
                        <Form.Select onChange={(e) => setNeededBy(e.target.value)}>
                            <option value='Yesterday' default>Yesterday</option>
                            <option value='Week'>Week</option>
                            <option value='Month'>Month</option>
                            <option value='Quarter'>Quarter</option>
                            <option value='Not Sure'>Not Sure</option>
                        </Form.Select>
                    </Form.Group>

                    {!userInfo &&
                    <Form.Group className='pb-4'>
                        <Form.Label><h5>Tell us who you are</h5></Form.Label>
                        <Form.Control 
                            type='email' 
                            placeholder='Enter email (name@example.com)' 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}/>
                    </Form.Group>
                    }

                    <Button type='submit'>
                        Submit
                    </Button>
                </Form>
            </Container>
        </Container>
    )
}

export default NewIdeaScreen;