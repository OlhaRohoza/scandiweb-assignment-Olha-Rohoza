import { Component } from "react";
import WithRouter from "./WithRouter";
import { connect } from 'react-redux';
import { addToCart, deleteFromCart } from '../redux/actions';

class CartOverlay extends Component {
    constructor(props) {
        super(props)
        this.state = {
            total: 0
        }
    }

    componentDidMount() {
        let total = 0;

        this.props.cart.forEach((item) => {
            total += item.quantity * item.prices.filter((price) => (price.currency.symbol === this.props.currency))[0].amount;
        })
        this.setState({ total: Number(total).toFixed(2) })
    }
    // componentDidUpdate() {
    //     let total = 0;

    //     this.props.cart.forEach((item) => {
    //         total += item.quantity * item.prices.filter((price) => (price.currency.symbol === this.props.currency))[0].amount;
    //     })
    //     this.setState({ total: Number(total).toFixed(2) })
    // }

    render() {
        console.log('cart-preview', this.props);
        console.log(this.props.cart)

        const { cart, currency, noOfItemInCart, navigate, addToCart, deleteFromCart } = this.props;

        return (
            <div className="smallCart__container" style={this.props.isActive ? { display: "block" } : { display: 'none' }}>
                <p className="smallCart__name"><strong>My Bag,</strong> {noOfItemInCart} items</p>
                <div className="smallCart__items">

                    {
                        cart && cart.map((product, i) => (
                            <div className="smallCart__item" key={i}>
                                <div className="smallCart__item_main">
                                    <p className="smallCart__item-title">{product.brand}</p>
                                    <p className="smallCart__item-title">{product.name}</p>
                                    <p className="smallCart__item-price"> <span>
                                        {currency} {product.quantity * product.prices.filter((price) => (price.currency.symbol === currency))[0].amount}
                                    </span></p>

                                    {
                                        product.attributes.map((element, i) =>
                                            <div className="smallCart__item-attributes" key={i}>
                                                {
                                                    element.name === 'Color'
                                                        ? <>
                                                            <p className="smallCart__attribute-name">{element.name}</p>
                                                            <div className="smallCart__attribute-items">
                                                                {
                                                                    element.items.map(item => (
                                                                        <div className="smallCart__attribute-item" key={item.id}
                                                                            // onClick={(e) => this.handleChange(element.name, item.value)}
                                                                            style={
                                                                                product.selectedAttributes.length >= 2 && product.selectedAttributes.find(x => x.value === item.value)
                                                                                    ? { height: 24, width: 24, border: '2px solid white', outline: '2px solid #5ECE7B', textAlign: 'center', backgroundColor: item.value }
                                                                                    : (element.name === product.selectedAttributes.name && item.value === product.selectedAttributes.value)
                                                                                        ? { height: 24, width: 24, border: '2px solid white', outline: '2px solid #5ECE7B', textAlign: 'center', backgroundColor: item.value }
                                                                                        : { height: 24, width: 24, border: 'none', textAlign: 'center', backgroundColor: item.value }
                                                                            }>
                                                                        </div>))
                                                                }
                                                            </div>
                                                        </>
                                                        : <>
                                                            <p className="smallCart__attribute-name">{element.name}</p>
                                                            <div className="smallCart__attribute-items">
                                                                {
                                                                    element.items.map(item => (
                                                                        <div className="smallCart__attribute-item" key={item.id}
                                                                            // onClick={(e) => this.handleChange(element.name, item.value)}
                                                                            style={
                                                                                product.selectedAttributes.length >= 2 && product.selectedAttributes.find(x => (x.value === item.value && x.name === element.name))
                                                                                    ? { padding: "2px 4px", border: '1px solid #1D1F22', textAlign: 'center', backgroundColor: 'black', color: '#FFFFFF' }
                                                                                    : (element.name === product.selectedAttributes.name && item.value === product.selectedAttributes.value)
                                                                                        ? { padding: "2px 4px", border: '1px solid #1D1F22', textAlign: 'center', backgroundColor: 'black', color: '#FFFFFF' }
                                                                                        : { padding: "2px 4px", border: '1px solid #1D1F22', textAlign: 'center', backgroundColor: '#FFFFFF', color: 'black' }
                                                                            }> {item.value}</div>

                                                                    ))
                                                                }
                                                            </div>
                                                        </>
                                                }
                                            </div>
                                        )
                                    }

                                </div>
                                <div className="smallCart__item_part">
                                    <button className="smallCart__item-button"
                                        onClick={() => addToCart(
                                            {
                                                id: product.id,
                                                name: product.name,
                                                brand: product.brand,
                                                gallery: product.gallery,
                                                prices: product.prices,
                                                attributes: product.attributes,
                                                selectedAttributes: product.selectedAttributes
                                            }
                                        )}>+</button>
                                    <p className="smallCart__item-amount">{product.quantity}</p>
                                    <button className="smallCart__item-button"
                                        onClick={() => deleteFromCart(
                                            {
                                                index: i,
                                                id: product.id,
                                                quantity: product.quantity,
                                                selectedAttributes: product.selectedAttributes
                                            }
                                        )}>-</button>
                                </div>
                                <div className="smallCart__item_part">
                                    <img className="smallCart__item_picture"
                                        src={product.gallery[0]}
                                        alt={product.name}
                                        style={{ width: 120, height: 190, objectFit: 'contain' }}
                                    />

                                </div>

                            </div>

                        ))
                    }
                </div>
                <div className="smallCart__total">
                    <p>Total</p>
                    <p> {currency} {this.state.total}</p>
                </div>
                <div className="smallCart__buttons">
                    <button className="smallCart__button smallCart__button-bag"
                        onClick={() => navigate(`/cart`)}
                    >VIEW BAG</button>
                    <button className="smallCart__button smallCart__button-checkout">CHECK OUT</button>
                </div>
            </div>)
    }
}


const mapStateToProps = state => ({
    currency: state.shopping.currency,
    noOfItemInCart: state.shopping.noOfItemInCart,
    cart: state.shopping.cart,

});

const mapDispatchToProps = dispatch => ({
    addToCart: product => dispatch(addToCart(product)),
    deleteFromCart: product => dispatch(deleteFromCart(product)),
});


export default connect(mapStateToProps, mapDispatchToProps)(WithRouter(CartOverlay));


