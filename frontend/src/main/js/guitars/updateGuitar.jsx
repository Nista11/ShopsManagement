import React, { Component } from 'react';
import GuitarsNavBar from './guitarsNavBar';
import {
    Button,
    Container,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    InputLabel, MenuItem, Select,
    TextField
} from "@mui/material";
import {useParams} from "react-router-dom";
import ShopsSelect from '../shops/shopsSelect';
import SimpleShop from '../shops/simpleShop';
import App from "../app";
import Validation from '../validation';

function withParams(Component) {
    return props => <Component {...props} params={useParams()} />;
}

class UpdateGuitar extends Component {

    constructor(props) {
        super(props);
        this.state = {parent: this.props.parent, creationYear: null, model: "", type: "", color: "",
            price: 0, shop: null, dialogOpen: false, isLoading: true};
        this.id = this.props.params.id;
    }

    componentDidMount() {
        this.handleGuitarUpdate = this.handleGuitarUpdate.bind(this);
        this.onShopChange = this.onShopChange.bind(this);
        this.fillTextFields = this.fillTextFields.bind(this);
        this.fillTextFields();
        this.forceUpdate();
    }

    fillTextFields() {
        fetch(App.API_URL + '/api/guitars/dto/' + this.id)
            .then(response => response.json())
            .then(guitar =>
                this.setState({price: guitar.price,
                    creationYear: guitar.creationYear, model: guitar.model, 
                    type: guitar.type, color: guitar.color, shop: new SimpleShop(guitar.shop.id, guitar.shop.name)
                }, this.setState({isLoading: false}))
            );
    }

    handleGuitarUpdate(event) {
        const {price, creationYear, model, type, color, shop} = this.state;
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + App.getCurrentUserStatic().getAccessToken() },
            body: JSON.stringify({
                productType:"guitar",
                shop:{"id": shop.id},
                price: price,
                creationYear: creationYear,
                model: model,
                type: type,
                color: color
            })
        };
        fetch(App.API_URL + '/api/guitars/' + this.id, requestOptions)
            .then(response => response.json())
            .then(() => this.setState({dialogOpen: true}));
    }

    onShopChange(event) {
        this.setState({shop: event.target.value});
    }

    render() {
        const {creationYear, price, model, type, color, shop, dialogOpen, isLoading} = this.state;
        if (isLoading) {
            return <p>Loading...</p>
        }
        const yearValid = Validation.validPositiveOrZero(creationYear);
        const modelValid = Validation.validStringNotBlank(model);
        const priceValid = Validation.validPositiveOrZero(price);

        return (
            <Container maxWidth={false}>
                <GuitarsNavBar parent={this}></GuitarsNavBar>
                <br/><br/>
                <Container>
                    <TextField id="outlined-number" label="Creation year" variant="outlined"
                                defaultValue={creationYear}
                                error={!yearValid} helperText={!yearValid ? "Year is not valid" : ''}
                               onChange={(event)=>this.setState({creationYear: event.target.value})}/>
                    <br/><br/>
                    <TextField id="outlined-number" label="Price" variant="outlined"
                               defaultValue={price}
                               error={!priceValid} helperText={!priceValid ? "Price is not valid" : ''}
                               onChange={(event)=>this.setState({price: event.target.value})}/>
                    <br/><br/>
                    <TextField id="outlined-basic" label="Model" variant="outlined"
                               defaultValue={model}
                               error={!modelValid} helperText={!modelValid ? "Model cannot be empty" : ''}
                               onChange={(event)=>this.setState({model: event.target.value})}/>
                    <br/><br/>
                    <TextField id="outlined-basic" label="Type" variant="outlined"
                               defaultValue={type}
                               onChange={(event)=>this.setState({type: event.target.value})}/>
                    <br/><br/>
                    <TextField id="outlined-basic" label="Color" variant="outlined"
                               defaultValue={color}
                               onChange={(event)=>this.setState({color: event.target.value})}/>
                    <br/><br/>
                    <ShopsSelect parent={this} defaultShop={shop}></ShopsSelect>
                    <br/><br/>
                    <Button disabled={!yearValid || !priceValid || !modelValid}
                     onClick={this.handleGuitarUpdate}>Update Guitar</Button>
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
export default withParams(UpdateGuitar);