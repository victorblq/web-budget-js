import React, {useState} from "react";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import {AuthenticatedUserContext} from "../../App";
import {AppBar, IconButton, Toolbar, Typography} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import {Sidenav} from "./Sidenav";
import {CreditCardList} from "./registration/list/CreditCardList";
import {Dashboard} from "./Dashboard";

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
                        <BrowserRouter>
                            <React.Fragment>
                                <Sidenav drawersOpen={drawersOpen}
                                         toggleDrawer={toggleDrawer}
                                         logoutFunction={props.logoutFunction}
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

                                <Switch>
                                    <Route path="/" exact component={Dashboard} />
                                    <Route path="/registration/card" component={CreditCardList} />
                                </Switch>
                            </React.Fragment>
                        </BrowserRouter>
                    </React.Fragment>);
                }
            }
        </AuthenticatedUserContext.Consumer>
    );
}