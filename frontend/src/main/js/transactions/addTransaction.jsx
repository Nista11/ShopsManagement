import React, { Component } from "react";
import {Button, Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle,
    FormControlLabel, Checkbox, TextField} from "@mui/material";
import TransactionsNavBar from "./transactionsNavBar";
import GuitarsSelect from "../guitars/guitarsSelect";
import ClientsSelect from "../clients/clientsSelect";
import App from "../app";
import Validation from "../validation";

class AddTransaction extends Component {
    constructor(props) {
        super(props);
        this.state = {parent: this.props.parent, 
            product: null, client: null, date: "", isCashPayment: true, dialogOpen: false, isLoading: true};
    }

    componentDidMount() {
        this.handleTransactionAdd = this.handleTransactionAdd.bind(this);
        this.setState({isLoading: false});
        this.forceUpdate();
    }

    handleTransactionAdd(event) {
        const currentUser = App.getCurrentUserStatic();
        const {product, client, date, isCashPayment} = this.state;
        product["productType"] = "guitar";
        new Promise((resolve, reject) => resolve(currentUser.getId()))
        .then(id => {return { 
            method: 'POST',
            headers: { 'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + currentUser.getAccessToken() },
            body: JSON.stringify({
                product: product, client: client, 
                date: date, isCashPayment: isCashPayment,
                user: {id: id, isEnabled: true}
            })
        };})
        .then(requestOptions =>
            fetch(App.API_URL + '/api/transactions', requestOptions)
            .then(response => response.json())
            .then(() => this.setState({dialogOpen: true}))
        );
    }

    onGuitarChange(event) {
        this.setState({product: event.target.value});
    }

    onClientChange(event) {
        this.setState({client: event.target.value});
    }

    render() {
        const {dialogOpen, client, date, product, isCashPayment, isLoading} = this.state;
        if (isLoading) {
            return <p>Loading...</p>
        }

        const dateValid = Validation.validDate(date);

        return (
            <Container maxWidth={false}>
                <TransactionsNavBar parent={this}></TransactionsNavBar>
                <br/><br/>
                <Container>
                    <GuitarsSelect parent={this}></GuitarsSelect>
                    <ClientsSelect parent={this}></ClientsSelect>
                    <br/><br/>
                    <TextField id="outlined-basic" label="Date" variant="outlined"
                                error={!dateValid}
                                helperText={!dateValid? "Date must be of format dd-MM-yyyy and valid" : ""}
                               onChange={(event)=>this.setState({date: event.target.value})}/>
                    <br/><br/>
                    <FormControlLabel control={<Checkbox checked={isCashPayment} />} label="Cash payment"
                                onChange={(event)=>this.setState({isCashPayment: event.target.checked})} />
                    <br/><br/>
                    <Button disabled={!client || !product || !dateValid} onClick={this.handleTransactionAdd}>Add transaction</Button>
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
                        <Button onClick={() => {this.setState({dialogOpen: false});}}>OK</Button>
                    </DialogActions>
                </Dialog>
            </Container>
        );        
    }
}

export default AddTransaction;