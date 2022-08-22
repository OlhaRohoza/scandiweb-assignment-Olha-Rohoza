

export const queryCurrency = `
                        {
                            currencies {
                            label
                            symbol
                            }
                        }
                        `
export function queryCategories(id) {
    return `
                    {
                            category (input: {
                                title: "${id}"
                            }) {
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
} 