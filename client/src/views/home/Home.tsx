import React, {useState} from "react";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import {AuthenticatedUserContext} from "../../App";
import {AppBar, IconButton, makeStyles, Toolbar, Typography} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import {Sidenav} from "./Sidenav";
import {CreditCardList} from "./registration/list/CreditCardList";
import {Dashboard} from "./Dashboard";
import {CreditCardForm} from "./registration/form/CreditCardForm";

const useStyles = makeStyles(theme => {
    return ({
        '@global': {
            body: {
                backgroundColor: theme.palette.grey["200"],
            }
        },
        container: {
            padding: "15px"
        }
    });
});

interface CustomHomeProps{
    logoutFunction: any
}

export function Home(props: Readonly<CustomHomeProps>) {
    const styles = useStyles(props);

    const [drawersOpen, setDrawersOpen] = useState({leftDrawer: false});

    const toggleDrawer = (drawer: string, open: boolean) => {
        setDrawersOpen({...drawersOpen, [drawer]: open});
    };

    return (
        <AuthenticatedUserContext.Consumer>
            {(context: any) => {
                return (
                    <>
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

                                <div className={styles.container}>
                                    <Switch>
                                        <Route path="/" exact component={Dashboard} />
                                        <Route path="/registration/card" exact component={CreditCardList} />
                                            <Route path="/registration/card/add" exact component={CreditCardForm} />
                                            <Route path="/registration/card/edit/:id" exact component={CreditCardForm} />
                                    </Switch>
                                </div>
                            </React.Fragment>
                        </BrowserRouter>
                    </>);
                }
            }
        </AuthenticatedUserContext.Consumer>
    );
}