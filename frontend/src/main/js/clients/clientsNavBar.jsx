import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {AppBar, Box, Button, Toolbar} from "@mui/material";
import App from '../app';

class ClientsNavBar extends Component {
    constructor(props) {
        super(props);
        this.state = {parent: this.props.parent};
    }

    render() {
        const currentUser = App.getCurrentUserStatic();

        return <Box>
        <AppBar position="sticky">
            <Toolbar>
                <Button color="inherit" sx={{flexGrow: 1}} component={Link} to="/">Home</Button>
                <Button color="inherit" sx={{flexGrow: 1}} component={Link} to="/clients">Clients</Button>
                {   currentUser.hasAddAuthorization() &&
                <Button id="addClientButton" color="inherit" sx={{flexGrow: 1}} component={Link} to="/addClient">Add client</Button>
                }
                {
                    currentUser.isAuthenticated() &&
                    <Button id="ownClientsButton" color="inherit" sx={{flexGrow: 1}} component={Link} to="/ownClients">Own clients</Button>
                }
            </Toolbar>
        </AppBar>
        </Box>;
    }
}

export default ClientsNavBar;