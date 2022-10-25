import React from 'react'
import {Container, Row, Col} from 'react-bootstrap';

const FormContainer = ({children}) => {
  return (
    <Container className='py-3' >
        <Row className='justify-content-md-center'>
            <Col className='py-5 px-5' xs={12} md={6} style={{backgroundColor: 'white'}}>
                {children}
            </Col>
        </Row>
    </Container>
  )
}

export default FormContainer;