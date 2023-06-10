import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {AppBar, Box, Button, Container, Toolbar} from "@mui/material";
import App from '../app';

class GuitarsNavBar extends Component {
    constructor(props) {
        super(props);
        this.state = {parent: this.props.parent};
    }


    render() {
        let currentUser = App.getCurrentUserStatic();

        return <Box>
        <AppBar position="sticky">
            <Toolbar>
                <Button color="inherit" sx={{flexGrow: 1}} component={Link} to="/">Home</Button>
                <Button color="inherit" sx={{flexGrow: 1}} component={Link} to="/guitars">Guitars</Button>
                <Button color="inherit" sx={{flexGrow: 1}} component={Link} to="/filteredGuitars">Search by price</Button>
                { currentUser.hasAddAuthorization() &&
                <Button color="inherit" sx={{flexGrow: 1}} component={Link} to="/addGuitar">Add guitar</Button>
                }
                {
                    currentUser.isAuthenticated() &&
                    <Button color="inherit" sx={{flexGrow: 1}} component={Link} to="/ownGuitars">Own guitars</Button>
                }
            </Toolbar>
        </AppBar>
        </Box>;
    }
}

export default GuitarsNavBar;