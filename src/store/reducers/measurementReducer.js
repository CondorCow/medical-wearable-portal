import * as actionTypes from '../actions';

const initialState = {
    mTypes: []
};

const reducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.INIT_MEASUREMENTTYPES:
            return {...state, mTypes: action.payload}
    }
    return state;
};

export default reducer;