import React, {Component} from 'react';
import { Link, useParams } from 'react-router-dom';
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

function withParams(Component) {
    return props => <Component {...props} params={useParams()}/>;
}

class UpdateUserProfile extends Component {

    constructor(props) {
        super(props);
        this.state = {parent: this.props.parent, username: this.props.params.username, 
            roles: [],
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
        this.fillTextFields();
        this.forceUpdate();
    }

    fillTextFields() {
        const {username} = this.state;

        fetch(App.API_URL + '/api/users/profile/' + username)
            .then(response => response.json())
            .then(profile =>{
                this.setState(
                    {   roles: profile.user.roles.map(r => r.role),
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

    render() {
        const {username, firstName, lastName, address, telephoneNumber, birthDate, 
            clientCount, courierCount, guitarCount, transactionCount, shopCount, roles,
            isLoading} = this.state;

        let currentUser = App.getCurrentUserStatic();
        if (isLoading) 
            return <p>Loading...</p>;

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
                    <TextField id="outlined-basic" label="Username" variant="filled"
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
                    <TextField id="outlined-basic" label="First name" variant="filled" defaultValue={firstName}
                               InputProps={{readOnly: true,}}/>
                    <br/><br/>
                    <TextField id="outlined-basic" label="Last name" variant="filled" defaultValue={lastName}
                               InputProps={{readOnly: true,}}/>
                    <br/><br/>
                    <TextField id="outlined-basic" label="Address" variant="filled" defaultValue={address}
                               InputProps={{readOnly: true,}}/>
                    <br/><br/>
                    <TextField id="outlined-basic" label="Phone" variant="filled" defaultValue={telephoneNumber}
                               InputProps={{readOnly: true,}}/>
                    <br/><br/>
                    <TextField id="outlined-basic" label="Birth Date" variant="filled" defaultValue={birthDate}
                               InputProps={{readOnly: true,}}/>
                    <br/><br/>
                    {   currentUser.hasEditAuthorization(username) &&
                    <Button sx={{flexGrow: 1}} component={Link} 
                    to={"/updateProfile/"+ username}>Update profile</Button>
                }
                </Container>
            </Container>
        );
    }
}

export default withParams(UpdateUserProfile);