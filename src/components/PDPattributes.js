import { Component } from "react";


class PDPattributes extends Component {
    constructor(props) {
        super(props)
        this.state = {
            selected: {}
        }
    }

    render() {

        const { attributes } = this.props;
        console.log(attributes);
        // if (attributes.length === 1) {
        //     this.setState({ selected: { name: attributes[0].name, value: attributes[0].items[0].value } })
        // } else {
        //     attributes.forEach(element => {
        //         this.setState([...this.state.selected, { selected: { name: element.name, value: element.items[0].value } }])
        //     });
        // }

        // console.log(this.state.selected)

        return (
            <>
                {
                    attributes && attributes.map(element => (

                        <div className="attributes" key={element.id}>
                            {
                                element.name === 'Color'
                                    ? <>
                                        <p className="PDP__product_attribute-name">{element.name}</p>
                                        <div className="PDP__product_attribute-items">
                                            {
                                                element.items.map(item => (
                                                    <div className="PDP__product_attribute-item" key={item.id}
                                                        style={{ height: 32, width: 32, border: '1px solid #1D1F22', textAlign: 'center', backgroundColor: item.value }}>
                                                    </div>
                                                ))
                                            }
                                        </div>
                                    </>
                                    : <>
                                        <p className="PDP__product_attribute-name">{element.name}</p>
                                        <div className="PDP__product_attribute-items">
                                            {
                                                element.items.map(item => (
                                                    <div className="PDP__product_attribute-item" key={item.id}
                                                        style={{ height: 54, width: 64, border: '1px solid #1D1F22', textAlign: 'center' }}>
                                                        {item.value}
                                                    </div>
                                                ))
                                            }
                                        </div>
                                    </>

                            }
                        </div>
                    ))
                }
            </>
        )
    }
}

export default PDPattributes;