import React from "react";

interface CustomLoginProps {
    authenticationFunction: any;
}

export class Login extends React.Component<CustomLoginProps> {

    render(){
        return (
            <form onSubmit={this.props.authenticationFunction}>
            <label>Username</label>
            <input type={"text"} name={"username"} />

            <br/>

            <label>Password</label>
            <input type={"password"} name={"password"} />

            <br/>
            <button type="submit">Login</button>
            </form>
        )
    };
}


