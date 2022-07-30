import React from "react";
import { Component } from "react";
import withRouter from '../components/WithRouter';

class PDP extends Component {
    constructor(props) {
        super(props)
        console.log(props.params);
        this.state = {
            product: []
        }

        this.queryProduct = `{
                                product (id: "${props.params.id}") {
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

    async componentDidMount() {
        try {
            const response = await fetch('http://localhost:4000/', {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ query: this.queryProduct })
            })
            const data = await response.json();
            console.log(data.data.product);
            this.setState({ product: data.data.product });
        } catch (err) {
            console.log(err);
        }
    }

    render() {
        const { product } = this.state;

        return <div className="PDP__container">
            <p>{product.id}</p>
            <p>{product.name}</p>
            <p>PDP - product description page, a.k.a. product page</p>
        </div>
    }
}

export default withRouter(PDP);
