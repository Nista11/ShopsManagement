import React, {Component} from 'react';
import {Container, InputLabel, MenuItem, TextField, Select, FormHelperText} from '@mui/material';
import {red} from "@mui/material/colors";
import Pagination from '../pagination';
import SimpleShop from './simpleShop';
import App from "../app";

class ShopsSelect extends Component {
    constructor(props) {
        super(props);
        this.state = {shop: null, allShops: [], page: 0, lastPage: true, autocompleteName: "", isLoading: true};
    }

    componentDidMount() {
        this.onShopChangeCall = this.props.parent ? this.props.parent.onShopChange : null;
        this.getAllShops = this.getAllShops.bind(this);
        this.getAllShops();
        this.forceUpdate();
    }

    onShopChange(event) {
        this.setState({shop: event.target.value});
    }

    getAllShops() {
        const {page, autocompleteName} = this.state;
        fetch(App.API_URL + (autocompleteName == "" ? '/api/shops/simple/page/' + page : '/api/shops/containsName/' + autocompleteName + '/page/' + page))
            .then(response => response.json())
            .then(data => this.setState({
                allShops: data.content, lastPage: data.last},
                 this.setState({isLoading: false})
                )
            );
    }

    handlePageChange() {
        this.getAllShops();
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
        const {allShops, autocompleteName, isLoading} = this.state;
        let {shop} = this.state;
        if (isLoading) 
            return <p>Loading...</p>;

        if (!shop && this.props.defaultShop)
            shop = this.props.defaultShop;
        let shopList = allShops.map((currentShop) => {
            let newShop = new SimpleShop(currentShop.id, currentShop.name);
            if (shop && shop.id == newShop.id) {
                shop = newShop;
            }
            return <MenuItem key={newShop.id} value={newShop}>{newShop.name}</MenuItem>
        });

        if (shop && this.props.parent && (!this.props.parent.state.shop || this.props.parent.state.shop.id != shop.id)) {
            this.props.parent.setState({shop: shop});
        }

        return <Container>
            <InputLabel id="demo-simple-select-label">Shop</InputLabel>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Shop"
                displayEmpty
                error={!shop}
                renderValue={(selected) => {
                    if (!selected || selected.length == 0) {
                        if (shop)
                            return shop.name;
                        else
                            return "";
                    }
                    else
                        return selected.name;
                }}
                onChange={(event) => {this.onShopChange(event); if (this.onShopChangeCall) this.onShopChangeCall(event);}}
            >
            <AutocompleteField parent={this}></AutocompleteField>
            {shopList}
            <Pagination parent={this}></Pagination>
            </Select>
            <FormHelperText sx={{color: red[500]}}>{!shop ? "Shop is mandatory" : ""}</FormHelperText>
        </Container>
    }
}

class AutocompleteField extends Component {

    render() {
        return (<MenuItem value={""} onKeyDown={e => e.stopPropagation()} 
        onClickCapture={e => {e.stopPropagation(); e.preventDefault();}}>
        <TextField id="outlined-basic" label="" variant="outlined" value={this.props.parent.state.autocompleteName}
                       onChange={(event)=>this.props.parent.setState({page: 0, autocompleteName: event.target.value}, 
                       this.props.parent.getAllShops)}/>
        </MenuItem>
    );
    }
}

export default ShopsSelect;