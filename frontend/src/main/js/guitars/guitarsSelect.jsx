import React, {Component} from 'react';
import {Container, InputLabel, MenuItem, TextField, Select,FormHelperText} from '@mui/material';
import Pagination from '../pagination';
import SimpleGuitar from './simpleGuitar';
import {red} from "@mui/material/colors";
import App from "../app";

class GuitarsSelect extends Component {
    constructor(props) {
        super(props);
        this.state = {guitar: null, allGuitars: [], page: 0, lastPage: true, autocompleteName: "", isLoading: true};
    }

    componentDidMount() {
        this.onGuitarChangeCall = this.props.parent ? this.props.parent.onGuitarChange : null;
        this.getAllGuitars = this.getAllGuitars.bind(this);
        this.getAllGuitars();
        this.forceUpdate();
    }

    onGuitarChange(event) {
        this.setState({guitar: event.target.value});
    }

    getAllGuitars() {
        const {page, autocompleteName} = this.state;
        fetch(App.API_URL + (autocompleteName == "" ? '/api/guitars/simple/page/' + page : '/api/guitars/containsName/' + autocompleteName + '/page/' + page))
            .then(response => response.json())
            .then(data => this.setState({
                allGuitars: data.content, lastPage: data.last},
                 this.setState({isLoading: false})
                )
            );
    }

    handlePageChange() {
        this.getAllGuitars();
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
        const {allGuitars, autocompleteName, isLoading} = this.state;
        let {guitar} = this.state;
        if (isLoading) 
            return <p>Loading...</p>;

        if (!guitar && this.props.defaultGuitar)
            guitar = this.props.defaultGuitar;
        let guitarList = allGuitars.map((currentGuitar) => {
            let newGuitar = new SimpleGuitar(currentGuitar.id, currentGuitar.model);
            if (guitar && guitar.id == newGuitar.id) {
                guitar = newGuitar;
            }
            return <MenuItem key={newGuitar.id} value={newGuitar}>{newGuitar.model}</MenuItem>
        });

        if (guitar && this.props.parent && (!this.props.parent.state.product || this.props.parent.state.product.id != guitar.id)) {
            this.props.parent.setState({product: guitar});
        }

        return <Container>
            <InputLabel id="demo-simple-select-label">Product</InputLabel>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Product"
                displayEmpty
                error={!guitar}
                renderValue={(selected) => {
                    if (!selected || selected.length == 0) {
                        if (guitar)
                            return guitar.model;
                        else
                            return "";
                    }
                    else
                        return selected.model;
                }}
                onChange={(event) => {this.onGuitarChange(event); if (this.onGuitarChangeCall) this.onGuitarChangeCall(event);}}
            >
            <AutocompleteField parent={this}></AutocompleteField>
            {guitarList}
            <Pagination parent={this}></Pagination>
            </Select>
            <FormHelperText sx={{color: red[500]}}>{!guitar ? "Product is mandatory" : ""}</FormHelperText>
        </Container>
    }
}

class AutocompleteField extends Component {

    render() {
        return (<MenuItem value={""} onKeyDown={e => e.stopPropagation()} 
        onClickCapture={e => {e.stopPropagation(); e.preventDefault();}}>
        <TextField id="outlined-basic" label="" variant="outlined" value={this.props.parent.state.autocompleteName}
                       onChange={(event)=>this.props.parent.setState({page: 0, autocompleteName: event.target.value}, 
                       this.props.parent.getAllGuitars)}/>
        </MenuItem>
    );
    }
}

export default GuitarsSelect;