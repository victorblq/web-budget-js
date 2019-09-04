import React, {useEffect, useState} from "react";
import Axios, {AxiosResponse} from "axios";
import {Button, Grid, makeStyles, Paper, Table, TableBody, TableCell, TableHead, TableRow} from "@material-ui/core";
import {Cancel, CheckCircle} from "@material-ui/icons";
import {Header} from "../../components/Header";
import {Link} from "react-router-dom";

const useStyles = makeStyles(theme => {
    return (
        {
            activeIcon: {
                color: theme.customPalette.success["500"]
            }
        }
    );
});

interface CustomCreditCardListProps {

}

export function CreditCardList(props: Readonly<CustomCreditCardListProps>) {
    const styles = useStyles(props);
    const [creditCardList, setCreditCardList] = useState([]);
    // const [creditCardFilter, setCreditCardFilter] = useState("lagalaga");

    useEffect(() => {
        Axios.get("/registration/card", {params: {"filter": "5234"}})
            .then((creditCardsResponse: AxiosResponse) => {
                setCreditCardList(creditCardsResponse.data)
            })
            .catch((err: any) => console.error(err));
    }, []);

    return (
        <>
            <Header title="Credit Cards" subtitle="Cards management">
                <div>
                    <Button variant="contained" color="primary" component={Link} to="card/add">
                        Add
                    </Button>
                </div>
            </Header>

            <Paper>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">Name</TableCell>
                            <TableCell align="left">Owner</TableCell>
                            <TableCell align="left">Type</TableCell>
                            <TableCell align="center">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {creditCardList.map(creditCard => (
                            <TableRow key={creditCard.id}>
                                <TableCell align="left">
                                    <Grid container
                                          direction="row"
                                          justify="center"
                                          alignItems="center">
                                        <Grid item>
                                            {creditCard.active ?
                                                <CheckCircle className={styles.activeIcon}/> : <Cancel />}
                                        </Grid>
                                        <Grid item>
                                            {creditCard.name}
                                        </Grid>
                                    </Grid>
                                </TableCell>
                                <TableCell align="left">{creditCard.owner}</TableCell>
                                <TableCell align="left">{creditCard.cardType}</TableCell>
                                <TableCell align="left">
                                    <Button variant="contained"
                                            color="primary"
                                            component={Link}
                                            to={`card/edit/${creditCard.id}`}>
                                        Edit
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Paper>
        </>
    );
}