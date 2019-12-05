<template>
  <v-app>
    <v-app id="main" >
    <Header v-if="$route.name!= 'Login' && $route.name!= 'RegisterForm' && $route.name!= 'ApplicantPage' " />
    <v-content  class="mb-5">
      <router-view />
    </v-content>
  </v-app>
  </v-app>
  
</template>
<script>

import Header from "@/components/Header";
export default {
  name: "App",
  computed:{
    theme(){
      return (this.$vuetify.theme.dark) ? 'dark' : 'light'
    }
  },
  components: {
    Header
  },
  methods: {
    LoginPage() {
      if (this.$route.path == "/") {
        return false;
      } else {
        return true;
      }
    }
  }
};
</script>

