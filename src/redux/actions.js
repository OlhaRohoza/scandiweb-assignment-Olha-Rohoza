export const changeCurrency = currency => ({
    type: 'CHANGE_CURRENCY',
    payload: { currency }
})

export const addToCart = (product) => ({
    type: 'ADD_TO_CART',
    payload: {
        id: product.id,
        name: product.name,
        brand: product.brand,
        gallery: product.gallery,
        prices: product.prices,
        selectedAttributes: product.selectedAttributes
    }
})

export const deleteFromCart = (id, selectedAttributes) => ({
    type: 'DELETE_FROM_CART',
    payload: {
        id,
        selectedAttributes
    }
})
