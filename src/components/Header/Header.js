import React from "react";
import { Link } from "react-router-dom";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import { connect } from "react-redux";
import { storeUserInfo, logOut } from "../../action";



import IconButton from '@mui/material/IconButton';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';



class Header extends React.Component {
    state = {
        severity: "success",
        messageClass: "",
        anchorEl: null,
    }

    changePopmessage = (message) => {
        this.setState({ popMessage: message })
    }

    handleMenu = (event) => {
        this.setState({ anchorEl: event.currentTarget });
    };

    handleClose = () => {
        this.setState({ anchorEl: null });
    };
    handleLogout = () => {
        localStorage.removeItem("token");
        this.props.push("/login");
        this.props.logOut("LOGOUT_SUCCESSFULLY");
        // clear the application state;
    }

    componentDidUpdate(preProp, preState) {
        if (preProp.displayAlert !== this.props.displayAlert) {
            if (this.props.alertMessage === "LOGIN_SUCCESSFULLY" || this.props.alertMessage === "LOGOUT_SUCCESSFULLY") {
                this.setState({ severity: "success" })
            } else {
                this.setState({ severity: "error" });
            }
            this.setState({ messageClass: "show_message" });
            setTimeout(() => {
                this.setState({ messageClass: "" })
            }, 4000);
        }
    }
    render() {
        return (
            <header>
                <Box sx={{ flexGrow: 1 }}>
                    <AppBar position="static">
                        <Toolbar>
                            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                                Event List
                            </Typography>
                            {this.props.username && <div className='profile_area'>
                                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                                    {`Welcome, ${this.props.username}`}
                                </Typography>
                                <IconButton
                                    size="large"
                                    aria-label="account of current user"
                                    aria-controls="menu-appbar"
                                    aria-haspopup="true"
                                    onClick={this.handleMenu}
                                    color="inherit"
                                >
                                    <AccountCircle />
                                </IconButton>
                                <Menu
                                    id="menu-appbar"
                                    anchorEl={this.state.anchorEl}
                                    anchorOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    keepMounted
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    open={Boolean(this.state.anchorEl)}
                                    onClose={this.handleClose}
                                >
                                    <MenuItem onClick={() => {
                                        this.handleClose();
                                        this.handleLogout();
                                    }}>LOG OUT</MenuItem>
                                </Menu>
                            </div>}
                            {!this.props.username && <><Link className="tab_link" to="/login">LOGIN</Link>
                                <Link className="tab_link" to="/register">SIGNUP</Link></>}
                        </Toolbar>

                    </AppBar>
                </Box>
                <Alert className={"message" + this.state.messageClass} severity={this.state.severity}>{this.props.alertMessage}</Alert>
            </header>


        )
    }
}


export default connect((state) => {
    return {
        username: state.username,
        displayAlert: state.displayAlert,
        alertMessage: state.alertMessage,
    }
}, { storeUserInfo, logOut })(Header);