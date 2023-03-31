import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'

const app = createApp(App);


//define the base url as a global variable
let BASE_URL = 'http://localhost:8080';

//Set the base url for all the axios requests
axios.defaults.baseURL = BASE_URL;

// event bus for communication between components
const eventBus = {
    events: {
        'base-url-updated': []
    },
    emit(event, ...args) {
        if (this.events[event]) {
            this.events[event].forEach(handler => handler(...args));
        }
    },
    on(event, handler) {
        if (this.events[event]) {  
            this.events[event].push(handler);
        }else {
            this.events[event] = [handler];
        }
    }
};

app.config.globalProperties.$eventBus = eventBus;

app.use(router).mount('#app');

// To update the base URL, emit the 'base-url-updated' eventwith the new base URL as the argument.

eventBus.emit('base-url-updated', 'https://new-example.com/api');