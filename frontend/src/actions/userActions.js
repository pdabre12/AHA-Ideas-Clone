import axios from 'axios';
import {
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAIL,
    USER_LOGOUT,
} from '../constants/userConstants';
const users_URL = 'https://xcyqlagewb.execute-api.us-west-2.amazonaws.com/';


export const login = (username, password) => async (dispatch) => {

    dispatch({
        type: USER_LOGIN_REQUEST,
    })

    const request = {
        username: username,
        password: password
    }

    console.log('req:', request);
        
    var config = {
        method: 'post',
        url: `${users_URL}user/login`,
        headers: { 
            'Content-Type': 'application/json'
        },
        data : request
    };
        
    axios(config)
    .then(function (response) {
        console.log(JSON.stringify(response.data));
        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: response.data,
        })
        localStorage.setItem('userInfo', JSON.stringify(response.data));
    })
    .catch(function (error) {
        console.log(error);
        dispatch({
            type: USER_LOGIN_FAIL,
            payload: error
        })
    });

}

export const logout = () => (dispatch) => {
    localStorage.removeItem('userInfo');
    dispatch({ type: USER_LOGOUT });
    document.location.href = '/login'
}
