<template>
  <div class="container">
    <div class="auth-form">
      <v-form @submit.prevent="handleLogin" v-if="!isRegister">
        <h1 class="form-title">Login</h1>
        <p class="subtitle">Enter your email and password to login<br/><br/></p>
        <v-text-field
          v-model="email"
          label="Email"
          required
        ></v-text-field>
        <v-text-field
          v-model="password"
          label="Password"
          type="password"
          required
        ></v-text-field>
        <v-btn type="submit" base-color="success">Login</v-btn>
      </v-form>

      <v-form @submit.prevent="handleRegister" v-if="isRegister">
        <h1>Register</h1>
        <p class="subtitle">Enter your username and password to register<br/><br/></p>
        <v-text-field
          v-model="username"
          label="Username"
          required
        ></v-text-field>
        <v-text-field
          v-model="email"
          label="Email"
          required
        ></v-text-field>
        <v-text-field
          v-model="password"
          label="Password"
          type="password"
          required
        ></v-text-field>
        <v-btn type="submit" base-color="success">Register</v-btn>
      </v-form>
      <div>
        <br/>
        <a @click="toggleRegister">
          {{ isRegister ? "Already have an account? Login" : "Don't have an account? Register" }}
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import router from "@/router";
import axios from "axios";
export default {
  name: "Index",
  data() {
    return {
      username: "",
      password: "",
      email: "",
      isRegister: false,
      accessToken: "",
    };
  },
  methods: {
    handleLogin() {
      axios.post("http://localhost:3115/api/users/login", {
        email: this.email,
        password: this.password,
      }).then((res) => {
        this.accessToken = res.data.accessToken;
        this.username = "";
        this.password = "";
        this.email = "";
        router.push({
          name: "dashboard",
          params: {
            accessToken: this.accessToken,
          },
        });
      }).catch((err) => {
        console.log(err);
      });
    },
    handleRegister() {
      axios.post("http://localhost:3115/api/users/register", {
        username: this.username,
        email: this.email,
        password: this.password,
      }).then((res) => {
        console.log(res.data);
      }).catch((err) => {
        console.log(err);
      });
    },
    toggleRegister() {
      this.isRegister = !this.isRegister;
    },
  },
};
</script>

<style>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.auth-form {
  width: 400px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #1f1f1f;
}

h1 {
  color: #fff;
  font-size: 24px;
  margin-bottom: 10px;
}

.subtitle {
  color: #ccc;
  font-size: 14px;
}

a {
  color: #fff;
  cursor: pointer;
}

</style>
