import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import {Link, useLocation, useParams, useNavigate} from 'react-router-dom';
import {Modal, Row, Col, Button, ButtonGroup, ListGroup, Container} from 'react-bootstrap';
import AdminIdea from '../components/AdminIdea';
import {Pie, PieChart, Legend, LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip} from 'recharts';
import moment from 'moment';
const ideas_URL = 'https://5r3zbiuz85.execute-api.us-west-2.amazonaws.com';



const AdminScreen = () => {
    let customButtonColor = 'steelblue';
    let navigate = useNavigate();
    const [smShow, setSmShow] = useState(false);
    

    const [ideas, setIdeas] = useState([]);
    const [dateData, setDateData] = useState([]);
    const [catData, setCatData] = useState([]);
    const [signinModelShow, setSigninModalShow] = useState(false);

    const userLogin = useSelector((state) => state.userLogin);
    const {loading, error, userInfo} = userLogin;


    useEffect(() =>{
        if(!userInfo){
            navigate('/login');
        }else{
            console.log("HERE")
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

            if(dateData.length === 0){
                console.log("DATA");
                let dateArray = [];
                ideas.forEach(idea=>{
                    let index = dateArray.findIndex(d => d.date == moment(idea.created).format('YYYY-MM-DD'));
                    if(index >= 0){
                        //if match 
                        dateArray[index].count = dateArray[index].count + 1;
                    }else{{
                        //if no match
                        if(getDate(idea.created) !== '12/31/1969'){
                            const newData = {
                                date: moment(idea.created).format('YYYY-MM-DD'),
                                count: 1
                            }
                            dateArray.push(newData);
                        }
                    }}
                    setDateData(dateArray);
                })
                console.log("ARRAY:",  dateArray);
            }

        }
        
    }, [ideas])

    const getVotes = (id) =>{
        var config = {
            method: 'get',
            url: `${ideas_URL}/ideas/vote/${id}`,
            headers: {'Content-Type': 'application/json' }
        };
        
        axios(config)
        .then(function (response) {
            console.log('count:', response.data.count);
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
            <Row>
                <h2>Admin Dashboard</h2>
            </Row>
            <div className="px-4 py-4" style={{backgroundColor: "white",  justifyContent:'center', alignItems:'center',}}>
                <h5>Ideas Post Activity</h5>
                <LineChart width={730} height={250} data={dateData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis 
                        dataKey="date" 
                    />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="count" stroke="#8884d8" />
                </LineChart>
            </div>
            <br/>
            <div>
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


                <div className='py-4 px-4' style={{backgroundColor: "white"}}>
                    <br/>
                    <Row >

                    <Col className='py-4 mx-2'style={{backgroundColor: ''}}>
                    <h4>Current Ideas</h4>
                    <hr/>
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
                                    <AdminIdea idea={idea}/>
                                    <hr></hr>
                                </Container>
                            )
                            
                        }))}
                    </ListGroup>
                    </Col>
                    </Row>
                
                </div>

            </div>
        </>
    )
}

export default AdminScreen;

