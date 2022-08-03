import { combineReducers } from 'redux';

const initialState = {
    currency: "$",
    noOfItemInCart: 0,
    cart: []
}

export const shopping = (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case 'CHANGE_CURRENCY':
            const { currency } = payload;
            return { ...state, currency: currency };
        case 'ADD_TO_CART':
            return {
                ...state,
                noOfItemInCart: state.noOfItemInCart + 1,
                cart: [...state.cart, payload]
            }
        case 'DELETE_FROM_CART':
            return {
                ...state,
                noOfItemInCart: state.noOfItemInCart - 1,
                inCart: state.cart.filter(product => product !== payload)
            }
        default:
            return state;
    }

}

const reducers = {
    shopping
}

export const rootReducer = combineReducers(reducers);