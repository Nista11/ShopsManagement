import React, {Component} from 'react';
import App from './app';
import Pagination from './pagination';
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
    TableRow
} from "@mui/material";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import FindInPageIcon from '@mui/icons-material/FindInPage';
import EditIcon from '@mui/icons-material/Edit';
import {blue, red, grey} from "@mui/material/colors";
import {Link} from "react-router-dom";

class EntityList extends Component {
    constructor(props) {
        super(props);
        this.state = {parent: this.props.parent, entities: [],
           operationItemId: -1, page: 0, lastPage: true, dialogOpen: false, totalCount: 0,
        isLoading: true};
    }

    componentDidMount() {
        const {parent} = this.state;
        
        this.seeEntityString = parent.seeEntityString;
        this.updateEntityString = parent.updateEntityString;
        this.apiEntityString = parent.apiEntityString;
        this.apiAfterPageString = parent.apiAfterPageString ? parent.apiAfterPageString : '';
        
        this.getEntityFieldsCells = parent.getEntityFieldsCells;
        this.getTableHeaderCells = parent.getTableHeaderCells;

        this.getEntities = this.getEntities.bind(this);
        this.handleDeleteItem = this.handleDeleteItem.bind(this);
        this.deleteItem = this.deleteItem.bind(this);
        this.getPage = this.getPage.bind(this);
        this.getLastPage = this.getLastPage.bind(this);
        this.handlePageChange = this.handlePageChange.bind(this);
        this.setPage = this.setPage.bind(this);

        this.getEntities();

        this.forceUpdate();
    }

    getEntities() {
        const {page, parent} = this.state;
        fetch(this.apiEntityString + 'page/' + page + this.apiAfterPageString)
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

    handleDeleteItem(event) {
        const target = event.currentTarget;
        const value = target.getAttribute("currentid");
        this.setState({operationItemId: value, dialogOpen: true});
    }

    deleteItem() {
        fetch(this.apiEntityString + this.state.operationItemId, 
            { method: 'DELETE',
            headers: { 'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + App.getCurrentUserStatic().getAccessToken() } 
             })
            .then(() => {
                this.getEntities();
                this.setState({operationItemId: -1});
            });
    }

    render() {
        const {parent, isLoading} = this.state;
        if (isLoading)
            return <p>Loading...</p>;
        else if (parent.apiEntityString !== this.apiEntityString) {
            this.apiEntityString = parent.apiEntityString;
            this.setState({isLoading: false}, this.getEntities);
            return <p>Loading...</p>
        }

        const {entities, page, dialogOpen} = this.state;
        
        let currentUser = App.getCurrentUserStatic();

        const entitiesList = entities.map((entity, index) => {
            return <TableRow key={entity.id}>
                <TableCell>{page * 10 + index + 1}</TableCell>
                {this.getEntityFieldsCells(entity)}
                <TableCell>
                    <Button component={Link} to={"/seeProfile/"+entity.user.username} sx={{textTransform: "none"}}>
                        {entity.user.username}
                    </Button>
                </TableCell>
                <TableCell>
                    <Button id="seeEntity" component={Link} to={this.seeEntityString + entity.id}>
                        <SvgIcon component={FindInPageIcon} sx={{ color: blue[500] }}></SvgIcon>
                    </Button>
                    { currentUser.hasEditAuthorization(entity.user.username) &&              
                    <Button component={Link} to={this.updateEntityString + entity.id}>
                        <SvgIcon component={EditIcon} sx={{ color: grey[500] }}></SvgIcon>
                    </Button>
                    }
                    { currentUser.hasEditAuthorization(entity.user.username) &&   
                    <Button id="deleteEntity" currentid={entity.id} onClick={this.handleDeleteItem}>
                        <SvgIcon component={DeleteForeverIcon} sx={{ color: red[500] }}></SvgIcon>
                    </Button>}
                </TableCell>
            </TableRow>
        });

        return (            
            <Container className="tableContainer">
                <Dialog
                    open={dialogOpen}
                    onClose={() => {this.setState({dialogOpen: false});}}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                        {"Delete item"}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Are you sure you want to delete the item?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => {this.setState({dialogOpen: false});}}>Cancel</Button>
                        <Button id="deleteEntityDialogButton"
                         onClick={() => {this.deleteItem(); this.setState({dialogOpen: false});}} autoFocus>
                            Yes
                        </Button>
                    </DialogActions>
                </Dialog>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>#</TableCell>
                            {this.getTableHeaderCells()}
                            <TableCell>Added by</TableCell>
                            <TableCell>Operations</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {entitiesList}
                    </TableBody>
                </Table>
                <Pagination parent={this}></Pagination>
            </Container>
        );
    }
}

export default EntityList;