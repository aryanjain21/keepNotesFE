import axios from 'axios';

export const signUp = (data) => {
    return axios.post(`${process.env.REACT_APP_BACKEND}/signup`, data);
}

export const signIn = (data) => {
    return axios.post(`${process.env.REACT_APP_BACKEND}/login`, data);
}

export const addNote = (data) => {
    return axios.post(`${process.env.REACT_APP_BACKEND}/api/add-note`, data);
}

export const getNotes = (data) => {
    return axios.post(`${process.env.REACT_APP_BACKEND}/api/get-note`, data)
}

export const updateNote = (data) => {
    return axios.put(`${process.env.REACT_APP_BACKEND}/api/update-note`, data);
}

export const deleteNote = (data) => {
    return axios.post(`${process.env.REACT_APP_BACKEND}/api/delete-note`, data);
}