import axios from 'axios';
import createAuthRefreshInterceptor from 'axios-auth-refresh'
import * as cookie from 'cookie'
import * as setCookie from 'set-cookie-parser'

const Server = axios.create({
    baseURL: process.env.NEXT_PUBLIC_SERVER_URL,
    withCredentials: true 
});


  
export default Server;
