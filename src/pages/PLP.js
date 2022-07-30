import { Component } from "react";
import { useNavigate } from "react-router-dom";

class PLP extends Component {
    constructor(props) {
        super(props)
        // console.log(props);
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
                                            label
                                        }
                                        amount
                                    }
                                }
                            }

                        }`
        this.state = {
            category: [],
            currency: 'USD'
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
        const { navigate } = this.props;

        return (
            <div className="PLP__container">
                <h2>Category name</h2>
                <div className="PLP__cards">
                    {category && category.slice(0, 6).map((item) => (
                        <div className="PLP__card" key={item.id} onClick={() => navigate(`/PDP/${item.id}`)}>
                            <img src={item.gallery[0]} style={!item.inStock ? { width: 350, height: 330, opacity: 0.5 } : { width: 350, height: 330 }} />
                            <p>{item.name}</p>
                            <p><strong>{item.prices.filter((price) => (price.currency.label == this.state.currency))[0].amount} {this.state.currency}</strong></p>
                            <p>{!item.inStock ? "SOLD OUT" : ''}</p>
                        </div>
                    ))}
                </div>
            </div>)
        // }

    }
}
export default function PLPf(props) {
    let navigate = useNavigate();
    return <PLP {...props} navigate={navigate} />
}

