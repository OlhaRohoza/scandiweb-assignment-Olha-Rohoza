import { Component } from "react";
import { connect } from 'react-redux';
import CartOverlay from "./CartOverlay";
import CurrencyOverlay from "./CurrencyOverlay";
import WithRouter from "./WithRouter";
import { queryCategory } from '../components/gql-queries';


class Navbar extends Component {
    constructor(props) {
        super(props)

        this.queryCategory = queryCategory
        this.state = {
            isActiveCart: false,
            isActiveCurrency: false,
            elements: []
        }
        this.handleClickCart = this.handleClickCart.bind(this);
        this.handleClickCurrency = this.handleClickCurrency.bind(this);
    }

    // fetching the data from the endpoint with data about a certain Category name
    async componentDidMount() {
        try {
            const response = await fetch('http://localhost:4000/', {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ query: this.queryCategory })
            })
            const data = await response.json();
            // console.log(data.data.categories);

            this.setState({ elements: data.data.categories });
        } catch (err) {
            console.log(err);
        }
    }

    // handle the displaying or not a mini-cart
    handleClickCart() {
        if (!this.state.isActiveCurrency) {
            this.setState(prevState => ({
                isActiveCart: !prevState.isActiveCart
            }));
            document.body.classList.toggle('overflow-hidden');
        }
    }

    // handle the displaying or not a currency overlay
    handleClickCurrency() {
        if (!this.state.isActiveCart) {
            this.setState(prevState => ({
                isActiveCurrency: !prevState.isActiveCurrency
            }));
            document.body.classList.toggle('overflow-hidden');
        }
    }


    render() {
        const { noOfItemInCart } = this.props;
        const { pathname } = this.props.location;
        const { elements } = this.state;


        return (
            <div className="navigation">

                {/* styling in the navigation bar the page we are visiting */}
                <div className="navigation__header">
                    {
                        elements && elements.map((element, i) => (
                            <a key={i}
                                href={element.name === 'all' ? '/' : `/${element.name}`}
                                className={pathname === '/' && element.name === 'all'
                                    ? 'navigation__header_elemet navigation__header_elemet--selected'
                                    : pathname === ('/' + element.name)
                                        ? 'navigation__header_elemet navigation__header_elemet--selected' : 'navigation__header_elemet'}
                            >{element.name}</a>
                        ))
                    }
                </div>

                <img className="navigation__logo" src="/a-logo.svg" alt='logo' />

                <div className="navigation__actions">
                    <CurrencyOverlay isActive={this.state.isActiveCurrency} handleClickCurrency={this.handleClickCurrency} />

                    <div className="navigation__cart">
                        <img className="navigation__actions--cart" src="/Vector.svg" alt='vector'
                            onClick={() => this.handleClickCart()} />
                        {noOfItemInCart > 0 ? <p className="navigation__cart_items">{noOfItemInCart} </p> : <p></p>}
                    </div>

                    <CartOverlay isActive={this.state.isActiveCart} handleClickCart={this.handleClickCart} />
                </div>

            </div >);
    }
}
const mapStateToProps = state => ({
    currency: state.shopping.currency,
    noOfItemInCart: state.shopping.noOfItemInCart,
    cart: state.shopping.cart
});

export default connect(mapStateToProps, null)(WithRouter(Navbar));