import React, { Component } from "react";

import {useParams} from "react-router-dom";
import {Container, FormControlLabel, Checkbox, TextField} from "@mui/material";
import TransactionsNavBar from "./transactionsNavBar";
import App from "../app";

function withParams(Component) {
    return props => <Component {...props} params={useParams()} />;
}

class SeeTransaction extends Component {
    constructor(props) {
        super(props);
        this.state = {parent: this.props.parent, product: "", client: "", date: "", isCashPayment: "", isLoading: true};
        this.id = this.props.params.id;
        this.fillTextFields();
    }

    componentDidMount() {
        this.forceUpdate();
    }

    fillTextFields() {
        fetch(App.API_URL + '/api/transactions/dto/' + this.id)
            .then(response => response.json())
            .then(transaction =>
                this.setState({product: transaction.product, client: transaction.client, 
                    date: transaction.date, isCashPayment: transaction.isCashPayment})
            )
            .then(() => this.setState({isLoading: false}));
    }

    render() {
        const {product, client, date, isCashPayment, isLoading} = this.state
        if (isLoading)
            return <p>Loading...</p>;
        return (
            <Container maxWidth={false}>
                <TransactionsNavBar parent={this}></TransactionsNavBar>
                <br/><br/>
                <Container>
                    <TextField id="outlined-basic" label="Product" variant="filled"
                               InputProps={{readOnly: true,}} defaultValue={product.model}/>
                    <br/><br/>
                    <TextField id="outlined-basic" label="Client" variant="filled"
                               InputProps={{readOnly: true,}} defaultValue={client.name}/>
                    <br/><br/>
                    <TextField id="outlined-basic" label="Date" variant="filled"
                               InputProps={{readOnly: true,}} defaultValue={date}/>
                    <br/><br/>
                    <FormControlLabel control={<Checkbox checked={isCashPayment} />} label="Cash payment" />
                    <br/><br/>
                </Container>
            </Container>
        );
    }
}

export default withParams(SeeTransaction);