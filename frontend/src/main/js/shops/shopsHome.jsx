import React, { Component } from 'react';
import ShopsNavBar from './shopsNavBar';
import {Container, TableCell} from "@mui/material";
import EntityList from '../entityList';
import App from '../app';

class ShopsHome extends Component {
    constructor(props) {
        super(props);
        this.state = {parent: this.props.parent};

        this.seeEntityString = "/seeShop/";
        this.updateEntityString = "/updateShop/";
        this.apiEntityString = App.API_URL + '/api/shops/';
    }

    componentDidMount() {
        this.getEntityFieldsCells = this.getEntityFieldsCells.bind(this);
        this.getTableHeaderCells = this.getTableHeaderCells.bind(this);
        this.forceUpdate();
    }

    getEntityFieldsCells(shop) {
        return (
            <React.Fragment>
                <TableCell>{shop.name}</TableCell>
                <TableCell>{shop.email}</TableCell>
                <TableCell>{shop.telephoneNumber}</TableCell>
                <TableCell>{shop.products}</TableCell>
                <TableCell>{shop.couriers}</TableCell>
            </React.Fragment>
        );
    }

    getTableHeaderCells() {
        return (
            <React.Fragment>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Phone</TableCell>
                <TableCell>Products</TableCell>
                <TableCell>Couriers</TableCell>
            </React.Fragment>
        );
    }
    
    render() {
        return (
            <Container maxWidth={false}>
                <ShopsNavBar parent={this}></ShopsNavBar>
                <EntityList parent={this}/>
            </Container>
        );
    }
}
export default ShopsHome;