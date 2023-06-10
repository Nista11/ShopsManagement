import React, { Component } from 'react';
import GuitarsNavBar from './guitarsNavBar';
import {Container, TableCell} from "@mui/material";
import EntityList from '../entityList';
import App from '../app';

class GuitarsHome extends Component {
    constructor(props) {
        super(props);
        this.state = {parent: this.props.parent};
        
        this.seeEntityString = "/seeGuitar/";
        this.updateEntityString = "/updateGuitar/";
        this.apiEntityString = App.API_URL + '/api/guitars/';
    }

    componentDidMount() {
        this.getEntityFieldsCells = this.getEntityFieldsCells.bind(this);
        this.getTableHeaderCells = this.getTableHeaderCells.bind(this);
        this.forceUpdate();
    }

    getEntityFieldsCells(guitar) {
        return (
            <React.Fragment>
                <TableCell>{guitar.price}</TableCell>
                <TableCell>{guitar.model}</TableCell>
                <TableCell>{guitar.type}</TableCell>
                <TableCell>{guitar.color}</TableCell>
                <TableCell>{guitar.creationYear}</TableCell>
            </React.Fragment>
        );
    }

    getTableHeaderCells() {
        return (
            <React.Fragment>
                <TableCell>Price</TableCell>
                <TableCell>Model</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Color</TableCell>
                <TableCell>Creation year</TableCell>
            </React.Fragment>
        );
    }

    render() {
        return (
            <Container maxWidth={false}>
                <GuitarsNavBar parent={this}></GuitarsNavBar>
                <EntityList parent={this}/>
            </Container>
        );
    }
}
export default GuitarsHome;