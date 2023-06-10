import React, { Component } from "react";
import { useParams } from "react-router-dom";
import { Container, TextField } from "@mui/material";
import CouriersNavBar from "./couriersNavBar";
import App from "../app";

function withParams(Component) {
    return props => <Component {...props} params={useParams()} />;
}

class SeeCourier extends Component {
    constructor(props) {
        super(props);
        this.state = {parent: this.props.parent,
            name: "", email: "", telephoneNumber: "", deliveryPrice: null, address: "", description: "", isLoading: true};
        this.id = this.props.params.id;
        this.fillTextFields();
    }

    componentDidMount() {
        this.forceUpdate();
    }

    fillTextFields() {
        fetch(App.API_URL + '/api/couriers/' + this.id)
            .then(response => response.json())
            .then(courier =>
                this.setState({name: courier.name, email: courier.email, 
                    telephoneNumber: courier.telephoneNumber, deliveryPrice: courier.deliveryPrice,
                    address: courier.address, description: courier.description})
            )
            .then(() => this.setState({isLoading: false}));
    }

    render() {
        const {name, email, telephoneNumber, deliveryPrice, address, description, isLoading} = this.state
        if (isLoading)
            return <p>Loading...</p>;
        return (
            <Container maxWidth={false}>
                <CouriersNavBar parent={this}></CouriersNavBar>
                <br/><br/>
                <Container>
                    <TextField id="courierName" label="Name" variant="filled"
                               InputProps={{readOnly: true,}} defaultValue={name}/>
                    <br/><br/>
                    <TextField id="courierEmail" label="Email" variant="filled"
                               InputProps={{readOnly: true,}} defaultValue={email}/>
                    <br/><br/>
                    <TextField id="courierPhone" label="Phone" variant="filled"
                               InputProps={{readOnly: true,}} defaultValue={telephoneNumber}/>
                    <br/><br/>
                    <TextField id="courierDeliveryPrice" label="Delivery Price" variant="filled"
                               InputProps={{readOnly: true,}} defaultValue={deliveryPrice}/>
                    <br/><br/>
                    <TextField id="courierAddress" label="Address" variant="filled"
                               InputProps={{readOnly: true,}} defaultValue={address}/>
                    <br/><br/>
                    <TextField id="courierDescription" label="Description" variant="filled"
                               InputProps={{readOnly: true,}} defaultValue={description}/>
                </Container>
            </Container>
        );
    }
}

export default withParams(SeeCourier);