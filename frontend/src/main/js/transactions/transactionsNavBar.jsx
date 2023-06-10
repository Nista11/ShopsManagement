import { AppBar , Button, Box, Toolbar} from "@mui/material";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import App from "../app";

class TransactionsNavBar extends Component {
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
                    <Button color="inherit" sx={{flexGrow: 1}} component={Link} to="/transactions">Transactions</Button>
                    { currentUser.hasAddAuthorization() &&
                    <Button color="inherit" sx={{flexGrow: 1}} component={Link} to="/addTransaction">Add transaction</Button>
                    }
                    {
                        currentUser.isAuthenticated() &&
                        <Button color="inherit" sx={{flexGrow: 1}} component={Link} to="/ownTransactions">Own transactions</Button>
                    }
                </Toolbar>
            </AppBar>
        </Box>
    }
}

export default TransactionsNavBar;