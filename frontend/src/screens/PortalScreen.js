import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {Link, useLocation, useParams, useNavigate} from 'react-router-dom';
import {Image, Row, Col, SplitButton} from 'react-bootstrap';
import axios from 'axios';
import SideBar from '../components/SideBar';
import IdeasList from '../components/IdeasList';
const ideas_URL = 'https://5r3zbiuz85.execute-api.us-west-2.amazonaws.com';


const categoryList = ['Analytics Engine', 'Big Replicate', 'Cloud Pak for Data', 'Cognos Analytics', 'Connectivity', 'DataStage', 'Optim', 'Watson']


const PortalScreen = () => {
    const [ideas, setIdeas] = useState([]);
    const [category, setCategory] = useState('')
    //const [query, setQuery] = useState('');
    let location = useLocation();
    let navigate = useNavigate();

    let {query} = useParams();
    if(query?.length > 0 && category.length != 0){
       setCategory('');
    }

    const userLogin = useSelector((state) => state.userLogin);
    const {loading, error, userInfo} = userLogin;

    useEffect(() => {
        if(userInfo === null && localStorage.getItem('userInfo') ){
            window.location.reload(); 
        }

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

        console.log('category', category, 'query', query);
        console.log("USER", userInfo);
    }, []);


    const filterIdeasBySearch = (ideas, query) => {
        const filteredIdeas = ideas.filter(idea => idea?.title?.toLowerCase().includes(query.toLowerCase()));
        return filteredIdeas;
    }

    const filterIdeaesByCategory = (ideas, category) => {
        const filteredIdeas = ideas.filter(idea => idea.category === category);
        return filteredIdeas;
    }

    const categoryRedirect = (category) => {
        console.log('categoryredirect');
        navigate(`/ideas/category/${category}`)
    }


    return(
        <>
        <Row>
            <Col xs={3}>
                <SideBar category={category} setCategory={setCategory} categoryList={categoryList} redirect={categoryRedirect}/>
            </Col>
            <Col>
                {category.length === 0  && query === undefined && 
                    <IdeasList title='All Ideas' ideas={ideas}/>
                }
                {query?.length > 0 &&
                    <IdeasList title={`Search results for '${query}'`} ideas={filterIdeasBySearch(ideas, query)} />
                }
                {category &&
                    <IdeasList title={category} ideas={filterIdeaesByCategory(ideas, category)}/>
                }
            
            </Col>
        </Row>
        </>
    )
}

export default PortalScreen;