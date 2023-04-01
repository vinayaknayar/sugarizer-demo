<template>
  <nav>
    <RouterLink to="/home">Home</RouterLink> |
    <router-link to="/about">About</router-link>
  </nav>
  <div class="home">
    <div class="get-elements">
      <button class="get-buttons" @click="getFavActivities()">Home View(Favorite Activities)</button>
      <button class="get-buttons" @click="getAllActivities()">List View(All activities)</button>
      <button class="get-buttons settings-btn" @click="getSettings()">Settings</button>
      <button class="get-buttons logout-btn" @click="logOut()">Log Out</button>
      <button class="get-buttons delete-btn" @click="deleteUser()">Delete Account</button>
    </div>
    <div class="activities" v-if="homeView">
      <table style="width:30%">
        <tr>
          <th>Name of the Activity</th>
          <th>Activity Icon Path</th>
        </tr>
        <tr v-for="activity in favActivities" :key="activity.id">
          <td>{{ activity.name }}</td>
          <td>{{ activity.icon }}</td>

        </tr>
      </table>
    </div>
    <div class="activities" v-if="listView">
      <table style="width:30%">
        <tr>
          <th>Name of the Activity</th>
          <th>Activity Icon Path</th>
          <th>Favorite</th>
        </tr>
        <tr v-for="activity in allActivities" :key="activity.id">
          <td>{{ activity.name }}</td>
          <td>{{ activity.icon }}</td>
          <td>{{ activity.favorite }}</td>
        </tr>
      </table>
    </div>
    <div class="settings" v-if="showSettings">
      <Settings :id="id" :token="token" />
    </div>
  </div>
</template>

<script>

import axios from 'axios';
import Settings from '@/components/Settings.vue';

export default {
  name: 'HomeView',
  components: {
    Settings
  },
  data: function () {
    return {
      id: "",
      token: "",
      homeView: false,
      listView: false,
      showSettings: false,
      favActivities: [],
      allActivities: [],
    };
  },
  
  async mounted() {
    const userToken = JSON.parse(localStorage.getItem("token"));
    const userID = JSON.parse(localStorage.getItem("id"));
    this.token = userToken;
    this.id = userID;
    console.log(`this is token: ${this.token}`);
    try {
      await this.getFavActivities();
      this.homeView = true;
      this.showError = false;
    } catch (err) {
      this.showError = true;
      this.errorMessage = err.message;
      alert(err.message + ". Please log in again!");
      this.$router.push("/");
    }

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
      this.showSettings = false;
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
      localStorage.clear();
    },

    getSettings() {
      this.showSettings = true;
      this.homeView = false;
      this.listView = false;
    },

    logOut() {
      this.showSettings = false;
      this.homeView = false;
      this.listView = false;
      this.$router.push('/');
      localStorage.clear();
    }
  }
}
</script>
<style>
.home {
  text-align: center;
  color: #2c3e50;
}

.get-elements {
  display: flex;
  justify-content: center;
  gap: 10px;
}

.get-buttons {
  background-color: #4CAF50;
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
}

.settings-btn {
  background-color: #ffaa00d9;
}

.logout-btn {
  background-color: #ff66d9;
}

.delete-btn {
  background-color: #ac3333;
}

.get-buttons:hover {
  background-color: #415041;
}

table,
th,
td {
  border: 1px solid #e2eafc;
}

th {
  background-color: #9ca9fc;
}

td {
  background-color: #c4d3f8;
}

.activities {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 15px;
}
</style>
