import React, {Component} from 'react';
import {Container, InputLabel, MenuItem, TextField, Select} from '@mui/material';
import Pagination from '../pagination';
import SimpleCourier from './simpleCourier';
import App from "../app";

class CouriersSelect extends Component {
    constructor(props) {
        super(props);
        this.state = {courier: null, allCouriers: [], page: 0, lastPage: true, autocompleteName: "", isLoading: true};
    }

    componentDidMount() {
        this.onCourierChangeCall = this.props.parent ? this.props.parent.onCourierChange : null;
        this.getAllCouriers = this.getAllCouriers.bind(this);
        this.getAllCouriers();
        this.forceUpdate();
    }

    onCourierChange(event) {
        this.setState({courier: event.target.value});
    }

    getAllCouriers() {
        const {page, autocompleteName} = this.state;
        fetch(App.API_URL + (autocompleteName == "" ? '/api/couriers/simple/page/' + page : '/api/couriers/containsName/' + autocompleteName + '/page/' + page))
            .then(response => response.json())
            .then(data => this.setState({
                allCouriers: data.content, lastPage: data.last},
                 this.setState({isLoading: false})
                )
            );
    }

    handlePageChange() {
        this.getAllCouriers();
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
        const {allCouriers, autocompleteName, isLoading} = this.state;
        let {courier} = this.state;
        if (isLoading) 
            return <p>Loading...</p>;

        if (!courier && this.props.defaultCourier)
            courier = this.props.defaultCourier;
        let courierList = allCouriers.map((currentCourier) => {
            let newCourier = new SimpleCourier(currentCourier.id, currentCourier.name);
            if (courier && courier.id == newCourier.id) {
                courier = newCourier;
            }
            return <MenuItem key={newCourier.id} value={newCourier}>{newCourier.name}</MenuItem>
        });

        if (courier && this.props.parent && (!this.props.parent.state.courier || this.props.parent.state.courier.id != courier.id)) {
            this.props.parent.setState({courier: courier});
        }

        return <Container>
            <InputLabel id="demo-simple-select-label">Courier</InputLabel>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Courier"
                displayEmpty
                renderValue={(selected) => {
                    if (!selected || selected.length == 0) {
                        if (courier)
                            return courier.name;
                        else
                            return "";
                    }
                    else
                        return selected.name;
                }}
                onChange={(event) => {this.onCourierChange(event); if (this.onCourierChangeCall) this.onCourierChangeCall(event);}}
            >
            <AutocompleteField parent={this}></AutocompleteField>
            {courierList}
            <Pagination parent={this}></Pagination>
            </Select>
        </Container>
    }
}

class AutocompleteField extends Component {

    render() {
        return (<MenuItem value={""} onKeyDown={e => e.stopPropagation()} 
        onClickCapture={e => {e.stopPropagation(); e.preventDefault();}}>
        <TextField id="outlined-basic" label="" variant="outlined" value={this.props.parent.state.autocompleteName}
                       onChange={(event)=>this.props.parent.setState({page: 0, autocompleteName: event.target.value}, 
                       this.props.parent.getAllCouriers)}/>
        </MenuItem>
    );
    }
}

export default CouriersSelect;