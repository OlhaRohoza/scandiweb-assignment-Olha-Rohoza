import { Component } from "react";
import WithRouter from "../components/WithRouter";
import { connect } from 'react-redux';
import { addToCart, deleteFromCart } from '../redux/actions';
import CartPictures from "../components/CartPictures";


class Cart extends Component {
    constructor(props) {
        super(props)
        this.countTotal = this.countTotal.bind(this)
        this.countTax = this.countTax.bind(this)
    }

    // this method counts the total in the cart
    countTotal() {
        let total = 0;

        this.props.cart.map((item) =>
            (total += (item.quantity * item.prices.filter((price) => (price.currency.symbol === this.props.currency))[0].amount)))
        return total.toFixed(2);
    }

    // this method counts the tax in the cart
    countTax() {
        let total = 0;
        let tax = 0;

        this.props.cart.map((item) =>
            (total += (item.quantity * item.prices.filter((price) => (price.currency.symbol === this.props.currency))[0].amount)))
        tax = (total * 0.2).toFixed(2);
        return tax;
    }


    render() {
        const { cart, currency, noOfItemInCart, addToCart, deleteFromCart } = this.props;
        console.log(this.props)

        return (
            <div className="Cart__container">
                <p className="Cart__container_name">Cart</p>
                <div className="Cart__items">

                    {
                        cart.map((product) => (
                            <div className="Cart__item" key={product.name}>
                                <div className="Cart__item_main">
                                    <p className="Cart__item-brand">{product.brand}</p>
                                    <p className="Cart__item-name">{product.name}</p>
                                    <p className="Cart__item-price"> <span>
                                        {currency} {product.prices.filter((price) => (price.currency.symbol === currency))[0].amount}
                                    </span></p>

                                    {
                                        product.attributes.map((element) =>
                                            <div className="Cart__item-attributes" key={element.name}>
                                                {
                                                    // if the product has color in the swatch attribute
                                                    element.name === 'Color'
                                                        ? <>
                                                            <p className="Cart__attribute-name">{element.name}</p>
                                                            <div className="Cart__attribute-items">
                                                                {
                                                                    element.items.map((item, index) => (
                                                                        <div key={index}
                                                                            // change style according to the "selected attributes" 
                                                                            className={product.selectedAttributes.length >= 2 && product.selectedAttributes.find(x => x.value === item.value)
                                                                                ? 'Cart__attribute-item Cart__attribute-item-color Cart__attribute-item-color-selected'
                                                                                : (element.name === product.selectedAttributes.name && item.value === product.selectedAttributes.value)
                                                                                    ? 'Cart__attribute-item Cart__attribute-item-color Cart__attribute-item-color-selected' : 'Cart__attribute-item Cart__attribute-item-color'}
                                                                            style={{ backgroundColor: item.value }}>
                                                                        </div>))
                                                                }
                                                            </div>
                                                        </>
                                                        : <>
                                                            <p className="Cart__attribute-name">{element.name}</p>
                                                            <div className="Cart__attribute-items">
                                                                {
                                                                    element.items.map((item, index) => (
                                                                        <div key={index}
                                                                            // change style according to the "selected attributes" 
                                                                            className={product.selectedAttributes.length >= 2 && product.selectedAttributes.find(x => (x.value === item.value && x.name === element.name))
                                                                                ? 'Cart__attribute-item Cart__attribute-item-other Cart__attribute-item-other-selected'
                                                                                : (element.name === product.selectedAttributes.name && item.value === product.selectedAttributes.value)
                                                                                    ? 'Cart__attribute-item Cart__attribute-item-other Cart__attribute-item-other-selected' : 'Cart__attribute-item Cart__attribute-item-other'}
                                                                        > {item.value}</div>

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
                                        {/* adjusting the quality in the cart for the certain product by "id" and "selected attributes" */}
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
                                        {/* adjusting the quality or deleting from the cart for the certain product by "id" and "selected attributes" */}
                                        <button className="Cart__item-button" onClick={() => deleteFromCart(
                                            {
                                                id: product.id,
                                                quantity: product.quantity,
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
                    <div className="Cart__total--part">
                        <p className="Cart__total--part-one">Tax 20%</p>
                        <p className="Cart__total--part-two">{currency}
                            {this.countTax()}</p>
                    </div>
                    <div className="Cart__total--part">
                        <p className="Cart__total--part-one">Quantity:</p>
                        <p className="Cart__total--part-two">{noOfItemInCart}</p>
                    </div>
                    <div className="Cart__total--part">
                        <p className="Cart__total--part-one">Total:</p>
                        <p className="Cart__total--part-two">{currency} {this.countTotal()}</p>
                    </div>
                    <button className="Cart__button-order">ORDER</button>
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