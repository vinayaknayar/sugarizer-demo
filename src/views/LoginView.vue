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
      <button type="submit">Login</button>
    </form>
    <p>
      <button @click="login">New User</button>
    </p>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'LoginPage',
  data() {
    return {
      baseUrl: '',
      form: {
        name: '',
        password: ''
      }
    }
  },
  methods: {
    async updateBaseUrl() {
      await this.$emit('base-url-updated', this.baseUrl);
    },

    async LogIn(User) {

      console.log(`The data we're passing is: ${User}`)
      const response = await axios.post('/auth/login', { user: User }, {  // format for request is {user: User JSON object}
        headers: {
          'Content-Type': 'application/json'
        }
      });
      console.log(response);

      if (response.status != 200) {
        throw new Error('Login failed');
      }
      
      const data = await JSON.stringify(response.data);
      console.log(data);
      // Assuming the response data contains a token, save it to the local storage
      localStorage.setItem('token', data.token);
    },



    async submit() {
      const User = new FormData();
      User.append('name', this.form.name);
      User.append('password', this.form.password);
      console.log(User);

      const userObj = Array.from(User.entries()).reduce((acc, [key, value]) => ({
        ...acc,
        [key]: value
      }), {});
      const userJson = JSON.stringify(userObj);
      console.log(userJson);

      try {
        await this.LogIn(userJson);
        this.showError = false;
        this.$router.push("/home");

      } catch (e) {
        console.log(`this.login failed: ${e}`);
        this.showError = true;
      }
    },
  },
};
</script>