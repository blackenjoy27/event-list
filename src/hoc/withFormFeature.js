import React from "react";
import { Link } from "react-router-dom";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { connect } from "react-redux";
import { storeUserInfo } from "../action";


export const withFormFeature = (WrapperComponent) => connect(() => { }, { storeUserInfo })(
    class Component extends React.Component {
        state = {
            username: "",
            password: "",
            confirmPassword: ""
        }
        handleEditing = (e) => {
            this.setState({ [e.target.name]: e.target.value })
        }
        resetState = () => {
            this.setState({
                username: "",
                password: "",
                confirmPassword: ""
            })
        }
        render() {
            return (
                <WrapperComponent
                    userInfo={this.state}
                    handleEditing={this.handleEditing}
                    resetState={this.resetState}
                    push={this.props.push}
                    storeUserInfo={this.props.storeUserInfo}>
                    <header>
                        <Box sx={{ flexGrow: 1 }}>
                            <AppBar position="static">
                                <Toolbar>
                                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                                        Event List
                                    </Typography>
                                    <Link className="tab_link" to="/login">LOGIN</Link>
                                    <Link className="tab_link" to="/register">SIGNUP</Link>
                                </Toolbar>
                            </AppBar>
                        </Box>
                    </header>
                </WrapperComponent>
            )
        }
    })
