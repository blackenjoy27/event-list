export const LOGIN_SUCCESSFULLY = "LOGIN_SUCCESSFULLY";

export const storeUserInfo = (userInfo) => {
    return { type: LOGIN_SUCCESSFULLY, userInfo }
}