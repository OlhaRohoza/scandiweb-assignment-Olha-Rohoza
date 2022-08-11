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
                                    quantity: item.quantity + 1
                                }
                                : item)
                        : [...state.cart, {
                            ...payload,
                            quantity: 1
                        }],
                };
            } else {
                const inCart = state.cart.find((item) =>
                    (item.id === id && (objectsEqual(item.selectedAttributes, selectedAttributes))) ? true : false);
                return {
                    ...state,
                    noOfItemInCart: state.noOfItemInCart + 1,
                    cart: inCart
                        ? state.cart.map((item) =>
                            (item.id === id && (objectsEqual(item.selectedAttributes, selectedAttributes)))
                                ? {
                                    ...item,
                                    quantity: item.quantity + 1
                                }
                                : item)
                        : [...state.cart, {
                            ...payload,
                            quantity: 1
                        }],
                };
            }

        case 'DELETE_FROM_CART':

            if (payload.quantity >= 2) {
                if (payload.selectedAttributes === []) {
                    return {
                        ...state,
                        noOfItemInCart: state.noOfItemInCart - 1,
                        cart: state.cart.map((item) =>
                            item.id === payload.id
                                ? {
                                    ...item,
                                    quantity: item.quantity - 1
                                }
                                : item)
                    };
                } else {
                    return {
                        ...state,
                        noOfItemInCart: state.noOfItemInCart - 1,
                        cart: state.cart.map((item) =>
                            (item.id === payload.id && (objectsEqual(item.selectedAttributes, payload.selectedAttributes)))
                                ? {
                                    ...item,
                                    quantity: item.quantity - 1
                                }
                                : item)
                    }
                }
                // when quality = 1
            } else {
                if (payload.selectedAttributes === []) {
                    return {
                        ...state,
                        noOfItemInCart: state.noOfItemInCart - 1,
                        cart: state.cart.filter(product => (product.id !== payload.id))
                    }
                } else {
                    return {
                        ...state,
                        noOfItemInCart: state.noOfItemInCart - 1,
                        cart: state.cart.filter(product => !(product.id == payload.id && objectsEqual(product.selectedAttributes, payload.selectedAttributes)))
                    }
                }

            }

        default:
            return state;
    }

}

