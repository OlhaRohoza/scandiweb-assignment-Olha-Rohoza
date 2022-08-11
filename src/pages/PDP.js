import React from "react";
import { Component } from "react";
import WithRouter from '../components/WithRouter';
import { connect } from 'react-redux';
import { addToCart } from '../redux/actions';
import PDPpictures from "../components/PDPpictures";


class PDP extends Component {
    constructor(props) {
        super(props)
        this.state = {
            product: [],
            gallery: [],
            attributes: [],
            prices: [],
            selectedAttributes: {}
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
        this.handleChange = this.handleChange.bind(this);
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
            // console.log('attributes length ', data.data.product.attributes.length);
            this.setState({ prices: data.data.product.prices });
            if (data.data.product.attributes.length === 1) {
                this.setState({ selectedAttributes: { name: data.data.product.attributes[0].name, value: data.data.product.attributes[0].items[0].value } })
            } else {
                let array = [];
                for (let i = 0; i < data.data.product.attributes.length; i++) {
                    array.push({ name: data.data.product.attributes[i].name, value: data.data.product.attributes[i].items[0].value });
                }
                this.setState({ selectedAttributes: array })
            }

        } catch (err) {
            console.log(err);
        }
    }

    componentDidUpdate() {
        window.scrollTo(0, 0);
    }

    handleChange(itemName, itemValue) {

        if (this.state.selectedAttributes.length >= 2) {

            const newState = this.state.selectedAttributes.map(obj => {
                if (obj.name === itemName) {
                    return { ...obj, value: itemValue };
                }
                return obj;
            });

            this.setState({ ...this.state, selectedAttributes: newState });
        } else {
            this.setState({ ...this.state, selectedAttributes: { name: itemName, value: itemValue } })
        }

    }

    render() {
        const { product, gallery, attributes, prices, selectedAttributes } = this.state;
        const { currency, addToCart } = this.props;

        const styleSquare = { height: 54, width: 64, border: '1px solid #1D1F22', textAlign: 'center', backgroundColor: '#FFFFFF', color: 'black' };
        const styleSelectedSquare = { height: 54, width: 64, border: '1px solid #1D1F22', textAlign: 'center', backgroundColor: 'black', color: '#FFFFFF' }

        return (
            <div className="PDP__container">
                <PDPpictures gallery={gallery} />
                <div className="PDP__product_details">
                    <p className="PDP__product_brand">{product.brand}</p>
                    <p className="PDP__product_name">{product.name}</p>
                    {
                        attributes && attributes.map(element => (
                            <div className="attributes" key={element.id}>
                                {
                                    element.name === 'Color'
                                        ? <>
                                            <p className="PDP__product_attribute-name">{element.name}</p>
                                            <div className="PDP__product_attribute-items">
                                                {
                                                    element.items.map(item => (
                                                        <div className="PDP__product_attribute-item"
                                                            key={item.id}
                                                            onClick={(e) => this.handleChange(element.name, item.value)}
                                                            style={
                                                                selectedAttributes.length >= 2 && selectedAttributes.find(x => x.value === item.value)
                                                                    ? { height: 32, width: 32, border: '2px solid white', outline: '2px solid #5ECE7B', textAlign: 'center', backgroundColor: item.value }
                                                                    : (element.name === selectedAttributes.name && item.value === selectedAttributes.value)
                                                                        ? { height: 32, width: 32, border: '2px solid white', outline: '2px solid #5ECE7B', textAlign: 'center', backgroundColor: item.value }
                                                                        : { height: 32, width: 32, border: 'none', textAlign: 'center', backgroundColor: item.value }
                                                            }>
                                                        </div>))
                                                }
                                            </div>
                                        </>
                                        : <>
                                            <p className="PDP__product_attribute-name">{element.name}</p>
                                            <div className="PDP__product_attribute-items">
                                                {
                                                    element.items.map(item => (
                                                        <div className="PDP__product_attribute-item" key={item.id}
                                                            onClick={(e) => this.handleChange(element.name, item.value)}
                                                            style={
                                                                selectedAttributes.length >= 2 && selectedAttributes.find(x => (x.value === item.value && x.name === element.name))
                                                                    ? styleSelectedSquare
                                                                    : (element.name === selectedAttributes.name && item.value === selectedAttributes.value)
                                                                        ? styleSelectedSquare : styleSquare
                                                            }> {item.value}</div>

                                                    ))
                                                }
                                            </div>
                                        </>

                                }
                            </div>
                        ))
                    }
                    <div>
                        {!product.inStock
                            ? <p className="PDP__product_stock">SOLD OUT</p>
                            :
                            <>
                                <p className="PDP__product_attribute-price"> {currency}
                                    {/* {console.log(prices)} */}
                                    {prices.filter((price) => (price.currency.symbol === currency))[0].amount}
                                </p>
                                <button className="PDP__product_add-to-cart"
                                    onClick={() => addToCart({
                                        id: product.id,
                                        name: product.name,
                                        brand: product.brand,
                                        gallery: gallery,
                                        prices: prices,
                                        attributes: attributes,
                                        selectedAttributes: selectedAttributes
                                    })}>ADD TO CART</button>
                            </>
                        }
                        {console.log(this.props.cart)}
                    </div>
                    <br />
                    <div
                        dangerouslySetInnerHTML={{ __html: product.description }}
                    />
                </div>

            </div>)
    }
}

const mapStateToProps = state => ({
    currency: state.shopping.currency,
    noOfItemInCart: state.shopping.noOfItemInCart,
    cart: state.shopping.cart
});

const mapDispatchToProps = dispatch => ({
    addToCart: (product) => dispatch(addToCart(product)),
});


export default connect(mapStateToProps, mapDispatchToProps)(WithRouter(PDP));

