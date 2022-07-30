import { Component } from "react";


export default class Navbar extends Component {
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
            currency: 'USD',
            currencies: []
        }
        this.handleChange = this.handleChange.bind(this)

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

    handleChange(event) {
        this.setState({ currency: event.target.value })
    }

    render() {
        const { currencies } = this.state;
        return (
            <div className="navigation">
                <div className="navigation__header">
                    <a className="navigation__header_elemet navigation__header_elemet--selected" href="/">all</a>
                    <a className="navigation__header_elemet" href="/tech">tech</a>
                    <a className="navigation__header_elemet" href="/clothes">clothes</a>
                </div>
                <img className="navigation__logo" src="/a-logo.svg" />
                <div className="navigation__actions">
                    <select name="currency" className='navigation__actions_currency' value={this.state.currency} onChange={this.handleChange}>
                        {currencies &&
                            currencies.map((currency, index) => (
                                <option key={index} value={currency.label} > {currency.symbol}</option>
                            ))
                        }
                    </select>
                    <img className="navigation__actions--cart" src="/Vector.svg" />
                </div>
            </div>);
    }
}