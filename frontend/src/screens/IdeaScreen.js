import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {Link, useLocation, useParams, useNavigate} from 'react-router-dom';
import {Modal, Breadcrumb, Container, Row, Col, Button, Image} from 'react-bootstrap';
import MDEditor, {commands} from "@uiw/react-md-editor";
import axios from 'axios';
import Guest from '../images/guest.PNG'
const ideas_URL = 'https://5r3zbiuz85.execute-api.us-west-2.amazonaws.com';

/**

const ideas = [
    {
        id: 'HS-I-424',
        votes: 1,
        title: 'Add ODM to Azure Active Directory application gallery',
        body: 'For Azure SSO, our organization requires ODM to be in the Azure Active Directory application gallery.',
        category: 'Analytics Engine',
        username: 'Guest',
        date: 'Apr 15, 2022',
        response_count: 0,
        status: 'Submitted',
        neededBy: 'Month',

    },
    {
        id: 'HS-I-423',
        votes: 1,
        title: 'While scheduling the disposition sweep, ICN does not allow to schedule the sweep on Quarterly basis. It only provides us the option to schedule the sweep hourly, Daily, Monthly and yearly.',
        body: 'While scheduling the disposition sweep, ICN does not allow to schedule the sweep on Quarterly basis. It only provides us the option to schedule the sweep hourly, Daily, Monthly and yearly. Customer heavily relies on scheduling the sweep on Quarterly basis. At present, they are scheduling the sweep via Windows Standalone tool and considering moving to ICN Task Manager. This is a limitation for the customer.',
        category: 'Analytics Engine',
        username: 'Gueset',
        date: 'Mar 15, 2022',
        response_count: 0,
        status: 'Under review',
        neededBy: 'Month',

    },
    {
        id: 'HS-I-422',
        votes: 5,
        title: 'Error/success messages with PAW action buttons',
        body: 'When we use the current PAW action buttons to launch the processes, the error or success messages that appear are not user-friendly for a simple user.',
        category: 'Analytics Engine',
        username: 'Guest',
        date: 'Jan 24, 2020',
        response_count: 0,
        status: 'Not under consideration',
        neededBy: 'Month',
    }
];*/

const comments_data = [
    {
        id: 1,
        user_id: null,
        name: 'Guest',
        comment: 'This is a good idea',
        date: '4/28/2022'

    },
    {
        id: 2,
        user_id: null,
        name: 'Guest',
        comment: 'I like this idea as well',
        date: '4/28/2022'

    },
    {
        id: 3,
        user_id: null,
        name: 'Guest',
        comment: 'Please consider this',
        date: '4/28/2022'

    },
    {
        id: 4,
        user_id: null,
        name: 'Guest',
        comment: 'Additional details would be good',
        date: '4/28/2022'

    },

]

