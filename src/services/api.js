import axios from 'axios';

export const signUp = (data) => {
    return axios.post(`${'http://localhost:4000'}/signup`, data);
}

export const signIn = (data) => {
    return axios.post(`${'http://localhost:4000'}/login`, data);
}

export const addNote = (data) => {
    return axios.post(`${'http://localhost:4000'}/api/add-note`, data);
}

export const getNotes = (data) => {
    return axios.post(`${'http://localhost:4000'}/api/get-note`, data)
}

export const updateNote = (data) => {
    return axios.put(`${'http://localhost:4000'}/api/update-note`, data);
}

export const deleteNote = (data) => {
    return axios.post(`${'http://localhost:4000'}/api/delete-note`, data);
}