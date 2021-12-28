import React from "react";
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = (props) => {
    const token = localStorage.getItem("token");
    if (token) {
        return <Route {...props} />
    }
    return <Redirect to="/login" />
}

export default PrivateRoute;