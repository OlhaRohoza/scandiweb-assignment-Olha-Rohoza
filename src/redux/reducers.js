import { combineReducers } from 'redux';

export const currency = (state = { currency: '$' }, action) => {
    const { type, payload } = action;
    switch (type) {
        case 'CHANGE_CURRENCY':
            const { currency } = payload;
            return { currency: currency };
        default:
            return state;
    }

}

const reducers = {
    currency,
}

export const rootReducer = combineReducers(reducers);