import { LOGIN_SUCCESSFULLY, LOGOUT_SUCCESSFULLY, ALERT_MESSAGE_SUCCESSFULLY, SIGNUP_SUCCESSFULLY } from "../action";

const initialState = {
    userId: 0,
    username: "",
    role: "",
    displayAlert: false,
    alertMessage: "",
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_SUCCESSFULLY: {
            const { userId, role, username } = action.userInfo;
            return {
                ...state,
                userId,
                role,
                username,
                displayAlert: !state.displayAlert,
                alertMessage: action.message
            };
        }
        case LOGOUT_SUCCESSFULLY: {
            return {
                ...initialState,
                displayAlert: !state.displayAlert,
                alertMessage: action.message
            }
        }
        case ALERT_MESSAGE_SUCCESSFULLY: {
            return {
                ...state,
                displayAlert: !state.displayAlert,
                alertMessage: action.message
            }
        }
        default:
            return state;
    }
}

export default reducer;
