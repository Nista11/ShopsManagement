import React, {Component} from "react";
import App from "../app";
import {Button, Container, FormControl, Input, InputLabel, TableCell} from "@mui/material";
import GuitarsNavBar from './guitarsNavBar';
import EntityList from "../entityList";

class FilteredGuitarList extends Component {
    constructor(props) {
        super(props);
        this.state = {parent: this.props.parent, filteredGuitarsPrice: 0};

        this.seeEntityString = "/seeGuitar/";
        this.updateEntityString = "/updateGuitar/";
        this.apiEntityString = App.API_URL + '/api/guitars/priceGreaterThan/' + this.state.filteredGuitarsPrice + '/';
    }

    componentDidMount() {
        this.handleFilteredGuitarsChange = this.handleFilteredGuitarsChange.bind(this);
        this.handleFilterPriceSubmit = this.handleFilterPriceSubmit.bind(this);
        this.getEntityFieldsCells = this.getEntityFieldsCells.bind(this);
        this.getTableHeaderCells = this.getTableHeaderCells.bind(this);
        this.forceUpdate();
    }

    handleFilteredGuitarsChange(event) {
        const target = event.target;
        const value = target.value;
        this.setState({filteredGuitarsPrice: value});
    }

    handleFilterPriceSubmit() {
        const {filteredGuitarsPrice} = this.state;
        this.apiEntityString = App.API_URL + '/api/guitars/priceGreaterThan/' + filteredGuitarsPrice + '/';
        this.setState({filteredGuitarsPrice: filteredGuitarsPrice});
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
        const {filteredGuitarsPrice} = this.state;
        return (<Container maxWidth={false}>
                    <GuitarsNavBar parent={this}></GuitarsNavBar>
                    <Container className="filteredGuitars tableContainer">
                        <FormControl className="formControlFilteredGuitars">
                            <InputLabel htmlFor="price">Show guitars with price greater than: </InputLabel>
                            <Input type="text" id="price" value={filteredGuitarsPrice}
                                   onChange={this.handleFilteredGuitarsChange}/>
                            <Button onClick={this.handleFilterPriceSubmit} className="submitButton">Submit</Button>
                        </FormControl>
                            <EntityList parent={this}></EntityList>
                    </Container>
                </Container>
        );
    }
}

export default FilteredGuitarList;