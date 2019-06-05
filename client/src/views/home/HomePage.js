import React, {Component} from 'react';
import { Redirect, Router, Route } from 'react-router';
import { createBrowserHistory } from 'history'
import { Navbar, NavItem } from 'react-materialize';
import Axios from 'axios';

export class HomePage extends Component {
    constructor(props){
        super(props);

        this.state = {
            authenticated: true,
            history: createBrowserHistory()
        }
    }

    onClick(event){
        event.preventDefault();
        
        Axios.get('/logout')
        .then((result) => {
            this.setState({authenticated: false});
        });
    }

    render(){
        if(this.state.authenticated) {
            return (
                <React.Fragment>
                    <Navbar alignLinks="right">
                        <NavItem onClick={(event) => this.onClick(event)}>
                            Logout
                        </NavItem>
                    </Navbar>
                    <Router history={this.state.history}>
                    </Router>
                </React.Fragment>
            );
        }else{
            return <Redirect to="login" />
        }
    }
}