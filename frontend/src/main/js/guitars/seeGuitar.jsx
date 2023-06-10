import React, { Component } from 'react';
import GuitarsNavBar from './guitarsNavBar';
import {
    Container,
    TextField
} from "@mui/material";
import {useParams} from "react-router-dom";
import App from "../app";

function withParams(Component) {
    return props => <Component {...props} params={useParams()} />;
}

class SeeGuitar extends Component {

    constructor(props) {
        super(props);
        this.state = {parent: this.props.parent, creationYear: null, model: "", type: "", color: "",
            price: null, isLoading: true};
        this.id = this.props.params.id
        this.fillTextFields()
    }

    componentDidMount() {
        this.forceUpdate();
    }

    fillTextFields() {
        fetch(App.API_URL + '/api/guitars/dto/' + this.id)
            .then(response => response.json())
            .then(guitar =>
                this.setState({price: guitar.price,
                    creationYear: guitar.creationYear, model: guitar.model, type: guitar.type,
                    color: guitar.color,
                    shop: guitar.shop})
            )
            .then(() => this.setState({isLoading: false}))
    }

    render() {
        const {creationYear, price, model, type, color, shop, isLoading} = this.state
        if (isLoading) {
            return <p>Loading...</p>
        }
        return (
            <Container maxWidth={false}>
                <GuitarsNavBar parent={this}></GuitarsNavBar>
                <br/><br/>
                <Container>
                    <TextField id="outlined-number" label="Creation year" variant="filled"
                               InputProps={{readOnly: true,}} defaultValue={creationYear}/>
                    <br/><br/>
                    <TextField id="outlined-number" label="Price" variant="filled"
                               InputProps={{readOnly: true,}} defaultValue={price}/>
                    <br/><br/>
                    <TextField id="outlined-basic" label="Model" variant="filled"
                               InputProps={{readOnly: true,}} defaultValue={model}/>
                    <br/><br/>
                    <TextField id="outlined-basic" label="Type" variant="filled"
                               InputProps={{readOnly: true,}} defaultValue={type}/>
                    <br/><br/>
                    <TextField id="outlined-basic" label="Color" variant="filled"
                               InputProps={{readOnly: true,}} defaultValue={color}/>
                    <br/><br/>
                    <TextField id="outlined-basic" label="Shop" variant="filled"
                               InputProps={{readOnly: true,}} defaultValue={shop.name}/>
                </Container>
            </Container>
        );
    }
}
export default withParams(SeeGuitar);