import React from "react";
import { Component } from "react";
import WithRouter from '../components/WithRouter';
import { connect } from 'react-redux';
import { addToCart } from '../redux/actions';


class PDP extends Component {
    constructor(props) {
        super(props)
        // console.log(props.params);
        this.state = {
            // currency: 'USD',
            product: [],
            gallery: [],
            mainPicture: '',
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
            this.setState({ prices: data.data.product.prices });
        } catch (err) {
            console.log(err);
        }
    }

    handleChange(i) {
        this.setState({
            mainPicture: this.state.gallery[i]
        })
    }


    render() {
        const { product, gallery, attributes, prices } = this.state;
        const { currency } = this.props;

        return (
            <div className="PDP__container">
                <div className="PDP__pictures_small">
                    {
                        gallery && gallery.map((picture, i) => (
                            <img key={i} src={picture} alt='item' style={{ height: 79, width: 80, backgroundColor: 'white', objectFit: 'contain' }}
                                onClick={e => this.handleChange(i)} />
                            // <img src={link} key={i} />
                        ))
                    }
                </div>
                {this.state.mainPicture !== ''
                    ? <img src={this.state.mainPicture} alt='item'
                        style={{ marginLeft: 25, height: 510, width: 610, backgroundColor: '#white', objectFit: 'contain' }} />
                    : <img src={gallery[0]} alt='item'
                        style={{ marginLeft: 25, height: 510, width: 610, backgroundColor: '#white', objectFit: 'contain' }} />
                }
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
                                                        <div className="PDP__product_attribute-item" key={item.id}
                                                            style={{ height: 32, width: 32, border: '1px solid #1D1F22', textAlign: 'center', backgroundColor: item.value }}>
                                                        </div>
                                                    ))
                                                }
                                            </div>
                                        </>
                                        : <>
                                            <p className="PDP__product_attribute-name">{element.name}</p>
                                            <div className="PDP__product_attribute-items">
                                                {
                                                    element.items.map(item => (
                                                        <div className="PDP__product_attribute-item" key={item.id}
                                                            style={{ height: 54, width: 64, border: '1px solid #1D1F22', textAlign: 'center' }}>
                                                            {item.value}
                                                        </div>
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
                            ? <p>SOLD OUT</p>
                            :
                            <>
                                <p className="PDP__product_attribute-price"> {currency}
                                    {prices.filter((price) => (price.currency.symbol === currency))[0].amount}
                                </p>
                                {console.log(prices)}
                                {/* <p>{prices && prices.filter((price) => (price.currency.label === this.state.currency)).amount} {this.state.currency}<p> */}
                                <button className="PDP__product_add-to-cart"
                                    onClick={() => this.props.onPressAdd(product)}>ADD TO CART</button>
                            </>
                        }
                    </div>
                    {console.log(this.props)}
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
    onPressAdd: product => dispatch(addToCart(product)),
});


export default connect(mapStateToProps, mapDispatchToProps)(WithRouter(PDP));

