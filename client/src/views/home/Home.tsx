import React, {useState} from "react";
import {BrowserRouter, Link} from "react-router-dom";
import {AuthenticatedUserContext} from "../../App";
import {AppBar, IconButton, Toolbar, Typography} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import {Sidenav} from "./Sidenav";

interface CustomHomeProps{
    logoutFunction: any
}

export function Home(props: Readonly<CustomHomeProps>) {

    const [drawersOpen, setDrawersOpen] = useState({leftDrawer: false});

    const toggleDrawer = (drawer: string, open: boolean) => {
        setDrawersOpen({...drawersOpen, [drawer]: open});
    };

    return (
        <AuthenticatedUserContext.Consumer>
            {(context: any) => {
                return (
                    <React.Fragment>
                        <Sidenav drawersOpen={drawersOpen}
                                 toggleDrawer={toggleDrawer}
                                 authenticatedUser={context.authenticatedUser}/>

                        <AppBar position="static">
                            <Toolbar>
                                <IconButton edge="start"
                                            color="inherit"
                                            aria-label="menu"
                                            onClick={() => toggleDrawer('leftDrawer', true)}>
                                    <MenuIcon />
                                </IconButton>

                                <Typography variant="h6">
                                    WebBudget
                                </Typography>
                            </Toolbar>
                        </AppBar>

                        <BrowserRouter>
                            <h1>Olá {context.authenticatedUser.username}</h1>
                            <div>
                                <button onClick={props.logoutFunction} type="button">Logout</button>
                                <Link to={'/usuario'}>Go to usuario</Link>
                            </div>
                            {/*<Route path="/" exact component={Dashboard}/>*/}
                            {/*<Route path="/usuario" component={Usuario}/>*/}
                        </BrowserRouter>
                    </React.Fragment>);
                }
            }
        </AuthenticatedUserContext.Consumer>
    );
}