import { combineReducers } from 'redux';

const initialState = {
    currency: '$',
    inCart: {
        noOfItemInCart: 0,
        cart: []
    }
}


export const currency = (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case 'CHANGE_CURRENCY':
            const { currency } = payload;
            return { ...state, currency: currency };
        default:
            return state;
    }

}

export const inCart = (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
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
    currency,
    inCart
}

export const rootReducer = combineReducers(reducers);