import axios from 'axios';
import jwt, { decode } from 'next-auth/jwt'
import {getSession, session } from 'next-auth/client'
import Cookies from 'js-cookie'
import jwt_decode from "jwt-decode";

// const secret = process.env.JWT_SECRET
const Server = axios.create({
    baseURL: process.env.NEXT_PUBLIC_SERVER_URL 
});
const trial = Cookies.get()
console.log(trial)
const cookies = 'eyJhbGciOiJIUzUxMiJ9.eyJhY2Nlc3NUb2tlbiI6Ik1qRXcuSFBDUHVKMDFYRUlJR1BKdGJfTG9rdjJnQmEwUENIdnNWTFd5eS1vMDlyWU1uaC1OdkhXUVBUcEdmN3NoIiwidXNlciI6eyJpZCI6MSwiZW1haWwiOiJveWV3by5vbHV3YWZlbWlAZ21haWwuY29tIiwicm9sZSI6Mn0sImlhdCI6MTYzMDczODQ5OCwiZXhwIjoxNjMzMzMwNDk4fQ.FmHp5U0ALXbbIW00RTfrbjIivmBy_Qx7M0n3MM8pB1DThz59QSFPcHBVlM6K7dkl5mGRnpGF67_wRnnR85AKTg'
const decoded = jwt_decode(cookies);

Server.interceptors.request.use(async (config) => {
    if(!decode?.accessToken){
        config.headers.Authorization = `Bearer ${decoded?.accessToken}`;
    }
    config.headers['Content-Type'] = 'application/json';
    return config
})
export default Server;
