import React from "react";
import { withFormFeature } from "../../hoc/withFormFeature";
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import axios from "axios";

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

class Signup extends React.Component {
    handleSubmit = (e) => {
        e.preventDefault();
        if (this.props.userInfo.password !== this.props.userInfo.confirmPassword) {
            alert("password has to match");
        } else {
            const { username, password } = this.props.userInfo;
            axios.post("http://localhost:4000/api/user/signup", { username, password })
                .then(({ data }) => {
                    console.log("Sign up successfully, data:", data);
                    this.props.resetState();
                    this.props.push("/login");
                })
                .catch(error => {
                    alert("username already exists")
                })
        }

    }
    render() {
        console.log(this.props);
        return (
            <div>
                {this.props.children}
                <main className="main">
                    <div className="container">
                        <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="lock" className="svg svg-inline--fa fa-lock fa-w-14" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M400 224h-24v-72C376 68.2 307.8 0 224 0S72 68.2 72 152v72H48c-26.5 0-48 21.5-48 48v192c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V272c0-26.5-21.5-48-48-48zm-104 0H152v-72c0-39.7 32.3-72 72-72s72 32.3 72 72v72z"></path></svg>
                    </div>
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
}

const Container = withFormFeature(Signup);
export default Container;