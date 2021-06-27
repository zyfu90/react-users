import { combineReducers } from "redux";

const users = (state = [], action) => {
    switch (action.type) {
        case 'FETCH_USERS':
            return action.payload;
        case 'ADD_USER':
            return [...state, action.payload];
        case 'DELETE_USER':
            return state.filter(element => element !== action.payload);
        default:
            return state;
    }
}

export default combineReducers({
    users: users
});