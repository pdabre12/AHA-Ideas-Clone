import React from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {Container} from 'react-bootstrap';

import Header from './components/Header';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import PortalScreen from './screens/PortalScreen';
import IdeaScreen from './screens/IdeaScreen';
import NewIdeaScreen from './screens/NewIdeaScreen';
import ProfileScreen from './screens/ProfileScreen';
import AdminScreen from './screens/AdminScreen';

const App = () => {
  return (
    <div className='100vh' >
      <BrowserRouter>
        <Header/>
        <div className='py-5' style = {{height:'100%', backgroundColor:'whitesmoke'}}>
          <Container> 
            <Routes>
              <Route path='/login' element={<LoginScreen/>}/>
              <Route path='/register' element={<RegisterScreen/>}/>
              <Route path='/ideas/search/:query' element={<PortalScreen/>}/>
              <Route path='/ideas/search/' element={<PortalScreen/>}/>
              <Route path='/ideas/category/:category' element={<PortalScreen/>}/>
              <Route path='ideas/new' element={<NewIdeaScreen/>}/>
              <Route path='/ideas/:id' element={<IdeaScreen/>}/>
              <Route path='/ideas' element={<PortalScreen/>}/>
              <Route path='/' element={<PortalScreen/>}/>
              <Route path='/admin' element={<AdminScreen/>}/>
            </Routes>
          </Container>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;