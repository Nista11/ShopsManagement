import React, {Component} from 'react';
import { Container, Button } from '@mui/material';

class ComplexPagination extends Component {
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
        const count = this.props.parent.state.totalCount;
        let pageList = [];
        const page = this.parent.getPage();
        const maxPage = Math.floor(count / 10) + 1;
        if (count > 0) {
            for (let i = 1; i <= Math.min(maxPage, 5); i++) {
                pageList.push(
                    <Button 
                    key={i} 
                    onClick={() => this.parent.setPage(i - 1, this.parent.handlePageChange)}>
                        {i == page + 1 ? <b>{i}</b> : i}
                    </Button>
                );
            }

            if (page + 1 >= 7) {
                if (page + 1 != 7)
                    pageList.push("...");
                for (let i = page + 1 - 1; i >= Math.max(6, page + 1 - 5); i--) {
                    pageList.push(
                        <Button 
                        key={i} 
                        onClick={() => this.parent.setPage(i - 1, this.parent.handlePageChange)}>
                            {i == page + 1 ? <b>{i}</b> : i}
                        </Button>
                    );
                }
            }

            for (let i = Math.max(6, page + 1); i <= Math.min(maxPage, page + 1 + 5); i++) {
                pageList.push(
                    <Button 
                    key={i} 
                    onClick={() => this.parent.setPage(i - 1, this.parent.handlePageChange)}>
                        {i == page + 1 ? <b>{i}</b> : i}
                    </Button>
                );
            }

            if (page + 1 < maxPage - 5) {
                pageList.push("...");
                for (let i = Math.max(maxPage - 5, page + 1 + 5 + 1); i <= maxPage; i++) {
                    pageList.push(
                        <Button 
                        key={i} 
                        onClick={() => this.parent.setPage(i - 1, this.parent.handlePageChange)}>
                            {i == page + 1 ? <b>{i}</b> : i}
                        </Button>
                    );
                }
        }

            pageList = pageList.sort((a, b) => a.key - b.key);
        }
        
        return <Container> 
            {   this.parent.getPage() > 0 &&
                <Button onClick={() => this.parent.setPage(this.parent.getPage() - 1, this.parent.handlePageChange)}>Previous page</Button>}
            {   !this.parent.getLastPage() &&
                <Button onClick={() => this.parent.setPage(this.parent.getPage() + 1, this.parent.handlePageChange)}>Next page</Button>}
            {count && 
                <Container>
                    {pageList}
                </Container>
            }
        </Container>  
    }
}

export default ComplexPagination;