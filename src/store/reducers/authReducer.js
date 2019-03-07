import * as actionTypes from '../actions';
import axios from 'axios';

const initialState = {
    isAuth: false
};

const reducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.ON_LOGIN:
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + action.value;
            return {...state, isAuth: true}
        case actionTypes.ON_LOGOUT:
            return {...state, isAuth: false}
    }
    return state;
};

export default reducer;