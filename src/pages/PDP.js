import React from "react";
import { Component } from "react";
import withRouter from '../components/WithRouter';

class PDP extends Component {
    constructor(props) {
        super(props)
        console.log(props.params);
        this.state = {
            currency: 'USD',
            product: [],
            gallery: [],
            attributes: [],
            prices: []
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
        this.handleChange = this.handleChange.bind(this)
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
            this.setState({ gallery: data.data.product.gallery });
            this.setState({ attributes: data.data.product.attributes });
            this.setState({ prices: data.data.product.prices });
        } catch (err) {
            console.log(err);
        }
    }

    handleChange(e) {
        console.log(e.target.value);
    }

    render() {
        const { product, gallery, attributes, prices } = this.state;

        return (
            <div className="PDP__container">
                <div className="PDP__pictures">
                    <div className="PDP__pictures_small">
                        {
                            gallery && gallery.map((picture, i) => (
                                <img key={i} src={picture} style={{ height: 100, width: 100 }} />
                                // <img src={link} key={i} />
                            ))
                        }
                    </div>
                    {/* <img src={this.state.mainPicture} /> */}
                </div>
                <div className="PDP__product">
                    <p>{product.name}</p>
                    {/* <div>{product.description}</div> */}
                    <div
                        dangerouslySetInnerHTML={{ __html: product.description }}
                    />
                    <p>{product.brand}</p>
                    {
                        attributes && attributes.map(element => (
                            <div className="attributes" key={element.id}>
                                {
                                    element.name === 'Color'
                                        ? <>
                                            <p>{element.name}</p>
                                            {
                                                element.items.map(item => (
                                                    <div className="items" key={item.id}>
                                                        <p style={{ height: 30, width: 30, border: '1px solid silver', textAlign: 'center', backgroundColor: item.value }}></p>
                                                        {/* <p>{item.displayValue}</p> */}
                                                    </div>
                                                ))
                                            }
                                        </>
                                        : <>
                                            <p>{element.name}</p>

                                            {
                                                element.items.map(item => (
                                                    <div className="items" key={item.id}>
                                                        <p style={{ height: 30, width: 30, border: '1px solid silver', textAlign: 'center' }}>{item.value}</p>
                                                        {/* <p>{item.displayValue}</p> */}
                                                    </div>
                                                ))
                                            }

                                        </>

                                }
                            </div>
                        ))
                    }
                    <div>
                        {!product.inStock
                            ? <p>SOLD OUT</p>
                            : <p>PRICE {this.state.currency}</p>
                            // <p>{prices && prices.filter((price) => (price.currency.label === this.state.currency)).amount} {this.state.currency}<p>
                        }
                    </div>


                </div>
                <button>ADD TO CART</button>
            </div>)
    }
}

export default withRouter(PDP);
