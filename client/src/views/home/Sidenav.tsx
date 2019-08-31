import {
    Card,
    Collapse,
    Divider,
    Drawer,
    Grid,
    List,
    ListItem,
    ListItemIcon,
    ListItemText, makeStyles,
    Typography
} from "@material-ui/core";
import Gravatar from "react-gravatar";
import {
    AccountBalanceWallet,
    Class,
    Contacts,
    CreditCard,
    DateRange,
    DirectionsCar,
    EventAvailable,
    ExpandLess,
    ExpandMore,
    GpsFixed, Group,
    LocalAtm,
    LocalGasStation,
    LocalOffer,
    MonetizationOn, PersonAdd,
    Settings,
    SwapHoriz,
    Today,
    VerticalSplit,
    ViewList
} from "@material-ui/icons";
import React, {useState} from "react";

const useStyles = makeStyles(theme => {
    return (
        {
            //User avatar
            leftDrawerUserCard: {
                width: 250,
                boxShadow: "none",
                borderRadius: 0,
                paddingBottom: 10,
                backgroundColor: "#2196f3",
            },
            leftDrawerUserAvatarGridItem: {
                paddingTop: 25
            },
            leftDrawerUserAvatarTextGridItem: {
                textAlign: "center"
            },
            leftDrawerUserAvatarText: {
                color: "white"
            },
            avatar: {
                borderRadius: "50%"
            },

            //Menu Itens
            leftDrawerMenu: {
                width: 250
            },
            leftDrawerNestedMenu:{
                backgroundColor: theme.palette.grey["100"]
            },
            leftDrawerNestedMenuItem: {
                paddingLeft: 30,
            }
        }
    );
});

interface CustomSidenavProps{
    drawersOpen: any,
    toggleDrawer: any,
    authenticatedUser: any
}

