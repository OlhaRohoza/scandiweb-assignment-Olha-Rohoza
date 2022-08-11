import { Component } from "react";
import WithRouter from "../components/WithRouter";
import { connect } from 'react-redux';
import { addToCart, deleteFromCart } from '../redux/actions';
import CartPictures from "../components/CartPictures";


class Cart extends Component {
    constructor(props) {
        super(props)
        this.state = {
            total: 0,
            picture: 0
        }
    }

    componentDidMount() {
        let total = 0;

        this.props.cart.forEach((item) => {
            total += item.quantity * item.prices.filter((price) => (price.currency.symbol === this.props.currency))[0].amount;
        })
        this.setState({ total: Number(total).toFixed(2) })
    }



    render() {

        const { cart, currency, noOfItemInCart, addToCart, deleteFromCart } = this.props;
        console.log(this.props)

        return (
            <div className="Cart__container">
                <p className="Cart__container_name">Cart</p>
                <div className="Cart__items">

                    {
                        cart.map((product, i) => (
                            <div className="Cart__item" key={i}>
                                <div className="Cart__item_main">
                                    <p className="Cart__item-brand">{product.brand}</p>
                                    <p className="Cart__item-name">{product.name}</p>
                                    <p className="Cart__item-price"> <span>
                                        {currency} {product.quantity * product.prices.filter((price) => (price.currency.symbol === currency))[0].amount}
                                    </span></p>

                                    {
                                        product.attributes.map((element, i) =>
                                            <div className="Cart__item-attributes" key={i}>
                                                {
                                                    element.name === 'Color'
                                                        ? <>
                                                            <p className="Cart__attribute-name">{element.name}</p>
                                                            <div className="Cart__attribute-items">
                                                                {
                                                                    element.items.map(item => (
                                                                        <div className="Cart__attribute-item" key={item.id}
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
                                                            <p className="Cart__attribute-name">{element.name}</p>
                                                            <div className="Cart__attribute-items">
                                                                {
                                                                    element.items.map(item => (
                                                                        <div className="Cart__attribute-item" key={item.id}
                                                                            // onClick={(e) => this.handleChange(element.name, item.value)}
                                                                            style={
                                                                                product.selectedAttributes.length >= 2 && product.selectedAttributes.find(x => (x.value === item.value && x.name === element.name))
                                                                                    ? { height: 45, width: 63, border: '1px solid #1D1F22', textAlign: 'center', backgroundColor: 'black', color: '#FFFFFF' }
                                                                                    : (element.name === product.selectedAttributes.name && item.value === product.selectedAttributes.value)
                                                                                        ? { height: 45, width: 63, border: '1px solid #1D1F22', textAlign: 'center', backgroundColor: 'black', color: '#FFFFFF' }
                                                                                        : { height: 45, width: 63, border: '1px solid #1D1F22', textAlign: 'center', backgroundColor: '#FFFFFF', color: 'black' }
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
                                <div className="Cart__item_actions">
                                    <div className="Cart__item_buttons">
                                        <button className="Cart__item-button" onClick={() => addToCart(
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
                                        <p className="Cart__item-amount">{product.quantity}</p>
                                        <button className="Cart__item-button" onClick={() => deleteFromCart(
                                            {
                                                index: i,
                                                id: product.id,
                                                selectedAttributes: product.selectedAttributes
                                            }
                                        )}>-</button>
                                    </div>
                                    <CartPictures gallery={product.gallery} name={product.name} />

                                </div>

                            </div>

                        ))
                    }
                </div>
                <div className="Cart__total">
                    <p>Total</p>
                    <p> {currency} {this.state.total}</p>

                    <button className="Cart__button-checkout">CHECK OUT</button>
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


export default connect(mapStateToProps, mapDispatchToProps)(WithRouter(Cart));