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
        attributes: product.attributes,
        selectedAttributes: product.selectedAttributes
    }
})

export const deleteFromCart = (product) => ({
    type: 'DELETE_FROM_CART',
    payload: {
        id: product.id,
        quantity: product.quantity,
        selectedAttributes: product.selectedAttributes
    }
})
