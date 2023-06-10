import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {AppBar, Box, Button, Toolbar} from "@mui/material";
import App from '../app';

class CouriersNavBar extends Component {
    constructor (props) {
        super(props);
        this.state = {parent: this.props.parent};
    }

    render() {
        let currentUser = App.getCurrentUserStatic();

        return <Box>
            <AppBar position="sticky">
                <Toolbar>
                    <Button color="inherit" sx={{flexGrow: 1}} component={Link} to="/">Home</Button>
                    <Button color="inherit" sx={{flexGrow: 1}} component={Link} to="/couriers">Couriers</Button>
                    { currentUser.hasAddAuthorization() &&
                    <Button id="addCourierButton" color="inherit" sx={{flexGrow: 1}} component={Link} to="/addCourier">Add courier</Button>
                    }
                    {
                    currentUser.isAuthenticated() &&
                    <Button id="ownCouriersButton" color="inherit" sx={{flexGrow: 1}} component={Link} to="/ownCouriers">Own couriers</Button>
                    }
                </Toolbar>
            </AppBar>
        </Box>
    }
}

export default CouriersNavBar;