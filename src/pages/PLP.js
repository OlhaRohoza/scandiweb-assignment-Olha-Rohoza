import { Component } from "react";
import WithRouter from "../components/WithRouter";
import { connect } from 'react-redux';
import { addToCart } from '../redux/actions';


// PLP - product listing page, a.k.a. category page = three categories: all, tech, clothes
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
                                    brand
                                    category
                                    gallery
                                    inStock
                            attributes{
                                name
                                items {
                                value
                                }
                            }
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
            category: []
        }
    }

    // fetching the data from the endpoint with data about a certain Category 
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
        const { navigate, currency, addToCart } = this.props;


        return (
            <div className="PLP__container">

                <p className="PLP__container_name">Category "{this.props.select}"</p>
                <div className="PLP__cards">

                    {category && category.slice(0, 6).map((item) => (
                        <div className="PLP__card" key={item.id} >

                            <div className="PLP__cards_picture">
                                <img src={item.gallery[0]} alt='item'
                                    style={!item.inStock ? { opacity: 0.5 } : {}} />
                            </div>
                            <>
                                <div className="PLP__card_description">
                                    <p className="PLP__card_brand-name"
                                        onClick={() => navigate(`/PDP/${item.id}`)} >{item.brand} {item.name}</p>
                                    <p><strong>{currency}
                                        {item.prices.filter((price) => (price.currency.symbol === currency))[0].amount} </strong></p>
                                    <p className="PLP_card_stock">{!item.inStock ? "OUT OF STOCK" : ''}</p>

                                    {/* the cart-image will appear if the product is inStock and you hover over the product-card
                                        after the clicking on cart the product with be added to the cart with first selected attributes as defaults.  */}
                                    {
                                        item.inStock &&
                                        <img src="/Common.png" alt='cart' className="PLP__card_button"
                                            onClick={() => addToCart(
                                                {
                                                    id: item.id,
                                                    name: item.name,
                                                    brand: item.brand,
                                                    gallery: item.gallery,
                                                    prices: item.prices,
                                                    attributes: item.attributes,
                                                    selectedAttributes: item.attributes.length === 0 ? []
                                                        : item.attributes.length === 1
                                                            ? { name: item.attributes[0].name, value: item.attributes[0].items[0].value }
                                                            : item.attributes.map(x => ({ name: x.name, value: x.items[0].value }))
                                                }

                                            )}
                                        />
                                    }
                                </div>
                            </>
                        </div>
                    ))}
                </div>
            </div >)
    }
}

const mapStateToProps = state => ({
    currency: state.shopping.currency,
    noOfItemInCart: state.shopping.noOfItemInCart,
    cart: state.shopping.cart,

});

const mapDispatchToProps = dispatch => ({
    addToCart: product => dispatch(addToCart(product)),
});


export default connect(mapStateToProps, mapDispatchToProps)(WithRouter(PLP));


