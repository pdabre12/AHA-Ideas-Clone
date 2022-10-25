import React, {useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux';
import {LinkContainer} from 'react-router-bootstrap';
import {Image, Row, Col, Navbar, Nav, Container, Form, FormControl, Button, NavDropdown} from 'react-bootstrap';
import {Link, useNavigate} from 'react-router-dom';
import { FiSearch} from 'react-icons/fi';
import Guest from '../images/guest.PNG';
import {logout} from '../actions/userActions';

const Header = () => {
    const dispatch = useDispatch();
    let navigate = useNavigate();
    const [query, setQuery] = useState('');
    const [admin, setAdmin] = useState(null);


    const userLogin = useSelector(state => state.userLogin);
    const {userInfo} = userLogin;

    useEffect(()=>{
        if(userInfo){
            if(userInfo.username == 'Admin' || userInfo.username == 'admin'){
                setAdmin(true);
            }
        }
    },[userInfo])

    const logoutHandler = () => {
        dispatch(logout());
    }

    const submitHander = (e) => {
        e.preventDefault();
        if(query.trim().length === 0){
            setQuery('');
            window.alert('Please type a query before searching')
        }else if(query.length > 0){
            console.log('query:', query);
            navigate(`/ideas/search/${query.trim()}`);
            setQuery('');
        }else{
            window.alert('Please type a query before searching')
        }
    }

    return (
    <header>
        <Navbar bg='dark' variant='dark' sticky='top' >
            <Container>      
                <Col xs={2}>
                    <LinkContainer to='/'>
                        <Navbar.Brand to='/home'>AHA ! | Ideas Portal</Navbar.Brand>
                    </LinkContainer>
                </Col>

                {admin &&
                    <Col xs={2}>
                        <LinkContainer to='/admin'>
                            <Navbar.Brand to='/home'>Admin Dashboard</Navbar.Brand>
                        </LinkContainer>
                    </Col>
                }

                <Col md='auto'>
                    <Navbar.Toggle aria-controls='basic-navbar-nav' />
                    <Nav className='me-auto'>
                        <Form className='d-flex' onSubmit={submitHander}>
                            <FormControl
                                type='search'
                                value={query}
                                onChange={(e) => setQuery(e.target.value.replace(/\\|\//g,''))}
                                placeholder='Search all ideas...'
                                className='me-2'
                                aria-label='Search'

                                />
                            <Button type='submit' variant='outline-success'><FiSearch/></Button>
                        </Form>
                
                    </Nav>
                </Col>
                

                <Col xs={2}>
                    
                    <Nav>
                        {userInfo ? (
                                <>
                                <Image width={35} height={35} src={Guest} roundedCircle={true}/>
                                <NavDropdown  title={userInfo.username} id='username'>
                                    {/** 
                                    <LinkContainer to='/profile'>
                                        <NavDropdown.Item>
                                            Profile
                                        </NavDropdown.Item>
                                    </LinkContainer>
                                    */}

                                    <NavDropdown.Item onClick={logoutHandler}>
                                        Logout
                                    </NavDropdown.Item>
                                </NavDropdown>
                                </>

                            ) 
                            : (
                                <>
                                <LinkContainer to='/login'>
                                    <Nav.Link to="/login"> Login</Nav.Link>
                                </LinkContainer>
                                <LinkContainer to='/register'>
                                    <Nav.Link to='/register'>Register</Nav.Link>
                                </LinkContainer>
                            </>
                            )
                        }
                    </Nav>
                </Col>
            </Container>
        </Navbar>
    </header>
    )
}

export default Header;