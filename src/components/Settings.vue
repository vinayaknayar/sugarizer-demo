<template>
    <div class="update-details">
        <h1>Update User Details</h1>
        <form @submit.prevent="submit">
            <div>
                <label>name</label>
                <input type="text" id="username" v-model="form.name">
            </div>
            <div>
                <label>password</label>
                <input type="password" id="password" v-model="form.password">
            </div>
            <div>
                <label>language</label>
                <input type="text" id="language" v-model="form.language" placeholder="{{ this.form.language }}">
            </div>
            <div>
                <Sketch v-model="color.Stroke" />
                <div>Selected Color: {{ color.Stroke.hex }}</div>
            </div>
            <div>
                <Sketch v-model="color.Fill" />
                <div>Selected Color: {{ color.Fill.hex }}</div>
            </div>
            <button type="submit">Update</button>
        </form>
    </div>
</template>

<script>
import axios from 'axios'
import { Sketch } from '@ckpack/vue-color'

export default {
    name: 'UpdateDetails',
    props: {
        id: String,
        token: String
    },
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
                language: 'en',
                password: '',
            }
        }
    },
    methods: {
        async update(details) {
            // const detailsJson = JSON.parse({ user: details });
            await axios.put(`/api/v1/users/${this.id}`, {user: details}, {
                headers: {
                    'x-key': this.id,
                    'x-access-token': this.token,
                }
            })
        },

        async submit() {
            const Details = {
                name: this.form.name,
                color: {
                    stroke: this.color.Stroke.hex,
                    fill: this.color.Fill.hex
                },
                language: this.form.language,
                password: this.form.password,
            };
            console.log(Details);

            const userDetails = JSON.stringify(Details);

            try {
                await this.update(userDetails);
                this.showError = false;
                // this.$router.push("/home");

            } catch (e) {
                console.log(`this.registeration failed: ${e}`);
                this.showError = true;
            }

        }
    }
}
</script>