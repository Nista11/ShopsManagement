import React, {Component} from 'react';
import AppNavBar from '../appNavBar';
import App from '../app';
import Pagination from '../pagination';
import {
    Button,
    Container, Dialog, DialogActions,
    DialogContent, DialogContentText,
    DialogTitle,
    SvgIcon,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    TextField
} from "@mui/material";
import { Link } from 'react-router-dom';

class UserRolesList extends Component {
    constructor(props) {
        super(props);
        this.state = {parent: this.props.parent, entities: [],
            operationItemId: -1, page: 0, lastPage: true, dialogOpen: false,
         isLoading: true};

        this.apiEntityString = App.API_URL + '/api/users/roles/';
    }

    componentDidMount() {
        this.getEntityFieldsCells = this.getEntityFieldsCells.bind(this);
        this.getTableHeaderCells = this.getTableHeaderCells.bind(this);
        this.getEntities = this.getEntities.bind(this);
        this.getPage = this.getPage.bind(this);
        this.getLastPage = this.getLastPage.bind(this);
        this.handlePageChange = this.handlePageChange.bind(this);
        this.setPage = this.setPage.bind(this);
        this.handleRolesUpdate = this.handleRolesUpdate.bind(this);
        this.handleRolesChange = this.handleRolesChange.bind(this);

        this.getEntities();
    }

    getEntities() {
        const {page} = this.state;
        fetch(this.apiEntityString + 'page/' + page)
            .then(response => response.json())
            .then(data => this.setState({entities: data.content, lastPage: data.last}, this.setState({isLoading: false})));
    }

    handlePageChange() {
        this.getEntities();
    }

    getPage() {
        return this.state.page;
    }

    setPage(page, callback) {
        this.setState({page: page}, callback);
    }

    getLastPage() {
        return this.state.lastPage;
    }

    handleRolesChange(event) {
        const {entities} = this.state;
        let user = entities.find(e => e.username === event.target.id);
        user.roles = event.target.value.split(/\n/);
        this.setState({entities: entities});
    }

    handleRolesUpdate(event) {
        const {entities} = this.state;
        let user = entities.find(e => e.username === event.target.id);
        for (let index = 0; index < user.roles.length; index++) {
            let role = user.roles[index];
            if (role.replace(/\s/g, '').length) { // has non-blank characters
                user.roles[index] = user.roles[index].replace(/\s/g, '')
                role = user.roles[index];
                if (!(['REGULAR','MODERATOR','ADMIN'].indexOf(role) >= 0)) {
                    return false;
                }
            }
        }
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + App.getCurrentUserStatic().getAccessToken() },
            body: JSON.stringify(user.roles)
        };

        fetch(App.API_URL + '/api/users/' + user.username + '/roles', requestOptions)
            .then(response => response.json())
            .then(this.setState({dialogOpen: true}));
        return true;
    }

    getEntityFieldsCells(user) {
        return (
            <React.Fragment>
                <TableCell>
                    <Button component={Link} to={"/seeProfile/"+user.username}
                sx={{textTransform: "none"}}>{user.username}</Button>
                </TableCell>
                <TableCell>
                    <TextField id={user.username} variant="outlined" multiline
                    defaultValue={String(user.roles).replace(/,/g, '\n')}
                    onChange={this.handleRolesChange}/>
                </TableCell>
                <TableCell>
                    <Button id={user.username} onClick={this.handleRolesUpdate}>Update</Button>
                </TableCell>
            </React.Fragment>
        );
    }

    getTableHeaderCells() {
        return (
            <React.Fragment>
                <TableCell>Username</TableCell>
                <TableCell>Roles</TableCell>
            </React.Fragment>
        );
    }

    render() {
        const {isLoading, dialogOpen} = this.state;
        if (isLoading)
            return <p>Loading...</p>;

        const {entities, page} = this.state;
        
        const entitiesList = entities.map((entity, index) => {
            return <TableRow key={entity.username}>
                <TableCell>{page * 10 + index + 1}</TableCell>
                {this.getEntityFieldsCells(entity)}
            </TableRow>
        });

        return (            
            <Container maxWidth={false}>
                <AppNavBar parent={this}/>
                <Container className="tableContainer" >
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>#</TableCell>
                                {this.getTableHeaderCells()}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {entitiesList}
                        </TableBody>
                    </Table>
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
                <Pagination parent={this}></Pagination>
            </Container>
        );
    }
}

export default UserRolesList;