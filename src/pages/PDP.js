import React from "react";
import { Component } from "react";
import WithRouter from '../components/WithRouter';
import { connect } from 'react-redux';
import { addToCart } from '../redux/actions';
import PDPpictures from "../components/PDPpictures";
import { queryProduct } from '../components/gql-queries';
import { Markup } from 'interweave';


// PDP - product description page, a.k.a. product page => id = "product id"
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
        this.queryProduct = queryProduct(props.params.id);

        this.handleChange = this.handleChange.bind(this);
    }

    // fetching the data from the endpoint with the data about a certain product
    async componentDidMount() {
        try {
            const response = await fetch('http://localhost:4000/', {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ query: this.queryProduct })
            })
            const data = await response.json();
            console.log(data.data.product);

            // setting this.state with arrays 
            this.setState({ product: data.data.product });
            this.setState({ gallery: data.data.product.gallery });
            this.setState({ attributes: data.data.product.attributes });
            this.setState({ prices: data.data.product.prices });

            // setting the default values for the "selected attributes"
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

    // handle change the value of state for the "selected attributes"
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
                                    // if the product has color in the swatch attribute
                                    element.name === 'Color'
                                        ? <>
                                            <p className="PDP__product_attribute-name">{element.name}</p>
                                            <div className="PDP__product_attribute-items">
                                                {
                                                    element.items.map(item => (
                                                        <div key={item.id}
                                                            className={
                                                                selectedAttributes.length >= 2 && selectedAttributes.find(x => x.value === item.value)
                                                                    ? "PDP__product_attribute-item PDP__product_attribute-item-color PDP__product_attribute-item-selected"
                                                                    : (element.name === selectedAttributes.name && item.value === selectedAttributes.value)
                                                                        ? "PDP__product_attribute-item PDP__product_attribute-item-color PDP__product_attribute-item-selected"
                                                                        : "PDP__product_attribute-item PDP__product_attribute-item-color"
                                                            }
                                                            onClick={(e) => this.handleChange(element.name, item.value)}
                                                            style={{ backgroundColor: item.value }}>
                                                        </div>))
                                                }
                                            </div>
                                        </>
                                        : <>
                                            <p className="PDP__product_attribute-name">{element.name}</p>
                                            <div className="PDP__product_attribute-items">
                                                {
                                                    element.items.map(item => (
                                                        <div key={item.id}
                                                            onClick={(e) => this.handleChange(element.name, item.value)}
                                                            // change style according to the "selected attributes"
                                                            className={
                                                                selectedAttributes.length >= 2 && selectedAttributes.find(x => (x.value === item.value && x.name === element.name))
                                                                    ? "PDP__product_attribute-item PDP__product_attribute-item-other PDP__product_attribute-item-other-selected"
                                                                    : (element.name === selectedAttributes.name && item.value === selectedAttributes.value)
                                                                        ? "PDP__product_attribute-item PDP__product_attribute-item-other PDP__product_attribute-item-other-selected"
                                                                        : "PDP__product_attribute-item PDP__product_attribute-item-other"}
                                                        > {item.value}</div>

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
                                    {prices.filter((price) => (price.currency.symbol === currency))[0].amount}
                                </p>
                                {/* add to cart the product with the "selected attributes" */}
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

                    </div>
                    <br />
                    <Markup content={product.description} />
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

