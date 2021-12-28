import React from "react";
import { withFormFeature } from "../../hoc/withFormFeature";
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import axios from "axios";
import { storeUserInfo } from "../../action";



const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

class Login extends React.Component {
    handleSubmit = (e) => {
        e.preventDefault();
        const { username, password } = this.props.userInfo;
        axios.post("http://localhost:4000/api/user/login", { username, password })
            .then(({ data }) => {
                const userInfo = data.data;
                const { userId, role, username, token: mu } = userInfo;
                localStorage.setItem("token", mu);
                //store copy of the token in local storage
                console.log("login successfully, data:", data);

                this.props.storeUserInfo({ userId, role, username });
                this.props.resetState();
                this.props.push("/userpage");
            })
            .catch(error => {
                alert("username or password is incorrect")
            })
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
}

const Container = withFormFeature(Login);
export default Container;