import React, { Component } from 'react';
import AppNavbar from './appNavBar';
import {Container} from "@mui/material";
import { useParams } from 'react-router-dom';

function withParams(Component) {
    return props => <Component {...props} params={useParams()} />;
}

class Home extends Component {
    
    constructor(props) {
        super(props);
        this.state = {parent: this.props.parent, isLoading: true};
    }

    componentDidMount() {
        this.forceUpdate();
        this.setState({isLoading: false});
    }

    render() {
        const {isLoading} = this.state;
        if (isLoading)
            return <p>Loading...</p>;
        return (
            <Container maxWidth={false}>
                <AppNavbar parent={this}></AppNavbar>
            </Container>
        );
    }
}
export default withParams(Home);