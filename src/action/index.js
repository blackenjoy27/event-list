export const LOGIN_SUCCESSFULLY = "LOGIN_SUCCESSFULLY";
export const LOGOUT_SUCCESSFULLY = "LOGOUT_SUCCESSFULLY";
export const SIGNUP_SUCCESSFULLY = "SIGNUP_SUCCESSFULLY";
export const ALERT_MESSAGE_SUCCESSFULLY = "ALERT_MESSAGE_SUCCESSFULLY";

export const storeUserInfo = (userInfo) => {
    return { type: LOGIN_SUCCESSFULLY, userInfo, message: LOGIN_SUCCESSFULLY }
}

export const logOut = (message) => {
    return { type: LOGOUT_SUCCESSFULLY, message }
}


export const alertMessage = (message) => {
    return { type: ALERT_MESSAGE_SUCCESSFULLY, message }
}