import React, { Component } from 'react';
import ClientsNavBar from './clientsNavBar';
import {
    Container,
    TextField
} from "@mui/material";
import {useParams} from "react-router-dom";
import App from "../app";

function withParams(Component) {
    return props => <Component {...props} params={useParams()} />;
}

class SeeClient extends Component {

    constructor(props) {
        super(props);
        this.state = {parent: this.props.parent, name: "", email: "", phone: "", birthDate: "", address: "", isLoading: true};
        this.id = this.props.params.id
        this.fillTextFields();
    }

    componentDidMount() {
        this.forceUpdate();
    }

    fillTextFields() {
        fetch(App.API_URL + '/api/clients/' + this.id)
            .then(response => response.json())
            .then(client =>
                this.setState({name: client.name, email: client.email, 
                    phone: client.telephoneNumber, birthDate: client.birthDate, address: client.address})
            )
            .then(() => this.setState({isLoading: false}));
    }

    render() {
        const {name, email, phone, birthDate, address, isLoading} = this.state
        if (isLoading) {
            return <p>Loading...</p>
        }
        return (
            <Container maxWidth={false}>
                <ClientsNavBar parent={this}></ClientsNavBar>
                <br/><br/>
                <Container>
                    <TextField id="clientName" label="Name" variant="filled"
                               InputProps={{readOnly: true,}} defaultValue={name}/>
                    <br/><br/>
                    <TextField id="clientEmail" label="Email" variant="filled"
                               InputProps={{readOnly: true,}} defaultValue={email}/>
                    <br/><br/>
                    <TextField id="clientPhone" label="Phone" variant="filled"
                               InputProps={{readOnly: true,}} defaultValue={phone}/>
                    <br/><br/>
                    <TextField id="clientBirthDate" label="Birth Date" variant="filled"
                               InputProps={{readOnly: true,}} defaultValue={birthDate}/>
                    <br/><br/>
                    <TextField id="clientAddress" label="Address" variant="filled"
                               InputProps={{readOnly: true,}} defaultValue={address}/>
                </Container>
            </Container>
        );
    }
}
export default withParams(SeeClient);