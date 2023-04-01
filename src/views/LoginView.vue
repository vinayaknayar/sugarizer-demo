<template>
  <div class="login">
    <h1>Login</h1>
    <form @submit.prevent="submit">
      <div class="form-elements">
        <label for="server"  >Sugarizer Server:</label>
        <input type="text" name="server" v-model="baseUrl" @input="updateBaseUrl" placeholder="http://localhost:8080" style="margin-right: 50px;"/>
      </div>
      <div class="form-elements">
      <label for="username" >Username:</label>
        <input type="text" name="username" v-model="form.name" placeholder="john doe"/>
      </div>
      <div class="form-elements">
        <label for="password">Password:</label>
        <input type="password" name="password" v-model="form.password" placeholder="pass"/>
      </div>
      <button type="submit" class="submit-btn">Login</button>
    </form>
    <div class="login-signup-route">
      <router-link to="/register" class="links">New User? Register Please!</router-link>
    </div>
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

      const userData = await JSON.stringify(response.data);
      console.log(userData);
      // the response data  must contain a token and user _id, save it to the local storage
      localStorage.setItem('token', JSON.stringify(response.data.token));
      localStorage.setItem('id', JSON.stringify(response.data.user._id));
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
<style>
input{
  margin: 5px;
  height: 20px;
  width: 210px;
  border-radius: 5px;
  background-color: #e2eafc;
}
label{
  margin: 5px;
  /* display: block; */
  text-align: center;
}
.login{
  display: flex;
  flex-direction: column;
  /* align-items: center; */
  justify-content: center;
  /* height: 100vh; */
  margin: auto;
  width: 30%;
  position: relative;
  top: 15vh;
  border: solid 2px #e2eafc;
}
h1{
  color: #abc4ff;
}
.submit-btn{
  margin: 10px;
  height: 30px;
  width: 100px;
  border-radius: 0px;
  background-color: #0466c8;
  color: white;
  font-weight: bold;
}
.submit-btn:hover{
  background-color: #abc4ff;
  color: black;
  cursor: pointer;
}
.login-signup-route{
  margin: 10px;
  text-align: center;
}
.links{
  color: #abc4ff;
}
.links:hover{
  color: #0466c8;
  cursor: pointer;
}
/* .links:visited{
  color: #abc4ff;
} */
</style>