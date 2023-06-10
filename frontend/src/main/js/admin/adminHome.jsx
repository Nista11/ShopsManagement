import React, {Component} from 'react';
import AppNavBar from '../appNavBar';
import {Dialog, DialogActions,
    DialogContent, DialogContentText,
    DialogTitle, Button, Container, TextField, Typography, CircularProgress } from '@mui/material';
import {red} from "@mui/material/colors";
import App from '../app';
import Validation from '../validation';

class AdminHome extends Component {
    constructor(props) {
        super(props);
        this.state = {clientCount: null,
            courierCount: null,
            guitarCount: null,
            transactionCount: null,
            shopCount: null,
            userCount: null,
            recordsPerEntity: 1,
            dialogOpen: false,
            wantsDelete: false,
            wantsInsert: false,
            entriesPerPage: null,
            recordsPerPageDialogOpen: false,
            operationIsLoading: false,
            isLoading: true};
    }

    componentDidMount() {
        this.getAllCounts = this.getAllCounts.bind(this);
        this.deleteAllRecords = this.deleteAllRecords.bind(this);
        this.insertNewRecords = this.insertNewRecords.bind(this);
        this.updateEntriesPerPage = this.updateEntriesPerPage.bind(this);

        fetch(App.API_URL + '/api/appConfig/entriesPerPage')
            .then(response => response.json())
            .then(data => this.setState({entriesPerPage: data.entriesPerPage}));

        this.getAllCounts();
        this.setState({isLoading: false});
    }

