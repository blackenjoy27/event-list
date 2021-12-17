import React from "react";
import Header from "./Header";
const Userpage = (props) => {
    const { push } = props;
    return (
        <Header push={push} />
    )
}

export default Userpage;