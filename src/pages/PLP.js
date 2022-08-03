import { Component } from "react";
import WithRouter from "../components/WithRouter";
import { connect } from 'react-redux';
import { addToCart } from '../redux/actions';


class PLP extends Component {
    constructor(props) {
        super(props)
        this.queryCategories = `
                    {
                            category (input: {
                                title: "${props.select}"
                            }) {
                                name
                        products {
                                    id
                                    name
                                    category
                                    gallery
                                    inStock
                            prices {
                            currency {
                                            symbol
                                        }
                                        amount
                                    }
                                }
                            }

                        }`
        this.state = {
            category: [],
            // currency: 'USD'
        }
    }

    async componentDidMount() {
        try {
            const response = await fetch('http://localhost:4000/', {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ query: this.queryCategories })
            })
            const data = await response.json();
            console.log(data.data.category.products);
            this.setState({ category: data.data.category.products });
        } catch (err) {
            console.log(err);
        }
    }

    render() {
        const { category } = this.state;
        const { navigate, currency } = this.props;

        return (
            <div className="PLP__container">
                <h2>Category name</h2>
                <div className="PLP__cards">
                    {category && category.slice(0, 6).map((item) => (
                        <div className="PLP__card" key={item.id} onClick={() => navigate(`/PDP/${item.id}`)}>
                            <img src={item.gallery[0]} style={!item.inStock
                                ? { width: 350, height: 330, objectFit: 'contain', opacity: 0.5, backgroundColor: '#FFFFFF' }
                                : { width: 350, height: 330, objectFit: 'contain' }} />

                            <img src="/Common.png" className="PLP__button" onClick={() => this.props.onPressAdd(item)} />

                            <p>{item.name}</p>
                            <p><strong>{currency}
                                {item.prices.filter((price) => (price.currency.symbol === currency))[0].amount}
                            </strong></p>
                            <p>{!item.inStock ? "SOLD OUT" : ''}</p>
                        </div>
                    ))
                    }
                </div>
            </div >)
        // }

    }
}

const mapStateToProps = state => ({
    currency: state.shopping.currency,
    noOfItemInCart: state.shopping.noOfItemInCart,
    cart: state.shopping.cart
});

const mapDispatchToProps = dispatch => ({
    onPressAdd: product => dispatch(addToCart(product)),
});


export default connect(mapStateToProps, mapDispatchToProps)(WithRouter(PLP));


