<template>
    <div class="login update-details">
        <h1>Update User Details</h1>
        <form @submit.prevent="submit">
            <div>
                <label>Username:</label>
                <input type="text" id="username" v-model="form.name">
            </div>
            <div>
                <label>Password:</label>
                <input type="password" id="password" v-model="form.password">
            </div>
            <div>
                <label>Language:</label>
                <input type="text" id="language" v-model="form.language" >
            </div>
            <!-- <div>
                <Sketch v-model="color.Stroke" />
                <div>Selected Color: {{ color.Stroke.hex }}</div>
            </div>
            <div>
                <Sketch v-model="color.Fill" />
                <div>Selected Color: {{ color.Fill.hex }}</div>
            </div> -->
            <div class="sketch" >
                <div>Stroke Color:</div>
                <Sketch v-model="color.Stroke" style="margin-right: 10px;"/>
            </div>
            <div class="sketch" style="gap:0px">
                <div style="margin-left: 10px;">Fill Color: </div>
                <Sketch v-model="color.Fill"  style="margin-left: 10px;"/>
                <!-- <div>Selected Color: {{ color.Fill.hex }}</div> -->
            </div>
            <button type="submit" class="submit-btn update-btn">Update</button>
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
                this.$router.push("/home");
                alert("Details Updated Successfully!");

            } catch (e) {
                console.log(`this.registeration failed: ${e}`);
                this.showError = true;
                alert("Details Update Failed!"+e.message);
            }

        }
    }
}
</script>
<style>
.update-details{
    top: 2vh !important;
    color: #b6ccfe;
    margin: 10px;
}

.sketch{
    width: fit-content;
    margin: auto;
    margin-bottom: 5px;
    margin-top: 5px;
    display: flex;
    align-items: center;
    gap: 10px;
}
.update-btn{
    background-color: #ffaa00d9 !important;
}
</style>