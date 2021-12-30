import { LOGIN_SUCCESSFULLY, LOGOUT_SUCCESSFULLY, ALERT_MESSAGE_SUCCESSFULLY, LOAD_EVENTS_SUCCESSFULLY, PROMPT_NEW_EVENT, REPLACE_EVENT_SUCCESSFULLY, EDIT_EVENT_SUCCESSFULLY } from "../action";

const initialState = {
    userId: 0,
    username: "",
    role: "",
    displayAlert: false,
    alertMessage: "",
    events: [],
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
        case LOAD_EVENTS_SUCCESSFULLY: {
            return {
                ...state,
                events: action.events.map(event => {
                    return {
                        ...event,
                        from: event.from.substring(0, event.from.length - 8),
                        to: event.to.substring(0, event.to.length - 8),
                    }
                })
            }
        }
        case PROMPT_NEW_EVENT: {
            return {
                ...state,
                events: [action.event, ...state.events]
            }
        }

        case REPLACE_EVENT_SUCCESSFULLY: {
            const tempEvents = state.events.map(event => {
                if (event._id === "new_event") {
                    return action.newEvent
                }
                return event
            })
            return {
                ...state,
                events: tempEvents
            }
        }
        case EDIT_EVENT_SUCCESSFULLY: {
            const tempEvents = state.events.map(event => {
                if (event._id === action.id) {
                    return action.data
                }
                return event;
            })
            return {
                ...state,
                events: tempEvents
            }
        }
        default:
            return state;
    }
}

export default reducer;
