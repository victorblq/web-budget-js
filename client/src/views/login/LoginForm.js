import React, { Component } from 'react';
import Axios from 'axios';
import { Col, Row, Card, Button } from 'react-materialize';

export class LoginForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            password: ''
        };
    }

    handleInputChange = (event) => {
        const { value, name } = event.target;
        this.setState({
            [name]: value
        });
    }

    onSubmit = (event) => {
        event.preventDefault();
        
        Axios.post('/authenticate', this.state)
        .then((response) => {
            this.props.history.push('/');
        })
        .catch((error) => {
            console.log(error);
            alert(error.response.data);
        });
    }

    render() {
        return (
            <Row>
                <Col m={4} offset="m4">
                    <Card title="Login">
                        <form onSubmit={this.onSubmit}>
                            <input
                                type="text"
                                name="username"
                                placeholder="Enter username"
                                value={this.state.username}
                                onChange={this.handleInputChange}
                                required />
                            <input
                                type="password"
                                name="password"
                                placeholder="Enter password"
                                value={this.state.password}
                                onChange={this.handleInputChange}
                                required />

                            <Button type="submit">Login</Button>
                        </form>
                    </Card>
                </Col>
            </Row>
            
        );
    }
}