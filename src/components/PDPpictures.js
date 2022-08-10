import { Component } from "react";


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

        const smallPictureStyle = { height: 79, width: 80, backgroundColor: 'white', objectFit: 'contain' };
        const mainPictureStyle = { marginLeft: 25, height: 510, width: 610, backgroundColor: '#white', objectFit: 'contain' }

        console.log(gallery)

        return (
            <>
                <div className="PDP__pictures_small">
                    {
                        gallery && gallery.slice(0, 6).map((picture, i) => (
                            <img key={i} src={picture} alt='item' style={smallPictureStyle} onClick={e => this.handleChange(i)} />
                        ))
                    }
                </div>
                {
                    this.state.mainPicture !== ''
                        ? <img src={this.state.mainPicture} alt='item' style={mainPictureStyle} />
                        : <img src={gallery[0]} alt='item' style={mainPictureStyle} />
                }
            </>
        )
    }
}

export default PDPpictures;