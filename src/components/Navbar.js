import { Component } from "react";
import { connect } from 'react-redux';
import CartOverlay from "./CartOverlay";
import CurrencyOverlay from "./CurrencyOverlay";
import WithRouter from "./WithRouter";


class Navbar extends Component {
    constructor(props) {
        super(props)

        this.elements = ['all', 'tech', 'clothes']
        this.state = {
            isActive: false
        }
        this.handleClick = this.handleClick.bind(this);
    }

    // handle the displaying or not a mini-cart
    handleClick() {
        this.setState(prevState => ({
            isActive: !prevState.isActive
        }));
        document.body.classList.toggle('overflow-hidden');
    }


    render() {
        const { noOfItemInCart } = this.props;
        const { pathname } = this.props.location;

        let classNameInActive = 'navigation__header_elemet';
        let classNameActive = 'navigation__header_elemet navigation__header_elemet--selected';


        return (
            <div className="navigation">

                {/* styling in the navigation bar the page we are visiting */}
                <div className="navigation__header">
                    {
                        this.elements.map((element, i) => (
                            <a key={i} href={element !== 'all' ? `/${element}` : '/'}
                                className={pathname === '/' && element === 'all' ? classNameActive
                                    : pathname === ('/' + element) ? classNameActive : classNameInActive}
                            >{element}</a>
                        ))
                    }
                </div>

                <img className="navigation__logo" src="/a-logo.svg" alt='logo' />

                <div className="navigation__actions">
                    <CurrencyOverlay isActive={this.state.isActive} handleClick={this.handleClick} />

                    <div className="navigation__cart">
                        <img className="navigation__actions--cart" src="/Vector.svg" alt='vector'
                            onClick={() => this.handleClick()} />
                        {noOfItemInCart > 0 ? <p className="navigation__cart_items">{noOfItemInCart} </p> : <p></p>}
                    </div>
                    <CartOverlay isActive={this.state.isActive} handleClick={this.handleClick} />
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