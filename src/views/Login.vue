<template>
  <v-app id="back">
    <v-container class="fill-height" fluid>
      <v-layout align-center justify-center>
        <v-flex xs12 sm8 md7 lg5>
          <v-card class="mx-auto" max-width="500px" raised>
            <v-toolbar color="white" dark flat></v-toolbar>
            <v-row align="center" justify="center">
              <v-img src="../assets/pn-logo.png" aspect-ratio="1" max-width="100" max-height="150"></v-img>
            </v-row>

            <v-spacer />
            <v-card-title>
              <h3>ADMIN LOGIN</h3>
            </v-card-title>
            <v-card-text>
              <v-form>
                <v-text-field
                  v-model="username"
                  label="Login"
                  name="username"
                  prepend-icon="mdi-account"
                  color="indigo"
                  clearable
                  type="text"
                />

                <v-text-field
                  v-model="password"
                  id="password"
                  label="Password"
                  name="password"
                  clearable
                  color="indigo"
                  prepend-icon="mdi-lock"
                  :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                  @click:append="showPassword = !showPassword"
                  :type="showPassword ? 'text' : 'password'"
                />
              </v-form>
            </v-card-text>
            <v-spacer />
            <v-card-actions class="justify-center">
              <v-btn
                class="px-10"
                text
                v-on:click="login()"
                text-center
                color="light-blue darken-4"
              >Login</v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-app>
</template>
 
<script>
import axios from "axios";
export default {
  name: "btnLogin",
  data() {
    return {
      showPassword: false,
      username: "",
      password: ""
    };
  },
  methods: {
    login() {
      axios
        .put("http://localhost:3000/admin/login", {
          data: { username: this.username, password: this.password }
        })
        .then(response => {
          localStorage.setItem("user", response.data.user.username);
          sessionStorage.setItem("authenticated", true);
          this.$store.commit("setAuthentication", true);
          this.$router.push({ name: "Dashboard" });
        })
        .catch(err => {
          alert(err);
        });
    }
  }
};
</script>
<style scoped>
h2 {
  color: black;
}
#back {
  background-image: url("../assets/bc.jpeg");
  background-repeat: no-repeat;
  background-size: cover;
}
</style>