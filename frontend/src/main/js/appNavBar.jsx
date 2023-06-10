import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {AppBar, Box, Button, Container, Toolbar} from "@mui/material";
import { useParams } from 'react-router-dom';
import App from './app';

function withParams(Component) {
    return props => <Component {...props} params={useParams()} />;
}

class AppNavbar extends Component {
    constructor(props) {
        super(props);
        this.state = {parent: this.props.parent, isOpen: false, isLoading: true};
    }

    componentDidMount() {
        this.toggle = this.toggle.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
        this.forceUpdate();
        this.setState({isLoading: false});
    }

    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    handleLogout() {
        localStorage.removeItem('currentUser');
        document.getElementById("goHomeButton").click();
    }

    render() {
        const {isLoading} = this.state;
        if (isLoading)
            return <p>Loading...</p>;

        const currentUser = App.getCurrentUserStatic();

        return <Box>
        <AppBar position="sticky">
            <Toolbar>
                <Button id="goHomeButton" color="inherit" sx={{flexGrow: 1}} component={Link} to="/">Home</Button>
                {
                    currentUser.hasRole("ADMIN") &&
                    <Button color="inherit" sx={{flexGrow: 1}} component={Link}
                     to={"/admin/"}>Database</Button>
                }
                {
                    currentUser.hasRole("ADMIN") &&
                    <Button color="inherit" sx={{flexGrow: 1}} component={Link}
                     to={"/usersRoles/"}>Users roles</Button>
                }
                <Button color="inherit" sx={{flexGrow: 1}} component={Link} to="/guitars">Guitars</Button>
                <Button id="clientsButton" color="inherit" sx={{flexGrow: 1}} component={Link} to="/clients">Clients</Button>
                <Button id="couriersButton" color="inherit" sx={{flexGrow: 1}} component={Link} to="/couriers">Couriers</Button>
                <Button color="inherit" sx={{flexGrow: 1}} component={Link} to="/transactions">Transactions</Button>
                <Button color="inherit" sx={{flexGrow: 1}} component={Link} to="/shops">Shops</Button>
                {   currentUser.isAuthenticated() &&
                    <Button color="inherit" sx={{flexGrow: 1}} component={Link} to="/chat">Chat</Button>
                }
                {
                    currentUser.isAuthenticated() &&
                    <Button id="profileButton" color="inherit" sx={{flexGrow: 1}} component={Link}
                     to={"/updateProfile/"+currentUser.getUsername()}>Profile</Button>
                }
                {   !currentUser.isAuthenticated() ?
                    <Button id="loginButton" color="inherit" component={Link} to="/login">Login</Button> : 
                    <Button id="logoutButton" color="inherit" onClick={this.handleLogout}>Logout</Button>
                }
            </Toolbar>
        </AppBar>
        </Box>;
    }
}

export default withParams(AppNavbar);