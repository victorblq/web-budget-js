import {Route} from "react-router";
import React from "react";
import {BrowserRouter, Link} from "react-router-dom";
import {AuthenticatedUserContext} from "../../App";

interface CustomHomeProps{
    logoutFunction: any
}

const Dashboard = () => {
    return (
        <h1>Rota 1</h1>
    );
};

const Usuario = () => {
    return (
        <React.Fragment>
            <h1>Rota 2</h1>
            <Link to={'/'}>Voltar</Link>
        </React.Fragment>
    );
};

export class Home extends React.Component<CustomHomeProps>{

    render(){
        return (
            <AuthenticatedUserContext.Consumer>
                {(context: any) => {
                    return (
                        <BrowserRouter>
                            <h1>Olá {context.authenticatedUser.username}</h1>
                            <div>
                                <button onClick={this.props.logoutFunction} type="button">Logout</button>
                                <Link to={'/usuario'}>Go to usuario</Link>
                            </div>

                            <Route path="/" exact component={Dashboard}/>
                            <Route path="/usuario" component={Usuario}/>
                        </BrowserRouter>);
                    }
                }
            </AuthenticatedUserContext.Consumer>
        );
    }
}