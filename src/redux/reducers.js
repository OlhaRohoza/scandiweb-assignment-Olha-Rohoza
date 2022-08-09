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
            const { id, selectedAttributes } = payload;
            const inCart = state.cart.find((item) => (item.id === id) ? true : false);
            console.log(inCart);
            return {
                ...state,
                noOfItemInCart: state.noOfItemInCart + 1,
                cart: inCart
                    ? state.cart.map((item) =>
                        item.selectedAttributes === selectedAttributes
                            ? {
                                ...item,
                                quality: item.quality + 1
                            }
                            : item)
                    : [...state.cart, {
                        ...payload,
                        quality: 1
                    }],
            };
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
    shopping: shopping
}

export const rootReducer = combineReducers(reducers);