import React, {Component} from 'react';
import {Container, InputLabel, MenuItem, TextField, Select,FormHelperText} from '@mui/material';
import Pagination from '../pagination';
import SimpleClient from './simpleClient';
import {red} from "@mui/material/colors";
import App from "../app";

class ClientsSelect extends Component {
    constructor(props) {
        super(props);
        this.state = {client: null, allClients: [], page: 0, lastPage: true, autocompleteName: "", isLoading: true};
    }

    componentDidMount() {
        this.onClientChangeCall = this.props.parent ? this.props.parent.onClientChange : null;
        this.getAllClients = this.getAllClients.bind(this);
        this.getAllClients();
        this.forceUpdate();
    }

    onClientChange(event) {
        this.setState({client: event.target.value});
    }

    getAllClients() {
        const {page, autocompleteName} = this.state;
        fetch(App.API_URL + (autocompleteName == "" ? '/api/clients/simple/page/' + page : '/api/clients/containsName/' + autocompleteName + '/page/' + page))
            .then(response => response.json())
            .then(data => this.setState({
                allClients: data.content, lastPage: data.last},
                 this.setState({isLoading: false})
                )
            );
    }

    handlePageChange() {
        this.getAllClients();
    }

    getPage() {
        return this.state.page;
    }

    setPage(page, callback) {
        this.setState({page: page}, callback);
    }

    getLastPage() {
        return this.state.lastPage;
    }

    render() {
        const {allClients, autocompleteName, isLoading} = this.state;
        let {client} = this.state;
        if (isLoading) 
            return <p>Loading...</p>;

        if (!client && this.props.defaultClient)
            client = this.props.defaultClient;
        let clientList = allClients.map((currentClient) => {
            let newClient = new SimpleClient(currentClient.id, currentClient.name);
            if (client && client.id == newClient.id) {
                client = newClient;
            }
            return <MenuItem key={newClient.id} value={newClient}>{newClient.name}</MenuItem>
        });

        if (client && this.props.parent && (!this.props.parent.state.client || this.props.parent.state.client.id != client.id)) {
            this.props.parent.setState({client: client});
        }

        return <Container>
            <InputLabel id="demo-simple-select-label">Client</InputLabel>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Client"
                displayEmpty
                error={!client}
                renderValue={(selected) => {
                    if (!selected || selected.length == 0) {
                        if (client)
                            return client.name;
                        else
                            return "";
                    }
                    else
                        return selected.name;
                }}
                onChange={(event) => {this.onClientChange(event); if (this.onClientChangeCall) this.onClientChangeCall(event);}}
            >
            <AutocompleteField parent={this}></AutocompleteField>
            {clientList}
            <Pagination parent={this}></Pagination>
            </Select>
            <FormHelperText sx={{color: red[500]}}>{!client ? "Client is mandatory" : ""}</FormHelperText>
        </Container>
    }
}

class AutocompleteField extends Component {

    render() {
        return (<MenuItem value={""} onKeyDown={e => e.stopPropagation()} 
        onClickCapture={e => {e.stopPropagation(); e.preventDefault();}}>
        <TextField id="outlined-basic" label="" variant="outlined" value={this.props.parent.state.autocompleteName}
                       onChange={(event)=>this.props.parent.setState({page: 0, autocompleteName: event.target.value}, 
                       this.props.parent.getAllClients)}/>
        </MenuItem>
    );
    }
}

export default ClientsSelect;