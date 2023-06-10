import React, { Component } from 'react';
import ClientsNavBar from './clientsNavBar';
import {Box, Container, Tab, TableCell} from "@mui/material";
import EntityList from '../entityList';
import App from '../app';

class ClientsHome extends Component {
    constructor(props) {
        super(props);
        this.state = {parent: this.props.parent};

        this.seeEntityString = "/seeClient/";
        this.updateEntityString = "/updateClient/";
        this.apiEntityString = App.API_URL + '/api/clients/';
    }

    componentDidMount() {
        this.getEntityFieldsCells = this.getEntityFieldsCells.bind(this);
        this.getTableHeaderCells = this.getTableHeaderCells.bind(this);
        this.forceUpdate();
    }

    getEntityFieldsCells(client) {
        return (
            <React.Fragment>
                <TableCell>{client.name}</TableCell>
                <TableCell>{client.email}</TableCell>
                <TableCell>{client.telephoneNumber}</TableCell>
                <TableCell>{client.birthDate}</TableCell>
            </React.Fragment>
        );
    }

    getTableHeaderCells() {
        return (
            <React.Fragment>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Phone</TableCell>
                <TableCell>Birth Date</TableCell>
            </React.Fragment>
        );
    }

    render() {
        return (
            <Container maxWidth={false}>
                <ClientsNavBar parent={this}></ClientsNavBar>
                <EntityList parent={this}/>
            </Container>
        );
    }
}
export default ClientsHome;