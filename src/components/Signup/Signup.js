import React from "react";
import { withFormFeature } from "../../hoc/withFormFeature";
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import axios from "axios";
import { connect } from "react-redux";

import { storeUserInfo, alertMessage } from "../../action";

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

const Signup = connect()(class Component extends React.Component {
    handleSubmit = (e) => {
        e.preventDefault();
        if (this.props.userInfo.password !== this.props.userInfo.confirmPassword) {
            alert("password has to match");
        } else {
            const { username, password } = this.props.userInfo;
            axios.post("http://localhost:4000/api/user/signup", { username, password })
                .then(({ data }) => {
                    console.log("Sign up successfully, data:", data);
                    axios.post("http://localhost:4000/api/user/login", { username, password })
                        .then(({ data }) => {
                            const userInfo = data.data;
                            const { userId, role, username, token } = userInfo;
                            localStorage.setItem("token", token);
                            //store copy of the token in local storage
                            console.log("login successfully, data:", data);
                            this.props.dispatch(storeUserInfo({ userId, role, username }));
                            this.props.resetState();
                            this.props.push("/userpage");
                        })
                        .catch(error => {
                            this.props.dispatch(alertMessage("Newly Created User Wasn't Able To Login"));
                        })
                })
                .catch(error => {
                    this.props.dispatch(alertMessage("Username has already exists, try again with another username"));
                })
        }

    }
    render() {
        return (
            <div>
                <main className="main">
                    {this.props.children}
                    <h1 className="h1">Sign Up</h1>
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
                        <TextField
                            id="filled-helperText"
                            label="Confirm Password"
                            type="password"
                            className="text_field"
                            name="confirmPassword"
                            value={this.props.userInfo.confirmPassword}
                            onChange={this.props.handleEditing}
                            style={{ "marginBottom": "1rem" }}
                            variant="filled"
                        />
                        <label className="label">
                            <Checkbox {...label} />
                            Remember me
                        </label>
                        <Button type="submit" variant="contained">SIGN UP</Button>
                    </form>
                </main>
            </div>


        )
    }
})

const Container = withFormFeature(Signup);
export default Container;