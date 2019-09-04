import React from "react";
import {Grid, makeStyles, Paper, Typography} from "@material-ui/core";

const useStyles = makeStyles(theme => {
    return (
        {
            header: {
                padding: "10px 24px 10px 24px",
                marginBottom: "10px"
            },
            title: {
                color: theme.palette.grey["800"],
                spacing: theme.spacing(4)
            }
        }
    );
});

interface CustomHeaderProps {
    children: any,
    title: string,
    subtitle?: string | null
}

export function Header(props: Readonly<CustomHeaderProps>){
    const styles = useStyles(props);

    return (
        <>
            <Paper className={styles.header}>
                <Grid container
                      direction="row"
                      alignItems="center"
                      justify="space-between">
                    <Grid item>
                        <Typography variant="h4" className={styles.title}>{props.title}</Typography>
                        <Typography variant="caption">{props.subtitle}</Typography>
                    </Grid>

                    <Grid item>
                        {props.children}
                    </Grid>
                </Grid>
            </Paper>
        </>
    );
}