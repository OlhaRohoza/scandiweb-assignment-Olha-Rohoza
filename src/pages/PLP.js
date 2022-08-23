import { Component } from "react";
import WithRouter from "../components/WithRouter";
import { connect } from 'react-redux';
import { addToCart } from '../redux/actions';
import { queryCategoriesPLP } from '../components/gql-queries';


// PLP - product listing page, a.k.a. category page = three categories: all, tech, clothes
class PLP extends Component {

    constructor(props) {
        super(props)
        this.queryCategories = queryCategoriesPLP;
        this.state = {
            categories: [],
            category: [],
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
            console.log(data.data.categories);

            // data.data.categories.map(element => console.log(element.products))

            this.setState({ categories: data.data.categories });
        } catch (err) {
            console.log(err);
        }
    }



    render() {
        const { navigate, currency, addToCart, select } = this.props;

        console.log(Object.values(this.state.categories.filter(element => element.name === select).map(element => element.products.map(item => item.id))))

        const { categories } = this.state;

        return (
            <div className="PLP__container">

                <p className="PLP__container_name">Category "{this.props.select}"</p>
                <div className="PLP__cards">

                    {categories && Object.values(this.state.categories.filter(element => element.name === select)
                        .map(element => element.products.slice(0, 6).map(item => (

                            // Should be able to visit product page by clicking anywhere on product card.
                            <div className="PLP__card" key={item.id} onClick={() => navigate(`/PDP/${item.id}`)} >

                                <div className="PLP__cards_picture">
                                    <img src={item.gallery[0]} alt='item'
                                        className={!item.inStock ? 'PLP__cards_picture-outstock' : ''} />
                                </div>
                                <>
                                    <div className="PLP__card_description">
                                        <p className="PLP__card_brand-name" >{item.brand} {item.name}</p>
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
                        ))))}
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


