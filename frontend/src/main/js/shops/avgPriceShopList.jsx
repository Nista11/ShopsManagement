import React, {Component} from "react";
import App from "../app";
import {Container, TableCell} from "@mui/material";
import ShopsNavBar from './shopsNavBar';
import EntityList from "../entityList";

class AvgPriceShopList extends Component {
    constructor(props) {
        super(props);
        this.state = {parent: this.props.parent};

        this.seeEntityString = "/seeShop/";
        this.updateEntityString = "/updateShop/";
        this.apiEntityString = App.API_URL + '/api/shops/orderByAveragePrice/';
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
                <TableCell>{shop.averageProductPrice}</TableCell>
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
                <TableCell>Average product price</TableCell>
            </React.Fragment>
        );
    }

    render() {
        return (<Container maxWidth={false}>
                    <ShopsNavBar parent={this}></ShopsNavBar>
                    <EntityList parent={this}/>
                </Container>
        );
    }
}

export default AvgPriceShopList;