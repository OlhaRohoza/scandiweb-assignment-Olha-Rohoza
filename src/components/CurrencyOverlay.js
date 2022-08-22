import { Component } from "react";
import { connect } from 'react-redux';
import { changeCurrency } from '../redux/actions';
import { queryCurrency } from './gql-queries';


class CurrencyOverlay extends Component {
    constructor(props) {
        super(props)

        this.state = {
            currencies: [],
        }

        // this.handleChange = this.handleChange.bind(this);
    }

    // fetching the data from the endpoint with currency data
    async componentDidMount() {
        try {
            const response = await fetch('http://localhost:4000/', {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ query: queryCurrency })
            })
            const data = await response.json();
            // console.log(data.data.currencies);
            this.setState({ currencies: data.data.currencies });
        } catch (err) {
            console.log(err);
        }
    }

    // handle the changes of the state of currency
    // handleChange(e) {
    //     this.props.changeCurrency(e.target.value);
    // '&and;'
    // }


    render() {

        const { currencies, sign } = this.state;
        const { currency, isActive } = this.props;
        console.log(this.props);
        console.log(currencies);

        let classNameInActive = 'navigation__header_elemet';
        let classNameActive = 'navigation__header_elemet navigation__header_elemet--selected';

        return (
            <div className='navigation__actions_currency'>
                <div className="currency__signs">
                    <p onClick={() => this.props.handleClick()}>{currency}</p>
                    {isActive ? <p className="currency__sign-overlay">&and;</p> : <p className="currency__sign-overlay">&or;</p>}
                    <p>{sign}</p>
                </div>
                <div className="currency__overlay" style={this.props.isActive ? { display: "block" } : { display: 'none' }}>
                    {
                        currencies && currencies.filter(element => element.label !== currency)
                            .map(item => (
                                <div className="currency__overlay-row">
                                    {item.symbol} {item.label}
                                </div>
                            ))
                    }
                </div>

                {/* value={currency} onChange={e => this.handleChange(e)}> */}
                {/* {currencies &&
                    currencies.map((valuta, index) => (
                        <option key={index} value={valuta.symbol} > {valuta.symbol}</option>
                    ))
                } */}
            </div>
        )
    }
}

const mapStateToProps = state => ({
    currency: state.shopping.currency,
});

const mapDispatchToProps = dispatch => ({
    changeCurrency: currency => dispatch(changeCurrency(currency))
});


export default connect(mapStateToProps, mapDispatchToProps)(CurrencyOverlay);