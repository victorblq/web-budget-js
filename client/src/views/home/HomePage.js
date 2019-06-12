import React, { useState } from 'react';
import { Redirect } from 'react-router';
import Axios from 'axios';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import clsx from 'clsx';

import Navbar from './components/Navbar';
import LeftDrawer from './components/LeftDrawer';
import BottomDrawer from './components/BottomDrawer';

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
    content: {
        flexGrow: 1,
        paddingLeft: theme.spacing(11),
        paddingTop: theme.spacing(8)
    },
    contentShift: {
        marginLeft: drawerWidth,
        paddingLeft: theme.spacing(3),
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }
}));

export function HomePage() {
    const classes = useStyles();
    const theme = useTheme();
    
    const [bottomDrawerOpen, setBottomDrawerOpen] = useState(false);
    const [leftDrawerOpen, setLeftDrawerOpen] = React.useState(false);
    const [authenticated, setAuthenticated] = useState(true);

    function toggleBottomDrawer(){
        setBottomDrawerOpen(!bottomDrawerOpen);
    }

    function toggleLeftDrawer() {
        setLeftDrawerOpen(!leftDrawerOpen);
    }

    function logout(){
        Axios.get('/logout')
        .then((result) => {
            setAuthenticated(false);
        })
        .catch((error) => console.error(error));
    }

    if (!authenticated) {
        return <Redirect to="login" />
    } else {
        return (
            <ThemeProvider theme={theme}>
                <Navbar 
                    drawerWidth={drawerWidth}
                    logoutCallback={logout} 
                    leftDrawerOpen={leftDrawerOpen}
                    toggleLeftDrawer={toggleLeftDrawer}
                    toggleBottomDrawer={toggleBottomDrawer}/>

                <LeftDrawer
                    drawerWidth={drawerWidth}
                    leftDrawerOpen={leftDrawerOpen}
                    toggleLeftDrawer={toggleLeftDrawer}/>

                <main className={clsx(classes.content, {
                    [classes.contentShift]: leftDrawerOpen,
                })}>
                    <h2>CONTENT</h2>
                </main>

                <BottomDrawer
                    bottomDrawerOpen={bottomDrawerOpen}
                    toggleBottomDrawer={toggleBottomDrawer}/>
            </ThemeProvider>
        );
    }
}