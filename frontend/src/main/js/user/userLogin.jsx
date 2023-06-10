import { Container, Button, TextField } from "@mui/material";
import React, {Component} from "react";
import AppNavbar from "../appNavBar";
import App from "../app";
import { Link, useParams } from "react-router-dom";

function withParams(Component) {
    return props => <Component {...props} params={useParams()} />;
}

class UserLogin extends Component {
    
    constructor(props) {
        super(props);
        this.state = {parent: this.props.parent, username: "", password: "", invalidCredentials: false, isLoading: true};
    }

    componentDidMount() {      
        this.handleUserLogin = this.handleUserLogin.bind(this);
        this.forceUpdate();
        this.setState({isLoading: false});
    }

    handleUserLogin() {
        const {username, password} = this.state;
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username: username,
                password: password
            })
        };
        fetch(App.API_URL + '/api/auth/login', requestOptions)
            .then(response => response.json())
            .then(data => {
                if (data.username && data.accessToken) {
                    localStorage.setItem('currentUser', JSON.stringify(data));
                    this.setState({invalidCredentials: false});
                    document.getElementById("goHomeButton").click();
                }
                else {
                    this.setState({invalidCredentials: true});
                }
            });
    }

    render() {
        const {username, password, invalidCredentials, isLoading} = this.state;
        if (isLoading)
            return <p>Loading...</p>;

        return (
            <Container maxWidth={false}>
                <AppNavbar parent={this}/>
                <br/><br/>
                <Button sx={{style: "display: none;"}} id="goHomeButton" component={Link} to="/"></Button>
                <Container maxWidth={false} className="userLogin" sx={{width: 300}}>
                    {invalidCredentials ? <p style={{color: 'red'}}>Invalid credentials</p> : <Container><br/><br/></Container>}
                    <TextField id="username" label="Username" variant="outlined"
                    defaultValue={username}
                    onKeyDown={(event) => {if (event.key == 'Enter') {document.getElementById('password').focus();}}}
                    onChange={(event)=>this.setState({invalidCredentials: false, username: event.target.value})} />
                    <br/><br/>
                    <TextField id="password" label="Password" variant="outlined" type="password"
                    defaultValue={password}
                    onKeyDown={(event) => {if (event.key == 'Enter') {document.getElementById('loginButton').click();}}}
                    onChange={(event)=>this.setState({invalidCredentials: false, password: event.target.value})} />
                    <br/><br/>
                    <Button id="loginFormButton" disabled={username === '' || password === ''} onClick={this.handleUserLogin}>Login</Button>
                    <br/><br/>
                    <p>Don't have an account?</p>
                    <Button component={Link} to='/register'>Register</Button>
                </Container>
            </Container>
        );
    }
}

export default withParams(UserLogin);