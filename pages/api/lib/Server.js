import axios from 'axios';
const Server = axios.create({
    baseURL: process.env.NEXT_PUBLIC_SERVER_URL,
    withCredentials: true 
});
export default Server;
