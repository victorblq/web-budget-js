import React from 'react';
import Axios from 'axios';
import { Redirect } from 'react-router';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Grid, Box, Typography, TextField, Button } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
    },
    dense: {
        marginTop: theme.spacing(2),
    },
    menu: {
        width: 200,
    },
}));

export function LoginForm() {
    const classes = useStyles();
    const [values, setValues] = React.useState({
        formFields:{
            username: "",
            password: ""
        },
        authenticated: false
    });

    const handleInputChange = field => event => {
        const { formFields } = values;
        formFields[field] = event.target.value;

        setValues({...values, formFields});
    }

    const onSubmit = (event) => {
        event.preventDefault();

        Axios.post('/authenticate', values.formFields)
            .then((response) => {
                setValues({...values, authenticated: true});
            })
            .catch((error) => {
                console.error(error);
                alert(error.response.data);
            });
    }

    if(values.authenticated){
        return (<Redirect to="/" />);
    }else{
        return (
            <Box height="100%">
                <Grid container
                    style={{ height: '100%' }}
                    direction="column"
                    justify="center"
                    alignItems="center">
                    <Grid item style={{width: '30%'}}>
                        <Paper style={{ padding: '15px', width: '100%' }}>
                            <Grid container
                                direction="column"
                                alignItems="center">
                                <Typography variant="h3" component="h2" color="textPrimary">
                                    WebBudget
                                </Typography>
                                <form 
                                    noValidate 
                                    className={classes.container} 
                                    autoComplete="off" 
                                    onSubmit={(e) => onSubmit(e)} style={{width: '100%'}}>
                                    <Grid item container direction="column">
                                        <TextField
                                            label="Username"
                                            className={classes.textField}
                                            onChange={handleInputChange('username')}
                                            type="text"
                                            name="username"
                                            margin="normal"
                                            variant="outlined"/>
    
                                        <TextField
                                            label="Password"
                                            className={classes.textField}
                                            onChange={handleInputChange('password')}
                                            type="password"
                                            name="password"
                                            margin="normal"
                                            variant="outlined"/>
    
                                        <Button type="submit" variant="contained" color="primary">
                                            Login
                                        </Button>
                                    </Grid>
                                </form>
                            </Grid>
                        </Paper>
                    </Grid>
                </Grid>
            </Box>
        );
    }
}