export function Sidenav(props: Readonly<CustomSidenavProps>){
    const styles = useStyles(props);

    const [menuOpen, setMenuOpen] = useState(null);
    const [subMenuOpen, setSubMenuOpen] = useState(null);

    const openMenu = (menu: string) => {
        setSubMenuOpen(null);

        if(menuOpen === menu){
            setMenuOpen(null);
        }else{
            setMenuOpen(menu);
        }
    };

    const openSubMenu = (subMenu: string) => {
        if(subMenuOpen === subMenu){
            setSubMenuOpen(null);
        }else{
            setSubMenuOpen(subMenu);
        }
    };

    return (
        <Drawer open={props.drawersOpen.leftDrawer}
                onClose={() => props.toggleDrawer('leftDrawer', false)}>
            <Grid
                container
                direction="column"
                justify="flex-start"
                alignItems="center">
                <Grid item>
                    <Card className={styles.leftDrawerUserCard}>
                        <Grid container
                              direction="column"
                              justify="flex-start"
                              alignItems="center">
                            <Grid item className={styles.leftDrawerUserAvatarGridItem}>
                                <Gravatar size={60}
                                          className={styles.avatar}
                                          email={props.authenticatedUser.email || Math.random().toString()}/>
                            </Grid>
                            <Grid item className={styles.leftDrawerUserAvatarTextGridItem}>
                                <Typography variant="h5"
                                            className={styles.leftDrawerUserAvatarText}>
                                    {props.authenticatedUser.name}
                                </Typography>
                            </Grid>
                            <Grid item className={styles.leftDrawerUserAvatarTextGridItem}>
                                <Typography variant="subtitle1"
                                            className={styles.leftDrawerUserAvatarText}>
                                    {props.authenticatedUser.group.name}
                                </Typography>
                            </Grid>
                        </Grid>
                    </Card>

                    <List className={styles.leftDrawerMenu}>
                        {/*Registration*/}
                        <ListItem button
                                  key={"registration"}
                                  onClick={() => openMenu("registration")}>
                            <ListItemIcon>
                                <ViewList />
                            </ListItemIcon>

                            <ListItemText primary="Registration" />
                            {menuOpen === "registration" ? <ExpandLess /> : <ExpandMore />}
                        </ListItem>
                        <Collapse timeout="auto"
                                  in={menuOpen === "registration"}
                                  className={styles.leftDrawerNestedMenu}>
                            <List component="div" disablePadding>
                                <ListItem button className={styles.leftDrawerNestedMenuItem}>
                                    <ListItemIcon>
                                        <CreditCard />
                                    </ListItemIcon>
                                    <ListItemText primary="Credit Card" />
                                </ListItem>
                                <ListItem button className={styles.leftDrawerNestedMenuItem}>
                                    <ListItemIcon>
                                        <DirectionsCar />
                                    </ListItemIcon>
                                    <ListItemText primary="Car" />
                                </ListItem>

                                <ListItem button className={styles.leftDrawerNestedMenuItem}>
                                    <ListItemIcon>
                                        <Contacts />
                                    </ListItemIcon>
                                    <ListItemText primary="Contacts" />
                                </ListItem>
                                <ListItem button className={styles.leftDrawerNestedMenuItem}>
                                    <ListItemIcon>
                                        <AccountBalanceWallet />
                                    </ListItemIcon>
                                    <ListItemText primary="Wallet" />
                                </ListItem>
                                <ListItem button className={styles.leftDrawerNestedMenuItem}>
                                    <ListItemIcon>
                                        <LocalOffer />
                                    </ListItemIcon>
                                    <ListItemText primary="Center of cost" />
                                </ListItem>
                                <ListItem button className={styles.leftDrawerNestedMenuItem}>
                                    <ListItemIcon>
                                        <DateRange />
                                    </ListItemIcon>
                                    <ListItemText primary="Financial period" />
                                </ListItem>
                                <ListItem button className={styles.leftDrawerNestedMenuItem}>
                                    <ListItemIcon>
                                        <Class />
                                    </ListItemIcon>
                                    <ListItemText primary="Movimentation classes" />
                                </ListItem>
                            </List>
                        </Collapse>

                        {/*Daily*/}
                        <ListItem button
                                  key={"daily"}
                                  onClick={() => openMenu("daily")}>
                            <ListItemIcon>
                                <Today />
                            </ListItemIcon>

                            <ListItemText primary="Daily" />
                            {menuOpen === "daily" ? <ExpandLess /> : <ExpandMore />}
                        </ListItem>
                        <Collapse timeout="auto"
                                  in={menuOpen === "daily"}
                                  className={styles.leftDrawerNestedMenu}>
                            <List component="div" disablePadding>
                                <ListItem button className={styles.leftDrawerNestedMenuItem}>
                                    <ListItemIcon>
                                        <LocalGasStation />
                                    </ListItemIcon>
                                    <ListItemText primary="Refuel" />
                                </ListItem>
                            </List>
                        </Collapse>

                        {/*Financial*/}
                        <ListItem button
                                  key={"financial"}
                                  onClick={() => openMenu("financial")}>
                            <ListItemIcon>
                                <MonetizationOn />
                            </ListItemIcon>

                            <ListItemText primary="Financial" />
                            {menuOpen === "financial" ? <ExpandLess /> : <ExpandMore />}
                        </ListItem>
                        <Collapse timeout="auto"
                                  in={menuOpen === "financial"}
                                  className={styles.leftDrawerNestedMenu}>
                            <List component="div" disablePadding>
                                <ListItem button
                                          className={styles.leftDrawerNestedMenuItem}
                                          onClick={() => openSubMenu("financial.movements")}>
                                    <ListItemIcon>
                                        <LocalAtm />
                                    </ListItemIcon>
                                    <ListItemText primary="Movements" />

                                    {subMenuOpen === "financial.movements" ?
                                        <ExpandLess/> : <ExpandMore />}
                                </ListItem>
                                <Collapse timeout="auto"
                                          in={subMenuOpen === "financial.movements"}
                                          className={styles.leftDrawerNestedMenu}>
                                    <List component="div" disablePadding>
                                        <ListItem button className={styles.leftDrawerNestedMenuItem}>
                                            <ListItemIcon>
                                                <GpsFixed />
                                            </ListItemIcon>
                                            <ListItemText primary="Fixed" />
                                        </ListItem>
                                        <ListItem button className={styles.leftDrawerNestedMenuItem}>
                                            <ListItemIcon>
                                                <EventAvailable />
                                            </ListItemIcon>
                                            <ListItemText primary="Period" />
                                        </ListItem>
                                    </List>
                                </Collapse>

                                <Divider />

                                <ListItem button
                                          className={styles.leftDrawerNestedMenuItem}>
                                    <ListItemIcon>
                                        <VerticalSplit />
                                    </ListItemIcon>
                                    <ListItemText primary="Closings" />
                                </ListItem>
                                <ListItem button
                                          className={styles.leftDrawerNestedMenuItem}>
                                    <ListItemIcon>
                                        <SwapHoriz />
                                    </ListItemIcon>
                                    <ListItemText primary="Transfers" />
                                </ListItem>
                                <ListItem button
                                          className={styles.leftDrawerNestedMenuItem}>
                                    <ListItemIcon>
                                        <CreditCard />
                                    </ListItemIcon>
                                    <ListItemText primary="Invoices" />
                                </ListItem>
                            </List>
                        </Collapse>

                        {/*Configuration*/}
                        <ListItem button
                                  key={"configuration"}
                                  onClick={() => openMenu("configuration")}>
                            <ListItemIcon>
                                <Settings />
                            </ListItemIcon>

                            <ListItemText primary="Configuration" />
                            {menuOpen === "configuration" ? <ExpandLess /> : <ExpandMore />}
                        </ListItem>
                        <Collapse timeout="auto"
                                  in={menuOpen === "configuration"}
                                  className={styles.leftDrawerNestedMenu}>
                            <List component="div" disablePadding>
                                <ListItem button
                                          className={styles.leftDrawerNestedMenuItem}>
                                    <ListItemIcon>
                                        <Group />
                                    </ListItemIcon>
                                    <ListItemText primary="Groups" />
                                </ListItem>
                                <ListItem button
                                          className={styles.leftDrawerNestedMenuItem}>
                                    <ListItemIcon>
                                        <PersonAdd />
                                    </ListItemIcon>
                                    <ListItemText primary="Users" />
                                </ListItem>
                                <ListItem button
                                          className={styles.leftDrawerNestedMenuItem}>
                                    <ListItemIcon>
                                        <Settings />
                                    </ListItemIcon>
                                    <ListItemText primary="Configuration" />
                                </ListItem>
                            </List>
                        </Collapse>
                    </List>
                </Grid>
            </Grid>
        </Drawer>
    );
}