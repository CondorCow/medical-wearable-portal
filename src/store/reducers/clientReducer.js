import * as actionTypes from '../actions';

const initialState = {
    clients: [],
    selectedClient: 0,
    loadingMeasurements: false,
    history: []
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.INIT_CLIENTS:
            return {...state, clients: action.value}
        case actionTypes.ON_CLIENT_SELECT:
            console.log(action.payload.measurements)
            return {...state, selectedClient: action.payload.id, loadingMeasurements: true, history: action.payload.measurements}
    }
    return state;
};

export default reducer;