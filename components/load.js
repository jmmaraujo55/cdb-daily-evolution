import { Component } from 'react';
// eslint-disable-next-line no-unused-vars
import { CircularProgress } from '@material-ui/core';

class Load extends Component {
    render() {
        return <CircularProgress color="primary" size='50pt' />;
    }
}

export default Load;
