import React, { Component } from "react";
import { useParams } from "react-router-dom";
import { Container, TextField, Button } from "@mui/material";
import CouriersNavBar from "./couriersNavBar";
import {Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@mui/material";
import App from "../app";
import Validation from "../validation";

function withParams(Component) {
    return props => <Component {...props} params={useParams()} />;
}

class UpdateCourier extends Component {
    constructor(props) {
        super(props);
        this.state = {parent: this.props.parent, name: "", email: "", telephoneNumber: "", 
        address: "", description: "", deliveryPrice: null, dialogOpen: false, isLoading: true};
        this.id = this.props.params.id;
    }

    componentDidMount() {
        this.handleCourierUpdate = this.handleCourierUpdate.bind(this);
        this.fillTextFields = this.fillTextFields.bind(this);
        this.fillTextFields();
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

    handleCourierUpdate() {
        const {name, email, telephoneNumber, address, description, deliveryPrice} = this.state;
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + App.getCurrentUserStatic().getAccessToken() },
            body: JSON.stringify({
                name: name, email: email,
                telephoneNumber: telephoneNumber, deliveryPrice: deliveryPrice,
                address: address, description: description
            })
        };
        fetch(App.API_URL + '/api/couriers/' + this.id, requestOptions)
            .then(response => response.json())
            .then(() => this.setState({dialogOpen: true}));
    }

    render() {
        const {name, email, telephoneNumber, address, description, deliveryPrice, dialogOpen, isLoading} = this.state;
        if (isLoading) {
            return <p>Loading...</p>;
        } 

        const emailValid = Validation.validEmail(email);
        const phoneValid = Validation.validPhoneNumber(telephoneNumber);
        const priceValid = Validation.validPositiveOrZero(deliveryPrice);

        return (
            <Container maxWidth={false}>
                <CouriersNavBar parent={this}></CouriersNavBar>
                <br/><br/>
                <Container>
                    <TextField id="outlined-basic" label="Name" variant="outlined"
                                defaultValue={name}
                                onChange={e => this.setState({name: e.target.value})}/>
                    <br/><br/>
                    <TextField id="outlined-basic" label="Email" variant="outlined"
                                defaultValue={email}
                                error={!emailValid}
                                helperText={!emailValid ? "Email is not valid" : ''}
                                onChange={e => this.setState({email: e.target.value})}/>
                    <br/><br/>
                    <TextField id="outlined-basic" label="Phone" variant="outlined"
                                defaultValue={telephoneNumber}
                                error={!phoneValid}
                            helperText={!phoneValid ? "Phone number is not valid" : ''}
                                onChange={e => this.setState({telephoneNumber: e.target.value})}/>
                    <br/><br/>
                    <TextField id="outlined-number" label="Delivery Price" variant="outlined"
                                defaultValue={deliveryPrice}
                                error={!priceValid}
                            helperText={!priceValid ? "Delivery price is not valid" : ''}
                                onChange={e => this.setState({deliveryPrice: e.target.value})}/>
                    <br/><br/>
                    <TextField id="outlined-basic" label="Address" variant="outlined"
                                defaultValue={address}
                                onChange={e => this.setState({address: e.target.value})}/>
                    <br/><br/>
                    <TextField id="outlined-basic" label="Description" variant="outlined"
                                defaultValue={description}
                                onChange={e => this.setState({description: e.target.value})}/>
                    <br/><br/>
                    <Button disabled={!emailValid || !phoneValid || !priceValid}
                    onClick={this.handleCourierUpdate}>Update courier</Button>
                </Container>
                <Dialog
                    open={dialogOpen}
                    onClose={() => {this.setState({dialogOpen: false});}}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                        {"Item updated"}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Item was updated successfully!
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => {this.setState({dialogOpen: false});}}>OK</Button>
                    </DialogActions>
                </Dialog>
            </Container>
        );
    }
}

export default withParams(UpdateCourier);