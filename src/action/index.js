import { AxiosWithAuth } from "../utils/AxiosWithAuth";

export const LOGIN_SUCCESSFULLY = "LOGIN_SUCCESSFULLY";
export const LOGOUT_SUCCESSFULLY = "LOGOUT_SUCCESSFULLY";
export const SIGNUP_SUCCESSFULLY = "SIGNUP_SUCCESSFULLY";
export const ALERT_MESSAGE_SUCCESSFULLY = "ALERT_MESSAGE_SUCCESSFULLY";
export const LOAD_EVENTS_SUCCESSFULLY = "LOAD_EVENTS_SUCCESSFULLY";
export const PROMPT_NEW_EVENT = "PROMPT_NEW_EVENT";
export const REPLACE_EVENT_SUCCESSFULLY = "REPLACE_EVENT_SUCCESSFULLY";
export const EDIT_EVENT_SUCCESSFULLY = "EDIT_EVENT_SUCCESSFULLY";


export const storeUserInfo = (userInfo) => {
    return { type: LOGIN_SUCCESSFULLY, userInfo, message: LOGIN_SUCCESSFULLY }
}

export const logOut = (message) => {
    return { type: LOGOUT_SUCCESSFULLY, message }
}


export const alertMessage = (message) => {
    return { type: ALERT_MESSAGE_SUCCESSFULLY, message }
}

export const loadEvents = () => {
    return (dispatch) => {
        AxiosWithAuth().get("/api/event")
            .then(({ data }) => {
                const { result: events } = data;
                dispatch(setEvents(events))
            })
            .catch(error => {
                dispatch(alertMessage("Error: Couldn't get events from the server"));
            })
    }
}

export const setEvents = (events) => {
    return { type: LOAD_EVENTS_SUCCESSFULLY, events }
}

export const promptNewEvent = () => {
    return { type: PROMPT_NEW_EVENT, event: { _id: "new_event" } }
}

export const addNewEvent = (newEvent) => {
    return (dispatch) => {
        AxiosWithAuth().post("/api/event", newEvent)
            .then(({ data: obj }) => {
                const { id, from, to, ...rest } = obj.data;
                const newEvent = {
                    _id: id,
                    from: from.substring(0, from.length - 8),
                    to: to.substring(0, to.length - 8),
                    ...rest
                }
                dispatch({ type: REPLACE_EVENT_SUCCESSFULLY, newEvent })
            })
    }
}

export const editEvent = (id, event) => {
    return (dispatch) => {
        AxiosWithAuth().put(`/api/event/${id}`, event)
            .then(data => {
                dispatch(loadEvents());
            })
    }
}

export const deleteEvent = (id) => {
    return (dispatch) => {
        AxiosWithAuth().delete(`/api/event/${id}`)
            .then(data => {
                dispatch(loadEvents())
                dispatch(alertMessage("Deleted Event Successfully"))
            })
    }
}