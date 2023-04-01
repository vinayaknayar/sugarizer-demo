<template>
    <div class="login register">
        <h1>Register</h1>
        <form @submit.prevent="submit">
            <div>
                <label for="username">Sugarizer Server:</label>
                <input type="text" name="server" v-model="baseUrl" @input="updateBaseUrl" placeholder="http://localhost:8080" style="margin-right: 50px;" required/>
            </div>
            <div>
                <label for="username">Username:</label>
                <input type="text" name="username" v-model="form.name" placeholder="john doe" required/>
            </div>
            <div>
                <label for="password">Password:</label>
                <input type="password" name="password" v-model="form.password" placeholder="pass" required/>
            </div>
            <div class="sketch" >
                <div>Stroke Color:</div>
                <Sketch v-model="color.Stroke" style="margin-right: 10px;"/>
            </div>
            <div class="sketch" style="gap:0px">
                <div style="margin-left: 10px;">Fill Color: </div>
                <Sketch v-model="color.Fill"  style="margin-left: 10px;"/>
            </div>
            <button type="submit" class="submit-btn">Register</button>
        </form>
        <div class="login-signup-route">
            <router-link to="/" class="links">Already a user? Login Please!</router-link>
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

            const userJson = JSON.stringify(User);
            console.log(userJson);

            try {
                await this.register(userJson);
                this.showError = false;
                this.$router.push("/");

            } catch (e) {
                console.log(`this.registeration failed: ${e}`);
                this.showError = true;
            }
        },
    }
}
</script>
<style>
.register{
    top: 2vh
}
.sketch{
    width: fit-content;
    margin: auto;
    margin-bottom: 5px;
    display: flex;
    align-items: center;
    gap: 10px;
}
</style>