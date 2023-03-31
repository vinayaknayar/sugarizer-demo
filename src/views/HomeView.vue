<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <p> token: {{ token }}</p>
    <p> id: {{ id }}</p>
    <button @click="getFavActivities()">Home View(Get Favorite)</button>
    <button @click="getAllActivities()">List View(All activities)</button>
    <button @click="deleteUser()">Delete Account</button>
    <div class="activities" v-if="homeView">
      <h1>Activities</h1>
      <div class="activity" v-for="activity in favActivities" :key="activity.id">
        <h2>Name of activity: {{ activity.name }}</h2>
        <p>Activity icon path: {{ activity.icon }}</p>
      </div>
    </div>
    <div class="activities" v-if="listView">
      <h1>Activities</h1>
      <div class="activity" v-for="activity in allActivities" :key="activity.id">
        <h2>Name of activity: {{ activity.name }}</h2>
        <p>Activity icon path: {{ activity.icon }}</p>
        <p>Activity is favorite: {{ activity.favorite }}</p>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

import axios from 'axios';

export default {
  name: 'HomeView',
  components: {
    // HelloWorld
  },
  data: function () {
    return {
      id: "",
      token: "",
      homeView: false,
      listView: false,
      favActivities: [],
      allActivities: [],
    };
  },
  // computed: {
  //   user() {
  //     return this.$route.params.user;
  //   }
  // }
  mounted() {
    const userToken = JSON.parse(localStorage.getItem("token"));
    const userID = JSON.parse(localStorage.getItem("id"));
    this.token = userToken;
    this.id = userID;
    console.log(`this is token: ${this.token}`);

  },
  methods: {
    async getFavActivities() {
      console.log("getFavActivities");
      const response = await axios.get("/api/v1/activities?favorite=true", {
        headers: {
          'x-key': this.id,
          'x-access-token': this.token,
        }
      });

      if (response.status != 200) {
        throw new Error('Unable to load the activities');
      }
      this.listView = false;
      this.homeView = true;
      this.favActivities = response.data;
    },

    async getAllActivities() {
      console.log("getFavActivities");
      const response = await axios.get("/api/v1/activities", {
        headers: {
          'x-key': this.id,
          'x-access-token': this.token,
        }
      });

      if (response.status != 200) {
        throw new Error('Unable to load the activities');
      }

      this.homeView = false;
      this.listView = true;
      this.allActivities = response.data;
    },

    async deleteUser() {
      console.log("delete user");
      const response = await axios.delete(`/api/v1/users/${this.id}`, {
        headers: {
          'x-key': this.id,
          'x-access-token': this.token,
        }
      });

      if (response.status != 200) {
        throw new Error('Unable to load the activities');
      }

      this.homeView = false;
      this.listView = false;
      this.allActivities = response.data;
      this.$router.push('/');
      localStorage.setItem("id", null);
      localStorage.setItem("token", null);
    },
  }
}
</script>
