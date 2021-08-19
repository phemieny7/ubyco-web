import axios from 'axios';
import { getSession } from 'next-auth/client';

const Server = axios.create({
    baseURL: "http://42163adee1bf.ngrok.io" 
})
Server.defaults.withCredentials = true;
// Server.interceptors.request.use(async (config) => {
//     const session = await getSession();
//     config.headers.Authorization = `Bearer ${session?.accessToken}`;
//     console.log(session)
//     return config
// })

export default Server;
