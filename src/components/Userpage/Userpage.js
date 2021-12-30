import React from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { connect } from "react-redux";


import { loadEvents, promptNewEvent, addNewEvent, editEvent, deleteEvent, storeUserInfo } from "../../action";

function createData(from, to, content, isCompleted) {
    return { from, to, content, isCompleted };
}


function Userpage(props) {
    const [newEvent, setNewEvent] = React.useState({
        from: "",
        to: "",
        content: "",
        isCompleted: false,
    })

    const [creatingNewEvent, setCreatingNewEvent] = React.useState(false);

    const [editEventId, setEditEventId] = React.useState(null)
    const [event, setEvent] = React.useState(null)


    const { username, events, loadEvents, promptNewEvent, addNewEvent, editEvent, deleteEvent, storeUserInfo } = props;

    React.useEffect(() => {
        loadEvents();
        if (!username) {
            const userInfo = JSON.parse(localStorage.getItem("userInfo"));
            const { userId, role, username } = userInfo;
            storeUserInfo({ userId, role, username });
        }

    }, [])

    React.useEffect(() => {
        if (editEventId) {
            console.log("Hello World");

        }
    }, [editEventId])

    React.useEffect(() => {
        if (!creatingNewEvent) {
            console.log("Reseting new event");
            setNewEvent({
                from: "",
                to: "",
                content: "",
                isCompleted: false,
            })
        }
    }, [creatingNewEvent])

    const getEditEvent = (event) => {
        setEvent(event);
        setEditEventId(event._id);
    }

    const editSave = () => {
        editEvent(editEventId, event);
        setEditEventId(null);
        setEvent(null);
    }
    const modifyOldEvent = (e) => {
        if (e.target.name === "isCompleted") {
            setEvent({ ...event, [e.target.name]: e.target.checked });
        } else {
            setEvent({ ...event, [e.target.name]: e.target.value });
        }
    }

    const modifyData = (e) => {

        if (e.target.name === "isCompleted") {
            setNewEvent({ ...newEvent, [e.target.name]: e.target.checked });
        } else {
            setNewEvent({ ...newEvent, [e.target.name]: e.target.value });
        }
    }
    const handleSave = () => {
        const { from, to, content } = newEvent;
        if (from && to && content) { // make sure user has no filled all require field
            addNewEvent(newEvent);
            setCreatingNewEvent(false);
        }
    }
    return (
        <main className="user_data_container">
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center" style={{ width: "17.5%" }}>
                                <Button variant="contained" onClick={() => {
                                    if (!creatingNewEvent) {
                                        setCreatingNewEvent(true);
                                        promptNewEvent()
                                    }
                                }}>Add Event</Button>
                            </TableCell>
                            <TableCell ></TableCell>
                            <TableCell ></TableCell>
                            <TableCell ></TableCell>
                            <TableCell ></TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell align="center" style={{ width: "15%" }}>From</TableCell>
                            <TableCell align="center" style={{ width: "15%" }}>To</TableCell>
                            <TableCell align="center" style={{ width: "30%" }}>Content</TableCell>
                            <TableCell align="center" style={{ width: "10%" }}>Status</TableCell>
                            <TableCell align="center" style={{ width: "25%" }}>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {events.map((row) => {
                            if (row._id === "new_event") {
                                return (
                                    <TableRow
                                        key={row._id}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row" align="center">
                                            <input type="datetime-local" style={{ padding: "0.25rem" }}
                                                name="from"
                                                value={newEvent.from}
                                                onChange={modifyData} />
                                        </TableCell>
                                        <TableCell align="center">
                                            <input type="datetime-local" style={{ padding: "0.25rem" }}
                                                name="to"
                                                value={newEvent.to}
                                                onChange={modifyData}
                                            />
                                        </TableCell>
                                        <TableCell align="center">
                                            <input type="text" style={{ padding: "0.25rem" }}
                                                name="content"
                                                value={newEvent.content}
                                                onChange={modifyData}
                                            />
                                        </TableCell>
                                        <TableCell align="center">
                                            <input type="checkbox" style={{ width: "1.25rem", height: "1.25rem" }}
                                                name="isCompleted"
                                                value={newEvent.isCompleted}
                                                onChange={modifyData}
                                            />
                                        </TableCell>
                                        <TableCell align="center">
                                            <Button variant="contained" onClick={handleSave}>Save</Button>
                                        </TableCell>
                                    </TableRow>
                                )
                            }
                            else if (editEventId === row._id) {
                                return (
                                    <TableRow
                                        key={row._id}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row" align="center">
                                            <input type="datetime-local" style={{ padding: "0.25rem" }}
                                                name="from"
                                                value={event.from}
                                                onChange={modifyOldEvent} />
                                        </TableCell>
                                        <TableCell align="center">
                                            <input type="datetime-local" style={{ padding: "0.25rem" }}
                                                name="to"
                                                value={event.to}
                                                onChange={modifyOldEvent}
                                            />
                                        </TableCell>
                                        <TableCell align="center">
                                            <input type="text" style={{ padding: "0.25rem" }}
                                                name="content"
                                                value={event.content}
                                                onChange={modifyOldEvent}
                                            />
                                        </TableCell>
                                        <TableCell align="center">
                                            <input type="checkbox" style={{ width: "1.25rem", height: "1.25rem" }}
                                                name="isCompleted"
                                                checked={event.isCompleted}
                                                value={event.isCompleted}
                                                onChange={modifyOldEvent}
                                            />
                                        </TableCell>
                                        <TableCell align="center" style={{ display: "flex", justifyContent: "space-between" }}>
                                            <Button variant="contained" onClick={() => editSave()}>Save</Button>
                                            <Button variant="contained" color="error" onClick={() => deleteEvent(editEventId)}>Delete</Button>
                                        </TableCell>
                                    </TableRow>
                                )
                            }
                            else {
                                return (
                                    <TableRow
                                        key={row._id}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row" align="center">
                                            {row.from}
                                        </TableCell>
                                        <TableCell align="center">
                                            {row.to}
                                        </TableCell>
                                        <TableCell align="center">{row.content}</TableCell>
                                        <TableCell align="center">{row.isCompleted ? "completed" : "pending"}</TableCell>
                                        <TableCell align="center"><Button variant="contained" onClick={() => { getEditEvent(row) }}>Edit</Button></TableCell>
                                    </TableRow>
                                )
                            }

                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </main>

    );
}

export default connect((state) => {
    return {
        username: state.username,
        events: state.events
    }
}, { loadEvents, promptNewEvent, addNewEvent, editEvent, deleteEvent, storeUserInfo })(Userpage);


