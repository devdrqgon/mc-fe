import axios from "axios";

export const axiosClient = axios.create({
    baseURL: "http://localhost:8000/",
    headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
    }
})