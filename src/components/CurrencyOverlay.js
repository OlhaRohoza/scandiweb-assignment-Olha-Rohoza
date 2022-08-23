import { Component } from "react";
import { connect } from 'react-redux';
import { changeCurrency } from '../redux/actions';
import { queryCurrency } from './gql-queries';


class CurrencyOverlay extends Component {
    constructor(props) {
        super(props)

        this.state = {
            currencies: [],
            isActive: false
        }

        this.handleClick = this.handleClick.bind(this);
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

    // handle the displaying or not a mini-cart
    handleClick() {
        this.setState(prevState => ({
            isActive: !prevState.isActive
        }));
        document.body.classList.toggle('overflow-hidden');
    }

    // handle the changes of the state of currency
    // handleChange(e) {
    //     this.props.changeCurrency(e.target.value);
    // '&and;'
    // }


    render() {

        const { currencies, sign } = this.state;
        const { currency } = this.props;

        console.log(currencies);


        return (
            <div className='navigation__actions_currency'>
                <div className="currency__signs" onClick={() => this.handleClick()}>
                    <p>{currency}</p>
                    {this.state.isActive ? <p className="currency__sign-overlay">&and;</p> : <p className="currency__sign-overlay">&or;</p>}
                    <p>{sign}</p>
                </div>
                <div className={this.state.isActive ? "currency__overlay displayed" : "currency__overlay hidden"}>
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