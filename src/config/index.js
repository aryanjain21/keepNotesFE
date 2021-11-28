import axios from 'axios';

export const signUp = (data) => {
    return axios.post(`${'http://localhost:4000'}/signup`, data)
}