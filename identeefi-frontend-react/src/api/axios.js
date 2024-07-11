import axios from 'axios';

export default axios.create({
    baseURL: 'https://identeefi-server.vercel.app/'
});