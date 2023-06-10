import React, { Component } from "react";
import { useParams } from "react-router-dom";
import {  TextField, Button } from "@mui/material";
import ShopsNavBar from "./shopsNavBar";
import {Dialog, Select,Box,List,ListItem,ListItemText,DialogActions, DialogContent, DialogContentText, DialogTitle,
    FormControlLabel,Container,InputLabel,MenuItem,ListItemButton, Checkbox} from "@mui/material";
import CouriersSelect from "../couriers/couriersSelect";
import App from "../app";
import Validation from "../validation";

function withParams(Component) {
    return props => <Component {...props} params={useParams()} />;
}

class UpdateShop extends Component {
    constructor(props) {
        super(props);
        this.state = {parent: this.props.parent, name: "", email: "", telephoneNumber: "", 
        address: "", courier: null, couriers: [], 
        deleteCourier: null, shippingAvailable: false, dialogOpen: false, isLoading: true};
        this.id = this.props.params.id;
    }

    componentDidMount() {
        this.handleShopUpdate = this.handleShopUpdate.bind(this);
        this.fillTextFields = this.fillTextFields.bind(this);
        this.handleCourierAdd = this.handleCourierAdd.bind(this);
        this.handleCourierRemove = this.handleCourierRemove.bind(this);
        this.fillTextFields();
        this.forceUpdate();
    }

    
    fillTextFields() {
        fetch(App.API_URL + '/api/shops/' + this.id)
            .then(response => response.json())
            .then(shop =>
                this.setState({name: shop.name, email: shop.email, 
                    telephoneNumber: shop.telephoneNumber, address: shop.address,
                     shippingAvailable: shop.shippingAvailable, couriers: shop.couriers})
            )
            .then(() => this.setState({isLoading: false}));
    }

    handleShopUpdate() {
        const {name, email, telephoneNumber, address, shippingAvailable} = this.state;
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + App.getCurrentUserStatic().getAccessToken() },
            body: JSON.stringify({
                name: name, email: email,
                telephoneNumber: telephoneNumber,
                address: address, shippingAvailable: shippingAvailable
            })
        };
        fetch(App.API_URL + '/api/shops/' + this.id, requestOptions)
            .then(response => response.json())
            .then(() => this.setState({dialogOpen: true}));
    }

    handleCourierAdd(event) {
        const {courier} = this.state;
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + App.getCurrentUserStatic().getAccessToken() },
            body: JSON.stringify({
                id: courier.id
            })
        };
        fetch('/api/shops/' + this.id + '/addCourier', requestOptions)
            .then(response => response.json())
            .then(shop => this.setState({dialogOpen: true, couriers: shop.couriers}));
    }

    handleCourierRemove(event) {
        const {deleteCourier} = this.state;
        const requestOptions = {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + App.getCurrentUserStatic().getAccessToken() }
        };
        fetch('/api/shops/' + this.id + '/removeCourier/' + deleteCourier.id, requestOptions)
            .then(response => response.json())
            .then(shop => this.setState({dialogOpen: true, couriers: shop.couriers}));
    }

    onCourierChange = (event) => {
        this.setState({courier: event.target.value});
    }

    render() {
        const {name, email, couriers,
             telephoneNumber, address, shippingAvailable, dialogOpen, isLoading} = this.state;
        if (isLoading) {
            return <p>Loading...</p>;
        } 

        const courierList = couriers.map((courier) => {
            return (
                    <MenuItem key={courier.id} value={courier}>{courier.name}</MenuItem>
            );
        });

        const emailValid = Validation.validEmail(email);
        const phoneValid = Validation.validPhoneNumber(telephoneNumber);

        return (
            <Container maxWidth={false}>
                <ShopsNavBar parent={this}></ShopsNavBar>
                <br/><br/>
                <Container>
                    <TextField id="outlined-basic" label="Name" variant="outlined"
                                defaultValue={name}
                                onChange={e => this.setState({name: e.target.value})}/>
                    <br/><br/>
                    <TextField id="outlined-basic" label="Email" variant="outlined"
                                defaultValue={email}
                                error={!emailValid} helperText={!emailValid ? "Email is not valid" : ''}
                                onChange={e => this.setState({email: e.target.value})}/>
                    <br/><br/>
                    <TextField id="outlined-basic" label="Phone" variant="outlined"
                                defaultValue={telephoneNumber}
                                error={!phoneValid} helperText={!phoneValid ? "Phone is not valid" : ''}
                                onChange={e => this.setState({telephoneNumber: e.target.value})}/>
                    <br/><br/>
                    <TextField id="outlined-basic" label="Address" variant="outlined"
                                defaultValue={address}
                                onChange={e => this.setState({address: e.target.value})}/>
                    <br/><br/>
                    <FormControlLabel control={<Checkbox checked={shippingAvailable} />} label="Shipping available"
                                onChange={(event)=>this.setState({shippingAvailable: event.target.checked})} />
                    <br/><br/>
                    <Button disabled={!emailValid || !phoneValid} onClick={this.handleShopUpdate}>Update shop</Button>
                    <br></br>
                    <CouriersSelect parent={this}/>
                    <Button onClick={this.handleCourierAdd}>Add courier</Button>
                    <br></br>
                    <Container>
                        <InputLabel>Courier</InputLabel>
                        <Select
                            label="Courier"
                            displayEmpty
                            renderValue={(selected) => {
                                if (!selected || selected.length == 0) {
                                    return "";
                                }
                                else
                                    return selected.name;
                            }}
                            onChange={(event) => this.setState({deleteCourier: event.target.value})}>
                            {courierList}
                        </Select>
                        <br></br>
                        <Button onClick={this.handleCourierRemove}>Remove courier</Button>
                    </Container>
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

export default withParams(UpdateShop);