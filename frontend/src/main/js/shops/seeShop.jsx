import React, { Component } from "react";
import { useParams } from "react-router-dom";
import { Container, InputLabel,Select,MenuItem,Checkbox, FormControlLabel, TextField } from "@mui/material";
import ShopsNavBar from "./shopsNavBar";
import App from "../app";

function withParams(Component) {
    return props => <Component {...props} params={useParams()} />;
}

class SeeShop extends Component {
    constructor(props) {
        super(props);
        this.state = {parent: this.props.parent, name: "", email: "", couriers: [], 
            telephoneNumber: "", address: "", shippingAvailable: false, isLoading: true};
        this.id = this.props.params.id;
        this.fillTextFields();
    }

    componentDidMount() {
        this.forceUpdate();
    }

    fillTextFields() {
        fetch(App.API_URL + '/api/shops/' + this.id)
            .then(response => response.json())
            .then(shop =>
                this.setState({name: shop.name, email: shop.email, 
                    telephoneNumber: shop.telephoneNumber,
                    address: shop.address, shippingAvailable: shop.shippingAvailable, couriers: shop.couriers})
            )
            .then(() => this.setState({isLoading: false}));
    }

    render() {
        const {name, email, couriers, telephoneNumber, address, shippingAvailable, isLoading} = this.state
        if (isLoading)
            return <p>Loading...</p>;

        const courierList = couriers.map((courier) => {
            return (
                    <MenuItem key={courier.id} value={courier}>{courier.name}</MenuItem>
            );
        });

        return (
            <Container maxWidth={false}>
                <ShopsNavBar parent={this}></ShopsNavBar>
                <br/><br/>
                <Container>
                    <TextField id="outlined-basic" label="Name" variant="filled"
                               InputProps={{readOnly: true,}} defaultValue={name}/>
                    <br/><br/>
                    <TextField id="outlined-basic" label="Email" variant="filled"
                               InputProps={{readOnly: true,}} defaultValue={email}/>
                    <br/><br/>
                    <TextField id="outlined-basic" label="Phone" variant="filled"
                               InputProps={{readOnly: true,}} defaultValue={telephoneNumber}/>
                    <br/><br/>
                    <TextField id="outlined-basic" label="Address" variant="filled"
                               InputProps={{readOnly: true,}} defaultValue={address}/>
                    <br/><br/>
                    <FormControlLabel control={<Checkbox checked={shippingAvailable} />} label="Shipping available" />
                    <br></br>
                    <Container>
                        <InputLabel>Couriers</InputLabel>
                        <Select
                        label="Couriers"
                        displayEmpty
                        renderValue={() => {
                            return "";
                        }}>
                        {courierList}
                        </Select>
                    </Container>
                </Container>
            </Container>
        );
    }
}

export default withParams(SeeShop);