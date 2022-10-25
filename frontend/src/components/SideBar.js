import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {Link, useLocation, useParams, useNavigate} from 'react-router-dom';
import {Row, Col, Button, ButtonGroup, ListGroupItem} from 'react-bootstrap';


const SideBar = ({category, setCategory, categoryList, redirect}) => {
    let customButtonColor = 'steelblue';

    useEffect(() => {

    }, [])

    
    return(
        <div className='' style={{height: '90vh', backgroundColor: 'white'}}>
        <Row className='text-center py-4'>
            <Link to='/ideas/new'><Button className='px-4' style={{borderColor: customButtonColor, backgroundColor: customButtonColor}}> + ADD A NEW IDEA</Button></Link>
        </Row>
        <Row>

        </Row>
        <Row className='px-3'>
            <h6>FILTER BY CATEGORY</h6>
        </Row>
        <Row>
            <ButtonGroup vertical>
                {categoryList.map(category => {
                    return(
                        <Button key={category} onClick={(e)=> {setCategory(category); redirect(category)}}variant='light'>{category}</Button>
                    )
                })}
            </ButtonGroup>
        </Row>
        </div>
    )
}

export default SideBar;