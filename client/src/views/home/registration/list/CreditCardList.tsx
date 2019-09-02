import React, {useEffect, useState} from "react";
import Axios, {AxiosResponse} from "axios";
import {Grid, makeStyles, Paper, Table, TableBody, TableCell, TableHead, TableRow} from "@material-ui/core";
import {Cancel, CheckCircle} from "@material-ui/icons";

const useStyles = makeStyles(theme => {
    return (
        {
            container: {
                padding: "15px"
            },
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
        <div className={styles.container}>
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
                                <TableCell align="left"></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Paper>
        </div>
    );
}