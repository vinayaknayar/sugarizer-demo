import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'

const app = createApp(App);


//define the base url as a global variable
let baseURL = 'http://localhost:8080';
const BASE_URL = localStorage.setItem('base-url', baseURL);

//Set the base url for all the axios requests
axios.defaults.baseURL = BASE_URL;

app.use(router).mount('#app');

// To update the base URL, emit the 'base-url-updated' eventwith the new base URL as the argument.
