import React, { Component } from "react";
import AppNavbar from "../appNavBar";
import { useParams } from "react-router-dom";
import { Container, Button, Dialog, DialogContent, 
    DialogContentText, DialogActions, DialogTitle, TextField } from "@mui/material";
import App from "../app";
import Validation from "../validation";

function withParams(Component) {
    return props => <Component {...props} params={useParams()} />;
}

class UserRegister extends Component {

    constructor(props) {
        super(props);
        this.state = {parent: this.props.parent, email: "", username: "", 
        password: "", invalidCredentials: false, dialogOpen: false, 
        confirmationCode: "", enteredCode: "", confirmCodeDialogOpen: false, confirmationCodeMessage: "", isLoading: true};
    }

    componentDidMount() {
        this.forceUpdate();
        this.handleUserRegister = this.handleUserRegister.bind(this);
        this.handleUserConfirmCode = this.handleUserConfirmCode.bind(this);
        this.setState({isLoading: false});
    }

    handleUserRegister() {
        const {email, username, password} = this.state;
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                email: email,
                username: username,
                password: password
            })
        };

        fetch(App.API_URL + '/api/auth/register', requestOptions)
            .then(response => response.json())
            .then(data => {
                if (data.username && data.email && data.confirmationCode) {               
                    this.setState({invalidCredentials: false, confirmationCode: data.confirmationCode, dialogOpen: true});
                }
                else {
                    this.setState({invalidCredentials: true});
                }
            });
    }

    handleUserConfirmCode() {
        const {enteredCode} = this.state;
        fetch(App.API_URL + '/api/auth/register/confirm/' + enteredCode)
            .then(response => {
                this.setState({confirmationCodeMessage: response.status != 200 ? 
                    'Confirmation code is not valid' : 'User registered successfully!'},
                     this.setState({confirmCodeDialogOpen: true}));
            });
    }

    render() {
        const {email, username, password, invalidCredentials, dialogOpen, 
            confirmationCode, confirmationCodeMessage, confirmCodeDialogOpen ,enteredCode, isLoading} = this.state;
        if (isLoading)
            return <p>Loading...</p>;

        let passwordStrength = Validation.getPasswordStrength(password);
        const emailValid = Validation.validEmail(email);

        return (
            <Container maxWidth={false}>
                <AppNavbar parent={this}/>
                <br/><br/>
                <Container maxWidth={false} className="userLogin" sx={{width: 300}}>
                    {invalidCredentials ? <p style={{color: 'red'}}>Username or email is already used!</p> : <Container><br/><br/></Container>}
                    <TextField id="outlined-basic" label="Email" variant="outlined"
                    defaultValue={email}
                    error={!emailValid} helperText={!emailValid? "Email is not valid" : ""}
                    onChange={(event)=>this.setState({invalidCredentials: false, email: event.target.value})} />
                    <br/><br/>
                    <TextField id="outlined-basic" label="Username" variant="outlined"
                    defaultValue={username}
                    onChange={(event)=>this.setState({invalidCredentials: false, username: event.target.value})} />
                    <br/><br/>
                    <TextField id="outlined-basic" label="Password" variant="outlined" type="password"
                    defaultValue={password}
                    error={passwordStrength !== 'Strong' && passwordStrength !== 'Very strong'} 
                    helperText={passwordStrength}
                    onChange={(event)=>this.setState({invalidCredentials: false, password: event.target.value})} />
                    <br/><br/>
                    <Button disabled={!emailValid || username === '' || password === '' ||
                         (passwordStrength !== 'Strong' && passwordStrength !== 'Very strong')} 
                    onClick={this.handleUserRegister}>Register</Button>
                    <br/><br/>
                    <TextField id="outlined-basic" label="Confirmation code" variant="outlined"
                    defaultValue={enteredCode}
                    onChange={(event)=>this.setState({enteredCode: event.target.value})} />
                    <Button disabled={enteredCode === ''} onClick={this.handleUserConfirmCode}>Submit confirmation code</Button>
                </Container>
                <Dialog
                    open={dialogOpen}
                    onClose={() => {this.setState({dialogOpen: false});}}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                        {"Confirmation code"}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            This is your confirmation code, valid for 10 minutes:<br/>
                            {confirmationCode}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => {this.setState({dialogOpen: false});}}>OK</Button>
                    </DialogActions>
                </Dialog>
                <Dialog
                    open={confirmCodeDialogOpen}
                    onClose={() => {this.setState({confirmCodeDialogOpen: false});}}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                        {"Confirmation code"}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            {confirmationCodeMessage}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => {this.setState({confirmCodeDialogOpen: false});}}>OK</Button>
                    </DialogActions>
                </Dialog>
            </Container>
        );
    }
}

export default withParams(UserRegister);