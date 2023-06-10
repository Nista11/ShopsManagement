import React, { Component } from 'react';
import CouriersNavBar from './couriersNavBar';
import {Container, TableCell} from "@mui/material";
import EntityList from '../entityList';
import App from '../app';

class CourierHome extends Component {
    constructor(props) {
        super(props);
        this.state = {parent: this.props.parent};

        this.seeEntityString = "/seeCourier/";
        this.updateEntityString = "/updateCourier/";
        this.apiEntityString = App.API_URL + '/api/couriers/';
    }

    componentDidMount() {
        this.getEntityFieldsCells = this.getEntityFieldsCells.bind(this);
        this.getTableHeaderCells = this.getTableHeaderCells.bind(this);
    }

    getEntityFieldsCells(courier) {
        return (
            <React.Fragment>
                <TableCell>{courier.name}</TableCell>
                <TableCell>{courier.email}</TableCell>
                <TableCell>{courier.telephoneNumber}</TableCell>
                <TableCell>{courier.deliveryPrice}</TableCell>
            </React.Fragment>
        );
    }

    getTableHeaderCells() {
        return (
            <React.Fragment>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Phone</TableCell>
                <TableCell>Delivery price</TableCell>
            </React.Fragment>
        );
    }

    render() {
        return (
            <Container maxWidth={false}>
                <CouriersNavBar parent={this}></CouriersNavBar>
                <EntityList parent={this}/>
            </Container>
        );
    }
}

export default CourierHome;