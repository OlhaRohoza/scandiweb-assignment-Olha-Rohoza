import { Component } from "react";
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import { changeCurrency } from '../redux/actions';
import WithRouter from "./WithRouter";

class Navbar extends Component {
    constructor(props) {
        super(props)
        this.queryCurrency = `
                        {
                            currencies {
                            label
                            symbol
                            }
                        }
                        `
        this.elements = ['all', 'tech', 'clothes']
        this.state = {
            currencies: [],
        }
    }

    async componentDidMount() {
        try {
            const response = await fetch('http://localhost:4000/', {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ query: this.queryCurrency })
            })
            const data = await response.json();
            // console.log(data.data.currencies);
            this.setState({ currencies: data.data.currencies });
        } catch (err) {
            console.log(err);
        }
    }

    render() {
        const { currencies } = this.state;
        const { currency, noOfItemInCart } = this.props;
        const { pathname } = this.props.location;
        // console.log(this.props);
        // console.log(pathname)

        let classNameInActive = 'navigation__header_elemet';
        let classNameActive = 'navigation__header_elemet navigation__header_elemet--selected';


        return (
            <div className="navigation">

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

                <img className="navigation__logo" src="/a-logo.svg" />

                <div className="navigation__actions">
                    <select className='navigation__actions_currency'
                        value={currency} onChange={e => this.props.onSelect(e.target.value)}>
                        {currencies &&
                            currencies.map((valuta, index) => (
                                <option key={index} value={valuta.symbol} > {valuta.symbol}</option>
                            ))
                        }
                    </select>

                    <div className="navigation__cart">
                        <img className="navigation__actions--cart" src="/Vector.svg" />
                        {noOfItemInCart > 0 ? <p className="navigation__cart_items">{noOfItemInCart} </p> : <p></p>}
                    </div>
                </div>

            </div >);
    }
}
const mapStateToProps = state => ({
    currency: state.shopping.currency,
    noOfItemInCart: state.shopping.noOfItemInCart,
    cart: state.shopping.cart
});

const mapDispatchToProps = dispatch => ({
    onSelect: currency => dispatch(changeCurrency(currency))
});

export default connect(mapStateToProps, mapDispatchToProps)(WithRouter(Navbar));