import { Component } from "react";

class SmallCart extends Component {


    render() {
        return (
            <div className="smallCart__container">
                <p className="smallCart__name"><strong>My Bag</strong> { }__ items</p>
                <div className="smallCart__items">
                    <div className="smallCart__item">
                        <div className="smallCart__item_part">
                            <p>Brand</p>
                            <p>Name</p>
                            <p>price</p>
                            <p>attributes</p>
                        </div>
                        <div className="smallCart__item_part">
                            <button>+</button>
                            <p>AMOUNT</p>
                            <button>-</button>
                        </div>
                        <div className="smallCart__item_part">
                            <p>IMG</p>
                        </div>

                    </div>
                </div>
                <div >
                    <p>Total</p>
                    <p> !!! SUM</p>
                </div>
                <div className="smallCart__buttons">
                    <button>VIEW BAG</button>
                    <button>CHECK OUT</button>
                </div>
            </div>)
    }
}