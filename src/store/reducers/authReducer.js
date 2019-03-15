import * as actionTypes from '../actions';
import axios from 'axios';

const initialState = {
    isAuth: localStorage.getItem('token') != null
};

const reducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.ON_LOGIN:
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + action.value;
            localStorage.setItem('token', action.value);
            return {...state, isAuth: true};
        case actionTypes.ON_LOGOUT:
            delete axios.defaults.headers.common['Authorization'];
            localStorage.removeItem('token');
            return {...state, isAuth: false};
    }
    return state;
};

export default reducer;