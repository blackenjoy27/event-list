import axios from "axios";

export const AxiosWithAuth = () => {
    const token = localStorage.getItem("token");
    return axios.create({
        headers: {
            Authorization: `Bearer ${token}`,
        },
        baseURL: "http://localhost:4000"
    })
}