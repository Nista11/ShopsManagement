import React, { Component } from 'react';
import TransactionsNavBar from './transactionsNavBar';
import {
    Button,
    Container,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    InputLabel, MenuItem, Select, FormControlLabel, Checkbox,
    TextField
} from "@mui/material";
import {useParams} from "react-router-dom";
import GuitarsSelect from "../guitars/guitarsSelect";
import ClientsSelect from "../clients/clientsSelect";
import SimpleGuitar from "../guitars/simpleGuitar";
import SimpleClient from "../clients/simpleClient";
import App from "../app";
import Validation from '../validation';

function withParams(Component) {
    return props => <Component {...props} params={useParams()} />;
}

class UpdateTransaction extends Component {

    constructor(props) {
        super(props);
        this.state = {parent: this.props.parent, 
            product: null, client: null, date: "", isCashPayment: true, dialogOpen: false, isLoading: true};
        this.id = this.props.params.id;
    }

    componentDidMount() {
        this.handleTransactionUpdate = this.handleTransactionUpdate.bind(this);
        this.onGuitarChange = this.onGuitarChange.bind(this);
        this.onClientChange = this.onClientChange.bind(this);
        this.fillTextFields = this.fillTextFields.bind(this);
        this.fillTextFields();
        this.forceUpdate();
    }

    fillTextFields() {
        fetch(App.API_URL + '/api/transactions/dto/' + this.id)
            .then(response => response.json())
            .then(transaction =>{
                this.setState({product: new SimpleGuitar(transaction.product.id, transaction.product.model), 
                    client: new SimpleClient(transaction.client.id, transaction.client.name), 
                    date: transaction.date, isCashPayment: transaction.isCashPayment
                }, this.setState({isLoading: false}));});
    }

    handleTransactionUpdate(event) {
        const {product, client, date, isCashPayment} = this.state;
        product["productType"] = "guitar";
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + App.getCurrentUserStatic().getAccessToken() },
            body: JSON.stringify({
                product: product, client: client, 
                date: date, isCashPayment: isCashPayment
            })
        };
        fetch(App.API_URL + '/api/transactions/' + this.id, requestOptions)
            .then(response => response.json())
            .then(() => this.setState({dialogOpen: true}));
    }

    onGuitarChange(event) {
        this.setState({product: event.target.value});
    }

    onClientChange(event) {
        this.setState({client: event.target.value});
    }

    render() {
        const {product, client, date, isCashPayment, dialogOpen, isLoading} = this.state;
        if (isLoading) {
            return <p>Loading...</p>
        }

        const dateValid = Validation.validDate(date);

        return (
            <Container maxWidth={false}>
                <TransactionsNavBar parent={this}></TransactionsNavBar>
                <br/><br/>
                <Container>
                    <GuitarsSelect parent={this} defaultGuitar={product}></GuitarsSelect>
                    <ClientsSelect parent={this} defaultClient={client}></ClientsSelect>
                    <br/><br/>
                    <TextField id="outlined-basic" label="Date" variant="outlined" defaultValue={date}
                        error={!dateValid}
                        helperText={!dateValid? "Date must be of format dd-MM-yyyy and valid" : ""}
                               onChange={(event)=>this.setState({date: event.target.value})}/>
                    <br/><br/>
                    <FormControlLabel control={<Checkbox checked={isCashPayment} />} label="Cash payment"
                                onChange={(event)=>this.setState({isCashPayment: event.target.checked})} />
                    <br/><br/>
                    <Button disabled={!client || !product || !dateValid}
                     onClick={this.handleTransactionUpdate}>Update Transaction</Button>
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
export default withParams(UpdateTransaction);