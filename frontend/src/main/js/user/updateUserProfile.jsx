import React, {Component} from 'react';
import { useParams } from 'react-router-dom';
import AppNavBar from '../appNavBar';
import {
    Button,
    Container,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    TextField
} from "@mui/material";
import App from "../app";
import Validation from '../validation';

function withParams(Component) {
    return props => <Component {...props} params={useParams()}/>;
}

class UpdateUserProfile extends Component {

    constructor(props) {
        super(props);
        this.state = {parent: this.props.parent, username: this.props.params.username, 
            firstName: null,
            lastName: null,
            address: null,
            telephoneNumber: null,
            birthDate: null,
            clientCount: null,
            courierCount: null,
            guitarCount: null,
            transactionCount: null,
            shopCount: null,
            dialogOpen: false,
            isLoading: true};
    }

    componentDidMount() {
        this.fillTextFields = this.fillTextFields.bind(this);
        this.handleUserProfileUpdate = this.handleUserProfileUpdate.bind(this);
        this.fillTextFields();
        this.forceUpdate();
    }

    fillTextFields() {
        const {username} = this.state;

        fetch(App.API_URL + '/api/users/profile/' + username)
            .then(response => response.json())
            .then(profile =>{
                this.setState(
                    { roles: profile.user.roles.map(r => r.role),
                        firstName: profile.firstName,
                    lastName: profile.lastName,
                    address: profile.address,
                    telephoneNumber: profile.telephoneNumber,
                    birthDate: profile.birthDate
                }, 
                () => fetch(App.API_URL + '/api/clients/count/' + username)
                    .then(response => response.json())
                    .then(data => this.setState({clientCount: data.count}, 
                        () => fetch(App.API_URL + '/api/couriers/count/' + username)
                        .then(response => response.json())
                        .then(data => this.setState({courierCount: data.count},
                            () => fetch(App.API_URL + '/api/guitars/count/' + username)
                            .then(response => response.json())
                            .then(data => this.setState({guitarCount: data.count},
                                () => fetch(App.API_URL + '/api/transactions/count/' + username)
                                .then(response => response.json())
                                .then(data => this.setState({transactionCount: data.count},
                                    () => fetch(App.API_URL + '/api/shops/count/' + username)
                                    .then(response => response.json())
                                    .then(data => this.setState({shopCount: data.count},
                                    this.setState({isLoading: false}))))))
                            )
                            ))))
                );
            });
    }

    handleUserProfileUpdate() {
        const {username, firstName, lastName, address, telephoneNumber, birthDate} = this.state;
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + App.getCurrentUserStatic().getAccessToken() },
            body: JSON.stringify({
                firstName: firstName, lastName: lastName, address: address, telephoneNumber: telephoneNumber, 
                birthDate: birthDate
            })
        };

        fetch(App.API_URL + '/api/users/profile/' + username, requestOptions)
            .then(response => response.json())
            .then(this.setState({dialogOpen: true}));
    }

    render() {
        const {username, firstName, lastName, address, telephoneNumber, birthDate, dialogOpen, 
            clientCount, courierCount, guitarCount, transactionCount, shopCount,roles,
            isLoading} = this.state;

        let currentUser = App.getCurrentUserStatic();

        if (isLoading) 
            return <p>Loading...</p>;

        const firstNameValid = Validation.validStringNotBlank(firstName);
        const lastNameValid = Validation.validStringNotBlank(lastName);
        const phoneValid = Validation.validPhoneNumber(telephoneNumber);
        const dateValid = Validation.validDate(birthDate);

        return (
            <Container maxWidth={false}>
                <AppNavBar parent={this}/>
                <br/><br/><br/><br/>
                <Container maxWidth={false}>
                {
                    currentUser.hasSeeRoleAuthorization(username) &&
                    <React.Fragment>
                    <TextField id="outlined-basic" label="Roles" variant="filled" multiline
                            InputProps={{readOnly: true,}} defaultValue={String(roles).replace(/,/g, '\n')}/>
                    &nbsp;
                    &nbsp;
                    </React.Fragment>
                    }
                    <TextField id="usernameProfile" label="Username" variant="filled"
                               InputProps={{readOnly: true,}} defaultValue={username}/>
                    &nbsp;
                    <TextField id="outlined-basic" label="Guitars added" variant="filled"
                               InputProps={{readOnly: true,}} defaultValue={guitarCount}/>
                    &nbsp;
                    <TextField id="outlined-basic" label="Clients added" variant="filled"
                               InputProps={{readOnly: true,}} defaultValue={clientCount}/>
                    &nbsp;
                    <TextField id="outlined-basic" label="Couriers added" variant="filled"
                    InputProps={{readOnly: true,}} defaultValue={courierCount}/>
                    &nbsp;
                    <TextField id="outlined-basic" label="Transactions added" variant="filled"
                               InputProps={{readOnly: true,}} defaultValue={transactionCount}/>
                    &nbsp;
                    <TextField id="outlined-basic" label="Shops added" variant="filled"
                               InputProps={{readOnly: true,}} defaultValue={shopCount}/>
                    <br/><br/>
                    <TextField id="outlined-basic" label="First name" variant="outlined" defaultValue={firstName}
                    error={!firstNameValid} helperText={!firstNameValid ? "First name cannot be empty" : ""}
                               onChange={(event)=>this.setState({firstName: event.target.value})}/>
                    <br/><br/>
                    <TextField id="outlined-basic" label="Last name" variant="outlined" defaultValue={lastName}
                    error={!lastNameValid} helperText={!lastNameValid ? "Last name cannot be empty" : ""}
                               onChange={(event)=>this.setState({lastName: event.target.value})}/>
                    <br/><br/>
                    <TextField id="outlined-basic" label="Address" variant="outlined" defaultValue={address}
                               onChange={(event)=>this.setState({address: event.target.value})}/>
                    <br/><br/>
                    <TextField id="outlined-basic" label="Phone" variant="outlined" defaultValue={telephoneNumber}
                    error={!phoneValid} helperText={!phoneValid ? "Phone is not valid" : ""}
                               onChange={(event)=>this.setState({telephoneNumber: event.target.value})}/>
                    <br/><br/>
                    <TextField id="outlined-basic" label="Birth Date" variant="outlined" defaultValue={birthDate}
                    error={!dateValid} helperText={!dateValid ? "Date must be of format dd-MM-yyyy and valid" : ""}
                               onChange={(event)=>this.setState({birthDate: event.target.value})}/>
                    <br/><br/>
                    <Button disabled={!firstNameValid || !lastNameValid || !phoneValid || !dateValid} 
                        onClick={this.handleUserProfileUpdate}>Update profile</Button>
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
                            Item was updated successfully!
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => {this.setState({dialogOpen: false});}}>OK</Button>
                    </DialogActions>
                </Dialog>
            </Container>
        );
    }
}

export default withParams(UpdateUserProfile);