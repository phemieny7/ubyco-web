import axios from 'axios';
import jwt, { decode } from 'next-auth/jwt'
import {getSession, session } from 'next-auth/client'
import Cookies from 'js-cookie'
import jwt_decode from "jwt-decode";

// const secret = process.env.JWT_SECRET
const Server = axios.create({
    baseURL: process.env.NEXT_PUBLIC_SERVER_URL 
});
// const trial = Cookies.get()
// console.log('api:', trial)
// const cookies = 'eyJhbGciOiJIUzUxMiJ9.eyJhY2Nlc3NUb2tlbiI6Ik1qRTUubWtnUjktOXFFUXhDY0o3RmVPbFRxZzhxWmdVTWJwTkoxTEJZcG5kNk83VEtRbjlxTTRLRWlsZWMwTGg4IiwidXNlciI6eyJpZCI6MSwiZW1haWwiOiJveWV3by5vbHV3YWZlbWlAZ21haWwuY29tIiwicm9sZSI6Mn0sImlhdCI6MTYzMTcxNDM5NiwiZXhwIjoxNjM0MzA2Mzk2fQ.gklUr9oRSQ-M_EN7hnvEStse8JM7RS-wAQgQvuec4cHHvhVgoVC277KLL0SIS2bTAD8dHavs3iul3PpseWlubQ'
// const decoded = jwt_decode(cookies);

// Server.interceptors.request.use(async (config) => {
//     if(!decode?.accessToken){
//         config.headers.Authorization = `Bearer ${decoded?.accessToken}`;
//     }
//     config.headers['Content-Type'] = 'application/json';
//     return config
// })
export default Server;
