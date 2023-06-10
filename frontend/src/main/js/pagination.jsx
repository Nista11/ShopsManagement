import React, {Component} from 'react';
import { Container, Button } from '@mui/material';

class Pagination extends Component {
    constructor(props) {
        super(props);
        this.state = {isLoading: true};
        this.parent = this.props.parent;
    }

    componentDidMount() {
        this.setState({isLoading: false});
        this.forceUpdate();
    }

    render() {
        const {isLoading} = this.state;
        if (isLoading)
            return <p>Loading...</p>;

        return <Container> 
            {   this.parent.getPage() > 0 &&
                <Button onClick={() => this.parent.setPage(this.parent.getPage() - 1, this.parent.handlePageChange)}>Previous page</Button>}
            {   !this.parent.getLastPage() &&
                <Button onClick={() => this.parent.setPage(this.parent.getPage() + 1, this.parent.handlePageChange)}>Next page</Button>}
        </Container>  
    }
}

export default Pagination;