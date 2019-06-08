import React, { Component } from 'react';
import { Route, Router, Redirect } from 'react-router';
import { createBrowserHistory } from 'history';
import Axios from 'axios';
import { CssBaseline, Box } from '@material-ui/core';

import { LoginForm } from './login/LoginForm';
import { HomePage } from './home/HomePage';
import './Index.css';

function Index() {
    return (
        <Box height="100%">
            <Router history={createBrowserHistory()}>
                <CssBaseline />

                <Route path="/login" component={LoginForm} />
                <Route path="/" exact={true} component={authenticated()} />
            </Router>
        </Box>
    );
}

export default Index;

function authenticated() {
    return class extends Component {
        constructor() {
            super();
            this.state = {
                loading: true,
                redirect: false,
            };
        }

        componentDidMount() {
            Axios.get('/check-token')
                .then((response) => {
                    if (response.status === 200) {
                        this.setState({ loading: false });
                    } else {
                        const error = new Error(response.error);
                        throw error;
                    }
                })
                .catch((error) => {
                    console.error(error);
                    console.log(error.response);
                    this.setState({ loading: false, redirect: true });
                });
        }

        render() {
            const { loading, redirect } = this.state;
            if (loading) {
                return null;
            }

            if (redirect) {
                return (
                    <React.Fragment>
                        <Redirect to="/login" />
                    </React.Fragment>
                );
            }

            return (
                <React.Fragment>
                    <HomePage />
                </React.Fragment>
            );
        }
    }
}