import React from 'react';
import './App.css';
import LoginForm from "./views/login/LoginForm";
import {Cookies, withCookies} from "react-cookie";
import {instanceOf} from 'prop-types';
import Axios, {AxiosResponse} from "axios";
import {Home} from "./views/home/Home";
import {ThemeProvider} from '@material-ui/styles';
import {createMuiTheme} from "@material-ui/core";
import {blue, grey, red} from "@material-ui/core/colors";
import {withSnackbar} from "notistack";

export const AuthenticatedUserContext = React.createContext<any | null>(null);

export class App extends React.Component<any, {isAuthenticated: boolean, authenticatedUser: any}> {
    private theme = createMuiTheme({
        palette: {
            primary: blue,
            secondary: red,
            grey: grey
        }
    });

    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    };

    constructor(props:any){
        super(props);

        this.state = {
            isAuthenticated: false,
            authenticatedUser: null
        };
    }

    componentDidMount(): void {
        this.setState({
            isAuthenticated: this.props.cookies.cookies.jwtoken != null,
            authenticatedUser: JSON.parse(sessionStorage.getItem("authenticatedUser") || "{}")
        });
    }

    authenticate = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const authenticationData = new FormData(event.currentTarget);
        const jsonAuthenticationData: any = {};

        for (const [name, value] of authenticationData.entries()) {
            jsonAuthenticationData[name] = value;
        }

        if(jsonAuthenticationData.username === "" || jsonAuthenticationData.password === ""){
            this.props.enqueueSnackbar("Você deve preencher o usuario e a senha", {
                variant: "error",
                persist: false,
                anchorOrigin: {
                    vertical: 'bottom',
                    horizontal: 'center',
                }
            });

            return;
        }

        Axios.post('/authenticate', jsonAuthenticationData)
            .then((response: AxiosResponse) => {
                this.setState({
                    authenticatedUser: response.data,
                    isAuthenticated: true
                });

                sessionStorage.setItem("authenticatedUser", JSON.stringify(response.data));
            })
            .catch((err) => console.error(err));
    };

    logout = (event: React.MouseEvent) => {
        Axios.get('/logout')
            .then(() => {
                this.setState({
                    ...this.state,
                    isAuthenticated: false
                });
            })
            .catch((err) => console.error(err));
    };

    render(){
        return (
            <React.Fragment>
                <ThemeProvider theme={this.theme}>
                        {this.state.isAuthenticated ?
                            <AuthenticatedUserContext.Provider value={this.state}>
                                <Home logoutFunction={this.logout}/>
                            </AuthenticatedUserContext.Provider>:
                            <LoginForm authenticationFunction={this.authenticate} />
                        }
                </ThemeProvider>
            </React.Fragment>
        );
    };
};

export default withCookies(withSnackbar(App));