import React, { Component } from 'react';
import { Container, TableCell } from '@mui/material';
import TransactionsNavBar from './transactionsNavBar';
import EntityList from '../entityList';
import App from '../app';

class TransactionsHome extends Component {
    constructor(props) {
        super(props);
        this.state = {parent: this.props.parent};

        this.seeEntityString = "/seeTransaction/";
        this.updateEntityString = "/updateTransaction/";
        this.apiEntityString = App.API_URL + '/api/transactions/';
    }

    componentDidMount() {
        this.getEntityFieldsCells = this.getEntityFieldsCells.bind(this);
        this.getTableHeaderCells = this.getTableHeaderCells.bind(this);
    }

    getEntityFieldsCells(transaction) {
        return (
            <React.Fragment>
                <TableCell>{transaction.product.model}</TableCell>
                <TableCell>{transaction.client.name}</TableCell>
                <TableCell>{transaction.date}</TableCell>
            </React.Fragment>
        );
    }

    getTableHeaderCells() {
        return (
            <React.Fragment>
                <TableCell>Product</TableCell>
                <TableCell>Client</TableCell>
                <TableCell>Date</TableCell>
            </React.Fragment>
        );
    }

    render() {
        return (
            <Container maxWidth={false}>
            <TransactionsNavBar parent={this}></TransactionsNavBar>
            <EntityList parent={this}/>
        </Container>
        );
    }
}

export default TransactionsHome;