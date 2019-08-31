import React from "react";
import {Avatar, Button, Container, makeStyles, Paper, TextField, Typography} from "@material-ui/core";
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

interface CustomLoginProps {
    authenticationFunction: any;
}

const useStyles = makeStyles(theme => {
    return ({
        '@global': {
            body: {
                backgroundColor: theme.palette.common.white,
            },
        },
        paper: {
            display: 'flex',
            boxShadow: 'none',
            alignItems: 'center',
            flexDirection: 'column',
            marginTop: theme.spacing(8),
        },
        avatar: {
            margin: theme.spacing(1),
            backgroundColor: theme.palette.secondary.main,
        },
        form: {
            width: '100%', // Fix IE 11 issue.
            marginTop: theme.spacing(1),
        },
        submit: {
            margin: theme.spacing(3, 0, 2),
        }
    });
});

export default function LoginForm(props: Readonly<CustomLoginProps>){
    const styles = useStyles(props);

    return (
            <Container maxWidth="xs">
                <Paper className={styles.paper}>
                    <Avatar className={styles.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        WebBudget <Typography component="small">TS</Typography>
                    </Typography>
                    <form className={styles.form} noValidate onSubmit={props.authenticationFunction}>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Username"
                            type="text"
                            name="username"
                            autoFocus
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={styles.submit}>
                            Sign In
                        </Button>
                    </form>
                </Paper>
            </Container>
        );
}
