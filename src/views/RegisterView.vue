<template>
    <div class="login">
        <h1>Login</h1>
        <form @submit.prevent="submit">
            <div>
                <label for="username">Server:</label>
                <input type="text" name="server" v-model="baseUrl" @input="updateBaseUrl" />
            </div>
            <div>
                <label for="username">Username:</label>
                <input type="text" name="username" v-model="form.name" />
            </div>
            <div>
                <label for="password">Password:</label>
                <input type="password" name="password" v-model="form.password" />
            </div>
            <div>
                <Sketch v-model="color.Stroke" />
                <div>Selected Color: {{ color.Stroke.hex }}</div>
            </div>
            <div>
                <Sketch v-model="color.Fill" />
                <div>Selected Color: {{ color.Fill.hex }}</div>
            </div>
            <button type="submit">Register</button>
        </form>
        <div>
            <router-link to="/">Login</router-link>
            <!-- <button @click="login">New User</button> -->
        </div>
    </div>
</template>
<script>
import axios from 'axios'
import { Sketch } from '@ckpack/vue-color'

export default {
    name: 'RegisterView',
    components: {
        Sketch,
    },
    setup() {
        return {
            color: {
                Stroke: '#000000',
                Fill: '#FFFFFF'
            }
        }
    },
    data() {
        return {
            baseUrl: '',
            form: {
                name: '',
                color: {
                    stroke: '',
                    fill: ''
                },
                language: '',
                password: '',
                options: {
                    sync: true,
                    stats: true
                }
            }
        }
    },

    methods: {
        async register(User) {
            console.log(`The data we're passing is: ${User}`)
            const userJson = JSON.stringify({ user: User });
            console.log(`this is userJson: ${userJson}`);
            const response = await axios.post('/auth/signup', userJson, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            console.log(response);

            if (response.status != 200) {
                throw new Error('Registration failed');
            }

            const data = await JSON.stringify(response.data);
            console.log(data);
            
            // Assuming the response data contains a token, save it to the local storage
            localStorage.setItem('token', data.token);
        },

        async submit() {
            console.log(`this.form: ${this.form}`);
            const User = {
                name: this.form.name,
                color: {
                    stroke: this.color.Stroke.hex,
                    fill: this.color.Fill.hex
                },
                language: "en",
                role: "student",
                password: this.form.password,
                options: { sync: true, stats: true }
            }
            console.log(User);

            // const userObj = Array.from(User.entries()).reduce((acc, [key, value]) => ({
            //     ...acc,
            //     [key]: value
            // }), {});
            const userJson = JSON.stringify(User);
            console.log(userJson);

            try {
                await this.register(userJson);
                this.showError = false;
                this.$router.push("/home");

            } catch (e) {
                console.log(`this.registeration failed: ${e}`);
                this.showError = true;
            }
        },
    }
}
</script>