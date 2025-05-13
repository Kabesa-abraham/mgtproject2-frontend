import axios from 'axios';

export const axiosInstance = axios.create({
    baseURL: 'https://mgtprojects2-backend.onrender.com/backend',
    withCredentials: true,
})

/*
import.meta.env.DEV
        ? 
        : 
*///'https://mgtprojects2-backend.onrender.com/backend',