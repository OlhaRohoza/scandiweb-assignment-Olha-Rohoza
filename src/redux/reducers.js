import { combineReducers } from 'redux';

export const currency = (state = { currency: '$' }, action) => {
    const { type, payload } = action;
    switch (type) {
        case 'CHANGE_CURRENCY':
            const { currency } = payload;
            return state;
        default:
            return state;
    }

}

export const cart = (state = [], action) => {
    const { type, payload } = action;
    switch (type) {
        case 'ADD_TO_CART':
            return state;
        case 'DELETE_FROM_CART':
            return state;
        default:
            return state;
    }

}


const reducers = {
    currency,
    cart
}

export const rootReducer = combineReducers(reducers);