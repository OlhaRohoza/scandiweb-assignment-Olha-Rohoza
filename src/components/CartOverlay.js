import { Component } from "react";
import WithRouter from "./WithRouter";
import { connect } from 'react-redux';
import { addToCart, deleteFromCart } from '../redux/actions';


class CartOverlay extends Component {
    constructor(props) {
        super(props)

        this.countTotal = this.countTotal.bind(this);
        this.handleMove = this.handleMove.bind(this);
    }

    // handle the total sum in the mini cart
    countTotal() {
        let total = 0;

        this.props.cart.map((item) =>
            (total += (item.quantity * item.prices.filter((price) => (price.currency.symbol === this.props.currency))[0].amount)))
        return total.toFixed(2);
    }

    handleMove() {
        // cart-overlay closes on route change
        this.props.handleClickCart();
        this.props.navigate(`/cart`);
    }


    render() {
        const { cart, currency, noOfItemInCart, addToCart, deleteFromCart, isActive, handleClickCart } = this.props;

        return (
            <div className={isActive ? 'smallCart displayed' : 'smallCart hidden'}
                onClick={() => handleClickCart(false)}>
                <div className={isActive ? 'smallCart__container displayed' : 'smallCart__container hidden'}
                    onClick={e => e.stopPropagation()} >
                    <p className="smallCart__name"><strong>My Bag,</strong> {noOfItemInCart} items</p>
                    <div className="smallCart__items">

                        {
                            cart && cart.map((product, i) => (
                                <div className="smallCart__item" key={product.name}>
                                    <div className="smallCart__item_main">
                                        <p className="smallCart__item-title">{product.brand}</p>
                                        <p className="smallCart__item-title">{product.name}</p>
                                        <p className="smallCart__item-price"> <span>
                                            {currency} {(product.prices.filter((price) => (price.currency.symbol === currency))[0].amount).toFixed(2)}
                                        </span></p>

                                        {
                                            product.attributes.map((element, i) =>
                                                <div className="smallCart__item-attributes" key={element.name}>
                                                    {
                                                        // if the product has color in the swatch attribute
                                                        element.name === 'Color'
                                                            ? <>
                                                                <p className="smallCart__attribute-name">{element.name}</p>
                                                                <div className="smallCart__attribute-items">
                                                                    {
                                                                        element.items.map((item, index) => (
                                                                            // change style according to the "selected attributes" 
                                                                            <div className={
                                                                                product.selectedAttributes.length >= 2 && product.selectedAttributes.find(x => x.value === item.value)
                                                                                    ? 'smallCart__attribute-item-color smallCart__attribute-item-color-selected'
                                                                                    : (element.name === product.selectedAttributes.name && item.value === product.selectedAttributes.value)
                                                                                        ? 'smallCart__attribute-item-color smallCart__attribute-item-color-selected' : 'smallCart__attribute-item-color'}
                                                                                key={index}
                                                                                style={{ backgroundColor: item.value }}>
                                                                            </div>))
                                                                    }
                                                                </div>
                                                            </>
                                                            : <>
                                                                <p className="smallCart__attribute-name">{element.name}</p>
                                                                <div className="smallCart__attribute-items">
                                                                    {
                                                                        element.items.map((item, index) => (
                                                                            // change style according to the "selected attributes" 
                                                                            <div
                                                                                className={product.selectedAttributes.length >= 2 && product.selectedAttributes.find(x => (x.value === item.value && x.name === element.name))
                                                                                    ? 'smallCart__attribute-item smallCart__attribute-item-selected'
                                                                                    : (element.name === product.selectedAttributes.name && item.value === product.selectedAttributes.value)
                                                                                        ? 'smallCart__attribute-item smallCart__attribute-item-selected' : 'smallCart__attribute-item'}
                                                                                key={index}
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

                                    <div className="smallCart__item_part">
                                        {/* adjusting the quality in the cart for the certain product by "id" and "selected attributes"  */}
                                        <button className="smallCart__item-button"
                                            onClick={() =>
                                                addToCart(
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
                                        {/* adjusting the quality or deleting from the cart for the certain product by "id" and "selected attributes" */}
                                        <button className="smallCart__item-button"
                                            onClick={() => deleteFromCart(
                                                {
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
                                        />
                                    </div>
                                </div>
                            ))
                        }
                    </div>

                    <div className="smallCart__total">
                        <p>Total</p>
                        <p> {currency} {this.countTotal()}</p>
                    </div>
                    <div className="smallCart__buttons">
                        <button className="smallCart__button smallCart__button-bag"
                            onClick={() => this.handleMove()}
                        >VIEW BAG</button>
                        <button className="smallCart__button smallCart__button-checkout">CHECK OUT</button>
                    </div>
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