const IdeaScreen = () => {
    let customButtonColor = 'steelblue';
    const [ideas, setIdeas] = useState([]);
    const [idea, setIdea] = useState({});
    const [votes, setVotes] = useState('');
    const [commentFlag, setCommentFlag] = useState(false);
    const [comment, setComment] = useState('');
    const [comments, setComments] = useState([]);
    const [smShow, setSmShow] = useState(false);
    const [signinModelShow, setSigninModalShow] = useState(false);
    const [commentModelShow, setCommentModalShow] = useState(false);

    const {id} = useParams();

    const userLogin = useSelector((state) => state.userLogin);
    const {loading, error, userInfo} = userLogin;

    //let user = {username: 'k'};
    
    useEffect(() => {
        if(ideas.length === 0){
            var config = {
                method: 'get',
                url: `${ideas_URL}/ideas`,
                headers: {'Content-Type': 'application/json' }
            };
            
            axios(config)
            .then(function (response) {
                console.log(response.data);
                setIdeas(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });
        }
        
        if(ideas){
            setIdea(ideas.filter(idea => idea.id == id)[0]);
        }

        if(votes.length === 0){
            getVotes(id);
        }
        if(comments?.length === 0){
            getComments(id);
        }
    }, [ideas, idea, commentFlag, votes])

    const submitCommentHandler = (e) => {
        e.preventDefault();
        if(comment.length > 0){
            const request = {
                username: userInfo?.username || 'Guest',
                ideaId: id,
                comment: comment
            }
            console.log('request', request);

            var config = {
                method: 'post',
                url: `${ideas_URL}/ideas/comment`,
                headers: {'Content-Type': 'application/json' },
                data: request
            };
            
            axios(config)
            .then(function (response) {
                console.log('response:', response.data);
                //get comments to render page with new coomment + clear inputfield
                getComments(id);
                setComment('');
                setCommentFlag(false);
            })
            .catch(function (error) {
                console.log(error);
            });
        }else{
            setCommentModalShow(true);
        }
    }

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

    const getComments = (id) => {
        //TODO: change URL + confiirm variables
        var config = {
            method: 'get',
            url: `${ideas_URL}/ideas/comments/${id}`,
            headers: {'Content-Type': 'application/json' }
        };
        
        axios(config)
        .then(function (response) {
            //get comments
            console.log('comments:', response.data);
            //filter comments where comment. questionid === id
            //var filterComments = response.data?.filter(comment => comment.questionid === id);
            //console.log('comments with questionid:', id, '=>',filterComments);
            //
            //setComments(filterComments);
            setComments(response.data);
        })
        .catch(function (error) {
            console.log(error);
            setComments('Error')
        });
    }


    const voteHandler = (e) => {
        e.preventDefault();

        //Make request
        if(userInfo){
            const request = {
                username: userInfo.username,
                ideaId: id,
            }
            console.log('request', request);

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
            console.log('signinModelShow is true');
            setSigninModalShow(true);
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
        <div style={{backgroundColor: 'whitesmoke', minHeight:  '100vh'}}>
            <Breadcrumb>
                <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
                <Breadcrumb.Item active>{idea?.id}</Breadcrumb.Item>
            </Breadcrumb>
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

            <Modal
                size="sm"
                show={commentModelShow}
                onHide={() => setCommentModalShow(false)}
                aria-labelledby="example-modal-sizes-title-sm"
                centered
            >
                <Modal.Header closeButton>
                <Modal.Title id="example-modal-sizes-title-sm">
                    Warning
                </Modal.Title>
                </Modal.Header>
                <Modal.Body>Please make a comment before submitting!</Modal.Body>
                
            </Modal>

            <Row>
                <Col xs={3}>
                    <Container style={{backgroundColor: 'white'}} className='py-5 px-4 '>
                        <Row className="text-center">
                            <h3>{votes}</h3>
                        </Row>
                        <Row>
                            <Button style={{backgroundColor: customButtonColor, borderColor: customButtonColor}} onClick={voteHandler}>VOTE</Button>
                        </Row>
                        <br/>
                        <Row>
                            <Col>
                                <h6>Status </h6>
                            </Col>
                            <Col>
                                {idea?.status}
                            </Col>
                            
                        </Row>
                        <Row>
                            <Col>
                                <h6>Categories </h6>
                            </Col>
                            <Col>    
                                {idea?.category}
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <h6>Created by </h6>
                            </Col>
                            <Col>
                                {idea?.username}
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <h6>Created on</h6>
                            </Col>
                            <Col>
                            {getDate(idea?.created)}
                            </Col>
                        
                        </Row>
                        
                    </Container>
                </Col>

                <Col>
                    <Container style={{backgroundColor: 'white'}} className='py-3 px-6'>
                        <Row>
                            <h4>{idea?.title}</h4>
                        </Row>

                        <Row className='px-3 pt-3 pb-5'>
                            {idea?.description}
                        </Row>
                        <Row>
                            <Col xs={2}><h6>Github Link</h6></Col>
                            <Col><a href={`${idea?.githubLink}`}>{idea?.githubLink}</a></Col>
                        </Row>
                        <Row>
                            <Col xs={2}><h6>Needed by</h6></Col>
                            <Col>{idea?.neededBy}</Col>
                        </Row>       
                    </Container>
                    <br/>
                    <Container style={{backgroundColor: 'white'}} className='py-4 px-6'>
                        <h6>COMMENTS {comments.length}</h6>
                        <Row>
                            {!commentFlag &&
                            <Button style={{backgroundColor: customButtonColor, borderColor: customButtonColor}}  onClick={(e) => {setCommentFlag(true); console.log(commentFlag)}}>+ Add a comment to join the discussion</Button>}
                        </Row>
                        <Row>                  
                            {commentFlag &&                         
                            <MDEditor
                                value={comment}
                                onChange={setComment}
                                preview="edit"
                                commands={[
                                    commands.bold,
                                    commands.italic,
                                    commands.strikethrough,
                                    commands.divider,
                                    commands.link,
                                    commands.code,
                                ]}
                            >
                            </MDEditor>}

                        </Row>
                        {commentFlag &&
                            <Row>
                            <Button style={{backgroundColor: customButtonColor, borderColor: customButtonColor}}  onClick={submitCommentHandler}>Submit Comment</Button>
                        </Row>
                        }             
                    </Container>
                    <br/>
                    {comments.length != 0 &&
                        <Container  style={{backgroundColor: 'white'}}  className='py-4 px-6'>
                            {
                                comments?.map(comment => {
                                    return(
                                        <div key={comment.id}>
                                            <Row>
                                                <Col xs={2}  className="align-items-center justify-content-center text-center ">
                                                    <Image width={70} height={70} src={Guest} roundedCircle={true} className='text-center'/>
                                                </Col>
                                                <Col >
                                                    <Container style={{backgroundColor: 'whitesmoke'}} className='px-4 py-4'>                                       
                                                        <Row>
                                                            <p><strong>{comment?.username || 'Guest'} </strong>  {getDate(comment.dateTime)}</p>
                                                        </Row>
                                                        <Row>
                                                            {comment.comment}
                                                        </Row>
                                                    </Container>
                                                </Col>
                                            </Row>
                                            <br/>
                                        </div>
                                        
                                    )
                                })
                            }
                        </Container>
                    }   
                </Col>


            
            </Row>
        </div>
    )
}

export default IdeaScreen;