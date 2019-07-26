import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://react-hamburger-cf879.firebaseio.com/'
});

export default instance;
