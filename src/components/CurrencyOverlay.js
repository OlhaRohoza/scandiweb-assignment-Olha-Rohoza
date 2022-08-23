import { Component } from "react";
import { connect } from 'react-redux';
import { changeCurrency } from '../redux/actions';
import { queryCurrency } from './gql-queries';


class CurrencyOverlay extends Component {
    constructor(props) {
        super(props)

        this.state = {
            currencies: []
        }

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


    render() {

        const { currencies } = this.state;
        const { currency, changeCurrency, isActive, handleClickCurrency } = this.props;

        console.log(this.props);

        return (
            <div className='navigation__actions_currency'>
                <div className="currency__signs" onClick={() => handleClickCurrency()}>
                    <p>{currency}</p>
                    {isActive ? <p className="currency__sign-overlay">&and;</p> : <p className="currency__sign-overlay">&or;</p>}
                </div>

                <div className={isActive ? "currency-overlay displayed" : "currency__overlay hidden"}>
                    <div className={isActive ? "currency-overlay__container displayed" : "currency-overlay__container hidden"} >
                        {
                            currencies && currencies.filter(element => element.symbol !== currency)
                                .map((item, i) => (
                                    <p className="currency-overlay__row" key={i}
                                        onClick={() => changeCurrency(item.symbol)}
                                    > {item.symbol} {item.label}
                                    </p>
                                ))
                        }
                    </div>
                </div>
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