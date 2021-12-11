import axios from 'axios';

export const signUp = (data) => {
    return axios.post(`${'http://localhost:4000'}/signup`, data);
}

export const signIn = (data) => {
    return axios.post(`${'http://localhost:4000'}/login`, data);
}

export const addNote = (data) => {
    return axios.post(`${'http://localhost:4000'}/add-note`, data);
}