import { Component } from "react";

// Component for displaying pictures in the PDP - product description page
class PDPpictures extends Component {
    constructor(props) {
        super(props)
        this.state = {
            mainPicture: ''
        }
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(i) {
        this.setState({
            mainPicture: this.props.gallery[i]
        })
    }

    render() {
        const { gallery } = this.props;
        // console.log(gallery)

        return (
            <>
                <div className="PDP__pictures_small">
                    {
                        gallery && gallery.map((picture, i) => (
                            <img
                                key={i}
                                src={picture}
                                alt='item'
                                className="PDP__pictures_small-pictures"
                                onClick={e => this.handleChange(i)} />
                        ))
                    }
                </div>
                {
                    this.state.mainPicture !== ''
                        ? <img
                            className="PDP__pictures_main-picture"
                            src={this.state.mainPicture}
                            alt='item'
                        />
                        : <img
                            className="PDP__pictures_main-picture"
                            src={gallery[0]}
                            alt='item'
                        />
                }
            </>
        )
    }
}

export default PDPpictures;