    updateEntriesPerPage() {
        const {entriesPerPage} = this.state;
        console.log(entriesPerPage);
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json', 
            'Authorization': 'Bearer ' + App.getCurrentUserStatic().getAccessToken() }
        };

        fetch(App.API_URL + '/api/admin/updateEntriesPerPage/' + entriesPerPage, requestOptions)
            .then(response => response.json())
            .then(()=>this.setState({recordsPerPageDialogOpen: true}));
    }

    deleteAllRecords() {
        const requestOptions = {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json', 
            'Authorization': 'Bearer ' + App.getCurrentUserStatic().getAccessToken() }
        };

        fetch(App.API_URL + '/api/admin/delete/all', requestOptions)
            .then(response => response.json())
            .then(() => this.setState({operationIsLoading: false}));
    }

    insertNewRecords() {
        const {recordsPerEntity} = this.state;
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 
            'Authorization': 'Bearer ' + App.getCurrentUserStatic().getAccessToken() }
        };

        fetch(App.API_URL + '/api/admin/insert/' + recordsPerEntity, requestOptions)
            .then(response => response.json())
            .then(() => this.setState({operationIsLoading: false}));
    }

    getAllCounts() {
        if (!(/^.*admin\/*$/.test(location.href)))
            return; 

        fetch(App.API_URL + '/api/clients/count')
            .then(response => response.json())
            .then(data => this.setState({clientCount: data.count}));

        fetch(App.API_URL + '/api/couriers/count')
            .then(response => response.json())
            .then(data => this.setState({courierCount: data.count}));

        fetch(App.API_URL + '/api/guitars/count')
            .then(response => response.json())
            .then(data => this.setState({guitarCount: data.count}));

        fetch(App.API_URL + '/api/transactions/count')
            .then(response => response.json())
            .then(data => this.setState({transactionCount: data.count}));

        fetch(App.API_URL + '/api/shops/count')
            .then(response => response.json())
            .then(data => this.setState({shopCount: data.count}));

        fetch(App.API_URL + '/api/users/count')
            .then(response => response.json())
            .then(data => this.setState({userCount: data.count}));

        setTimeout(this.getAllCounts, 3000);
    }

    render() {
        const {isLoading} = this.state;
        if (isLoading) 
            return <p>Loading...</p>;

        const {clientCount, courierCount, guitarCount, transactionCount, shopCount, userCount, dialogOpen,
        wantsDelete, wantsInsert,recordsPerEntity,entriesPerPage,operationIsLoading,recordsPerPageDialogOpen} = this.state;

        const recordsPerEntityValid = Validation.validPositive(recordsPerEntity);
        const entriesPerPageValid = Validation.validPositive(entriesPerPage);

        return (<Container maxWidth={false}>
            <AppNavBar parent={this}/>
            <br/><br/><br/><br/>
            <Container maxWidth={false}>
                <Button color="warning" 
                    disabled={operationIsLoading}
                    onClick={() => this.setState({wantsInsert: false, wantsDelete: true, dialogOpen: true})}
                    >{!operationIsLoading || !wantsDelete ? "Delete all records" : 
                        <React.Fragment>
                            <CircularProgress size={24} />
                            <Typography variant="body2" color="textSecondary">
                                Loading...
                            </Typography>
                        </React.Fragment>
                    }</Button>
                <br/><br/><br/><br/>
                <TextField InputLabelProps={{shrink: true}} id="outlined-basic" label="Aproximate records per entity" variant="outlined"
                                    error={!recordsPerEntityValid}
                                    helperText={recordsPerEntityValid ? "" : "Only positive numbers are valid"}
                                value={recordsPerEntity}
                                onChange={(event)=>this.setState({recordsPerEntity: event.target.value})}/>
            
                <Button color="warning" 
                    disabled={operationIsLoading || !recordsPerEntityValid}
                    onClick={() => this.setState({wantsDelete: false, wantsInsert: true, dialogOpen: true})}>
                        {!operationIsLoading || !wantsInsert ? "Insert records" : 
                        <React.Fragment>
                            <CircularProgress size={24} />
                            <Typography variant="body2" color="textSecondary">
                                Loading...
                            </Typography>
                        </React.Fragment>
                    }
                </Button>
                <br/><br/><br/><br/>
                <TextField InputLabelProps={{shrink: true}} id="outlined-basic" label="Entries per page" variant="outlined"
                                    error={!entriesPerPageValid}
                                    helperText={entriesPerPageValid ? "" : "Only positive numbers are valid"}
                                value={entriesPerPage}
                                onChange={(event)=>this.setState({entriesPerPage: event.target.value})}/>
                <Button color="warning"
                    disabled={!entriesPerPageValid}
                    onClick={this.updateEntriesPerPage}
                >
                    Update entries per page
                </Button>
            </Container>
            <br/>
            <p>Updates every 3 seconds</p>
            <TextField InputLabelProps={{shrink: true}} id="outlined-basic" label="Total guitars" variant="filled"
                               InputProps={{readOnly: true,}} value={guitarCount}/>
            &nbsp;
            <TextField InputLabelProps={{shrink: true}} id="outlined-basic" label="Total clients" variant="filled"
                        InputProps={{readOnly: true,}} value={clientCount}/>
            &nbsp;
            <TextField InputLabelProps={{shrink: true}} id="outlined-basic" label="Total couriers" variant="filled"
            InputProps={{readOnly: true,}} value={courierCount}/>
            &nbsp;
            <TextField InputLabelProps={{shrink: true}} id="outlined-basic" label="Total transactions" variant="filled"
                        InputProps={{readOnly: true,}} value={transactionCount}/>
            &nbsp;
            <TextField InputLabelProps={{shrink: true}} id="outlined-basic" label="Total shops" variant="filled"
                        InputProps={{readOnly: true,}} value={shopCount}/>
            &nbsp;
            <TextField InputLabelProps={{shrink: true}} id="outlined-basic" label="Total users" variant="filled"
                    InputProps={{readOnly: true,}} value={userCount}/>
            <br/><br/>
            <Dialog
                    open={dialogOpen}
                    onClose={() => this.setState({dialogOpen: false})}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title" sx={{color: red[500]}}>
                        {"Database operation"}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText sx={{color: '#000000'}} id="alert-dialog-description">
                            Are you sure you want to {wantsDelete ? "delete all records?" : 
                            `insert aproximate ${recordsPerEntity} records per entity? This will replace existing records` }
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={()=>this.setState({dialogOpen: false})}>Cancel</Button>
                        <Button color="warning" 
                        onClick={()=>{wantsDelete ? this.deleteAllRecords() : this.insertNewRecords();
                            this.setState({operationIsLoading: true, dialogOpen: false});}} autoFocus>
                            Yes
                        </Button>
                    </DialogActions>
            </Dialog>
            <Dialog
                    open={recordsPerPageDialogOpen}
                    onClose={() => this.setState({recordsPerPageDialogOpen: false})}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                        {"Status"}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Update successful!
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button color="warning" 
                        onClick={()=>this.setState({recordsPerPageDialogOpen: false})} autoFocus>
                            Ok
                        </Button>
                    </DialogActions>
            </Dialog> 
        </Container>);
    }
}

export default AdminHome;