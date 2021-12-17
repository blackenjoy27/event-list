import { LOGIN_SUCCESSFULLY } from "../action";

const initialState = {
    userId: 0,
    username: "",
    role: "",
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_SUCCESSFULLY: {
            const { userId, role, username } = action.userInfo;
            return {
                ...state,
                userId,
                role,
                username
            };
        }
        default:
            return state;
    }
}

export default reducer;
