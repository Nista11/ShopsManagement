import React, { Component } from "react";
import {Button, Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField} from "@mui/material";
import CouriersNavBar from "./couriersNavBar";
import App from "../app";
import Validation from "../validation";

class AddCourier extends Component {
    constructor(props) {
        super(props);
        this.state = {parent: this.props.parent, name: "", email: "", telephoneNumber: "", 
        deliveryPrice: null, address: "", description: "", dialogOpen: false, isLoading: true};
    }

    componentDidMount() {
        this.handleCourierAdd = this.handleCourierAdd.bind(this);
        this.setState({isLoading: false});
        this.forceUpdate();
    }

    handleCourierAdd(event) {
        const {name, email, telephoneNumber, deliveryPrice, address, description} = this.state;
        const currentUser = App.getCurrentUserStatic();
        new Promise((resolve, reject) => resolve(currentUser.getId()))
            .then(id => {return {
                method: 'POST',
                headers: { 'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + currentUser.getAccessToken() },
                body: JSON.stringify({
                    name: name, email: email, telephoneNumber: telephoneNumber,
                    deliveryPrice: deliveryPrice, address: address, description: description,
                    user: {id: id, isEnabled: true}
                })
            }})
            .then(requestOptions => 
                fetch(App.API_URL + '/api/couriers', requestOptions)
                .then(response => response.json())
                .then(() => this.setState({dialogOpen: true})));
        ;
    }

    render() {
        const {dialogOpen, email,telephoneNumber, deliveryPrice, isLoading} = this.state;
        if (isLoading) {
            return <p>Loading...</p>
        }

        const emailValid = Validation.validEmail(email);
        const phoneValid = Validation.validPhoneNumber(telephoneNumber);
        const priceValid = Validation.validPositiveOrZero(deliveryPrice);

        return (
            <Container maxWidth={false}>
                <CouriersNavBar parent={this}></CouriersNavBar>
                <br/><br/>
                <Container>
                    <TextField id="courierName" label="Name" variant="outlined"
                               onChange={(event)=>this.setState({name: event.target.value})}/>
                    <br/><br/>
                    <TextField id="courierEmail" label="Email" variant="outlined"
                                error={!emailValid}
                                helperText={!emailValid ? "Email is not valid" : ''}
                               onChange={(event)=>this.setState({email: event.target.value})}/>
                    <br/><br/>
                    <TextField id="courierPhone" label="Phone" variant="outlined"
                            error={!phoneValid}
                            helperText={!phoneValid ? "Phone number is not valid" : ''}
                               onChange={(event)=>this.setState({telephoneNumber: event.target.value})}/>
                    <br/><br/>
                    <TextField id="courierDeliveryPrice" label="Delivery price" variant="outlined"
                            error={!priceValid}
                            helperText={!priceValid ? "Delivery price is not valid" : ''}
                               onChange={(event)=> this.setState({deliveryPrice: event.target.value})}/>
                    <br/><br/>
                    <TextField id="courierAddress" label="Address" variant="outlined"
                               onChange={(event)=>this.setState({address: event.target.value})}/>
                    <br/><br/>
                    <TextField id="courierDescription" label="Description" variant="outlined"
                               onChange={(event)=>this.setState({description: event.target.value})}/>
                    <br/><br/>
                    <Button id="addCourierFormButton" disabled={!emailValid || !phoneValid || !priceValid}
                     onClick={this.handleCourierAdd}>Add courier</Button>
                </Container>
                <Dialog
                    open={dialogOpen}
                    onClose={() => {this.setState({dialogOpen: false});}}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                        {"Item added"}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Item was added successfully!
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button id="courierDialogOkButton" onClick={() => {this.setState({dialogOpen: false});}}>OK</Button>
                    </DialogActions>
                </Dialog>
            </Container>
        );        
    }
}

export default AddCourier;