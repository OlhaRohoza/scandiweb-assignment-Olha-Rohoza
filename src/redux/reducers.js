import { combineReducers } from 'redux';

const initialState = {
    currency: "$",
    noOfItemInCart: 0,
    cart: []
}

// function to check of the two objects is equal
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
            // check if there's no "selected attributes" => search in the cart by "product id"
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
                // check if there is any "selected attributes" => search in the cart by "product id" and "selected attributes"
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
            // adjust quantity of a cetain product in a cart if we have it more than 2
            if (payload.quantity >= 2) {
                // adjust quantity => if there's no "selected attributes" => search in the cart by "product id"
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
                    // adjust quantity => if there is any "selected attributes" => search in the cart by "product id" and "selected attributes"
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
                // when quality = 1 and we need to delete it from the cart 
            } else {
                // delete from the cart => if there's no "selected attributes" => search in the cart by "product id"
                if (payload.selectedAttributes === []) {
                    return {
                        ...state,
                        noOfItemInCart: state.noOfItemInCart - 1,
                        cart: state.cart.filter(product => (product.id !== payload.id))
                    }

                } else {
                    // delete from the cart => if there is any "selected attributes" => search in the cart by "product id" and "selected attributes"
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

