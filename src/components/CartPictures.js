import { Component } from "react";


// Component for displaying pictures in the Cart page for a certain product
class CartPictures extends Component {
    constructor(props) {
        super(props)
        this.state = {
            numberOfPicture: 0
        }
    }


    render() {
        const { name, gallery } = this.props;
        const { numberOfPicture } = this.state;

        return (
            <div className="Cart__item_part">
                <img className="Cart__item_picture"
                    src={gallery[numberOfPicture]}
                    alt={name}
                    style={{ width: 200, height: 288, objectFit: 'contain' }}
                />
                {
                    gallery.length >= 2 && (
                        <div className="Cart__item_picture--buttons">
                            {/* display arrows only when there are multiple images */}
                            <button
                                disabled={numberOfPicture === 0}
                                className="Cart__item_picture--button"
                                onClick={() => (numberOfPicture > 0 && numberOfPicture < gallery.length
                                    ? this.setState({ numberOfPicture: numberOfPicture - 1 })
                                    : this.setState({ numberOfPicture: 0 })
                                )}> &#60; </button>
                            <button
                                disabled={numberOfPicture === gallery.length - 1}
                                className="Cart__item_picture--button"
                                onClick={() => (numberOfPicture < gallery.length - 1
                                    ? this.setState({ numberOfPicture: numberOfPicture + 1 })
                                    : this.setState({ numberOfPicture: numberOfPicture - 1 })
                                )}> &#62; </button>
                        </div>
                    )
                }
            </div>
        )
    }
}

export default CartPictures