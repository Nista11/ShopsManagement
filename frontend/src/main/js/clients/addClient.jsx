import React, { Component } from 'react';
import ClientsNavBar from './clientsNavBar';
import {
    Button,
    Container,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    InputLabel, MenuItem, Select,
    TextField
} from "@mui/material";
import App from "../app";
import Validation from '../validation';

class AddClient extends Component {

    constructor(props) {
        super(props);
        this.state = {parent: this.props.parent, 
            name: "", email: "", phone: "", birthDate: "", address: "", dialogOpen: false, isLoading: true};
    }

    componentDidMount() {
        this.handleClientAdd = this.handleClientAdd.bind(this);
        this.setState({isLoading: false});
        this.forceUpdate();
    }

    handleClientAdd(event) {
        const currentUser = App.getCurrentUserStatic();
        const {name, email, phone, birthDate, address} = this.state;
        new Promise((resolve, reject) => resolve(currentUser.getId()))
            .then(id => { return {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 
                'Authorization': 'Bearer ' + currentUser.getAccessToken() },
                body: JSON.stringify({
                    name: name, email: email, 
                    telephoneNumber: phone, birthDate: birthDate, address: address,
                    user: {id: id, isEnabled: true}
                })
            }})
            .then(
                requestOptions => 
                fetch(App.API_URL + '/api/clients', requestOptions)
                    .then(response => response.json())
                    .then(() => this.setState({dialogOpen: true}))
            );
    }

    render() {
        const {dialogOpen, email, phone,birthDate, isLoading} = this.state;
        const emailValid = Validation.validEmail(email);
        const phoneValid = Validation.validPhoneNumber(phone);
        const birthDateValid = Validation.validDate(birthDate);
        if (isLoading) {
            return <p>Loading...</p>
        }
        return (
            <Container maxWidth={false}>
                <ClientsNavBar parent={this}></ClientsNavBar>
                <br/><br/>
                <Container>
                    <TextField id="clientName" label="Name" variant="outlined"
                               onChange={(event)=>this.setState({name: event.target.value})}/>
                    <br/><br/>
                    <TextField id="clientEmail" label="Email" variant="outlined" 
                                error={!emailValid}
                                 helperText={!emailValid ? "Email is not valid" : ''}
                                onChange={(event)=>this.setState({email: event.target.value})}/>
                    <br/><br/>
                    <TextField id="clientPhone" label="Phone" variant="outlined"
                                error={!phoneValid}
                                helperText={!phoneValid ? "Phone number is not valid" : ''}
                               onChange={(event)=>this.setState({phone: event.target.value})}/>
                    <br/><br/>
                    <TextField id="clientBirthDate" label="Birth Date" variant="outlined"
                            error={!birthDateValid}
                            helperText={!birthDateValid ? 
                                "Date must be of format dd-MM-yyyy and valid" : ''}
                               onChange={(event)=>this.setState({birthDate: event.target.value})}/>
                    <br/><br/>
                    <TextField id="clientAddress" label="Address" variant="outlined"
                               onChange={(event)=>this.setState({address: event.target.value})}/>
                    <br/><br/>
                    <Button id="addClientFormButton" disabled={!emailValid || !phoneValid || !birthDateValid} 
                    onClick={this.handleClientAdd}>Add client</Button>
                </Container>
                <Dialog
                    open={dialogOpen}
                    onClose={() => {this.setState({dialogOpen: false});}}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                        {"Item updated"}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Item was added successfully!
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button id="clientDialogOkButton" onClick={() => {this.setState({dialogOpen: false});}}>OK</Button>
                    </DialogActions>
                </Dialog>
            </Container>
        );
    }
}
export default AddClient;