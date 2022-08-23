

export const queryCategory = `{
                                categories {
                                    name
                                }
                            }`


export const queryCurrency = `{
                                currencies {
                                label
                                symbol
                                }
                            }`

export const queryCategoriesPLP = `{
            categories {
                        name
                        products {
                                    id
                                    name
                                    brand
                                    category
                                    gallery
                                    inStock
                                    attributes{
                                                name
                                                items {
                                                        value
                                                    }
                                                }
                                    prices {
                                            currency {
                                                    symbol
                                                    }
                                            amount
                                            }
                                }
                        }
            }`

export function queryProduct(id) {
    return `{
                product (id: "${id}") {
                    id
                    name
                    inStock
                    description
                    gallery
                    brand
                    attributes {
                    id
                    name
                    type
                    items {
                        id
                        value
                        displayValue
                    }
                    }
                    prices {
                    currency {
                        label
                        symbol
                    }
                    amount
                    }

                }                              
            }`
}