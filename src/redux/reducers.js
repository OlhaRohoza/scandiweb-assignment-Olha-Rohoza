import { combineReducers } from 'redux';

const initialState = {
    currency: "$",
    noOfItemInCart: 0,
    cart: []
}

const objectsEqual = (o1, o2) =>
    typeof o1 === 'object' && Object.keys(o1).length > 0
        ? Object.keys(o1).length === Object.keys(o2).length
        && Object.keys(o1).every(p => objectsEqual(o1[p], o2[p]))
        : o1 === o2;

export const shopping = (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case 'CHANGE_CURRENCY':
            const { currency } = payload;
            return { ...state, currency: currency };
        case 'ADD_TO_CART':
            const { id, selectedAttributes } = payload;

            if (selectedAttributes === []) {
                const inCart = state.cart.find((item) => (item.id === id) ? true : false);
                return {
                    ...state,
                    noOfItemInCart: state.noOfItemInCart + 1,
                    cart: inCart
                        ? state.cart.map((item) =>
                            item.id === id
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
            } else {

                const inCart = state.cart.find((item) => (item.id === id && (objectsEqual(item.selectedAttributes, selectedAttributes))) ? true : false);
                return {
                    ...state,
                    noOfItemInCart: state.noOfItemInCart + 1,
                    cart: inCart
                        ? state.cart.map((item) =>
                            (item.id === id && (objectsEqual(item.selectedAttributes, selectedAttributes)))
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
    shopping: shopping
}

export const rootReducer = combineReducers(reducers);