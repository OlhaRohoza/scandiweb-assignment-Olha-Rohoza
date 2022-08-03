import { Component } from "react";
import { connect } from 'react-redux';
import { changeCurrency } from '../redux/actions'

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
        this.state = {
            // currency: 'USD',
            currencies: []
        }
        // this.handleChange = this.handleChange.bind(this)

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

    // handleChange(event) {
    //     this.setState({ currency: event.target.value })
    // }

    render() {
        const { currencies } = this.state;
        const { currency, cart } = this.props;
        console.log('here')
        console.log(this.props);

        return (
            <div className="navigation">
                <div className="navigation__header">
                    <a className="navigation__header_elemet navigation__header_elemet--selected" href="/">all</a>
                    <a className="navigation__header_elemet" href="/tech">tech</a>
                    <a className="navigation__header_elemet" href="/clothes">clothes</a>
                </div>

                <img className="navigation__logo" src="/a-logo.svg" />

                <div className="navigation__actions">
                    <select name="currency" className='navigation__actions_currency'
                        value={currency.currency} onChange={e => this.props.onSelect(e.target.value)}>
                        {currencies &&
                            currencies.map((currency, index) => (
                                <option key={index} value={currency.symbol} > {currency.symbol}</option>
                            ))
                        }
                    </select>

                    <div className="navigation__cart">
                        <img className="navigation__actions--cart" src="/Vector.svg" />
                        {/* {inCart.noOfItemInCart > 0 ? <p>{inCart.noOfItemInCart} </p> : <p>''</p>} */}
                    </div>
                </div>
            </div >);
    }
}
const mapStateToProps = state => ({
    currency: state.currency,
    cart: state.cart
});

const mapDispatchToProps = dispatch => ({
    onSelect: currency => dispatch(changeCurrency(currency)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);