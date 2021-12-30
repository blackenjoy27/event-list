import React from "react";
import { withFormFeature } from "../../hoc/withFormFeature";
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import axios from "axios";
import { connect } from "react-redux";

import { storeUserInfo, alertMessage } from "../../action";



const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

const Login = connect()(class Component extends React.Component {
    handleSubmit = (e) => {
        e.preventDefault();
        const { username, password } = this.props.userInfo;
        axios.post("http://localhost:4000/api/user/login", { username, password })
            .then(({ data }) => {
                const userInfo = data.data;
                const { userId, role, username, token } = userInfo;
                localStorage.setItem("userInfo", JSON.stringify({ userId, role, username }));
                localStorage.setItem("token", token);
                //store copy of the token in local storage
                console.log("login successfully, data:", data);
                this.props.dispatch(storeUserInfo({ userId, role, username }));
                this.props.resetState();
                this.props.push("/userpage");
            })
            .catch(error => {
                this.props.dispatch(alertMessage("Username or password is incorrect"));
            })
    }
    render() {
        return (
            <div>
                <main className="main">
                    {this.props.children}
                    <h1 className="h1">Login</h1>
                    <form onSubmit={this.handleSubmit}>
                        <TextField
                            id="filled-helperText"
                            label="Username"
                            className="text_field"
                            variant="filled"
                            name="username"
                            value={this.props.userInfo.username}
                            onChange={this.props.handleEditing}
                            style={{ "marginBottom": "1rem" }}
                        />
                        <TextField
                            id="filled-helperText"
                            label="Password"
                            type="password"
                            className="text_field"
                            name="password"
                            value={this.props.userInfo.password}
                            onChange={this.props.handleEditing}
                            style={{ "marginBottom": "1rem" }}
                            variant="filled"
                        />
                        <label className="label">
                            <Checkbox {...label} />
                            Remember me
                        </label>
                        <Button type="submit" variant="contained">SIGN IN</Button>
                    </form>
                </main>
            </div>


        )
    }
})

const Container = withFormFeature(Login);
export default Container;