<template>
  <v-card class="my-4 mx-auto px-10 pb-10" max-width="70%" elevation="5">
    <v-sheet
      class="v-sheet--offset mx-auto mt-10 pa-5"
      color="orange darken-2"
      elevation="10"
      max-width="calc(100% - 1px)"
    >
      <h3>BE A PASSERELLES NUMERIQUES SCHOLAR!</h3>
    </v-sheet>
    <v-form ref="form" v-model="valid" :lazy-validation="lazy">
      <h3 class="mb-2">Personal Information</h3>
      <v-row>
         <v-col cols="12" md="6">
          <v-text-field v-model="firstname" :rules="nameRules" label="First name" required></v-text-field>
        </v-col>

        <v-col cols="12" md="6">
          <v-text-field v-model="lastname" :rules="nameRules" label="Last name" required></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field v-model="municipality"  label="Municipality" required></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
            <v-select
            v-model="gender"
            :items="items"
            label="Gender"
          ></v-select>
        </v-col>
       
      </v-row>
      <v-text-field v-model="email" :rules="emailRules" label="E-mail" required></v-text-field>
      <v-text-field
        v-model="contact"
        :rules="[v => !!v || 'Item is required']"
        label="Contact Number"
        required
      ></v-text-field>
      <v-textarea v-model="note" outlined name="input-7-4" label="Motivation" value></v-textarea>
      <v-spacer></v-spacer>
      <v-checkbox
        v-model="checkbox"
        :rules="[v => !!v || 'You must agree to continue!']"
        label="Do you agree?"
        required
      ></v-checkbox>

      <v-btn :disabled="!valid" color="success" class="mr-4" @click="validate()">Submit Request</v-btn>
    </v-form>
  </v-card>
</template>

<script>

import {
  createAppointment,
} from "../helpers/actions";

export default {
  name: "RegisterForm",
  data: () => ({
    items: ['Female', 'Male'],
    status: "For Examination",
    action: "For SI",
    valid: true,
    firstname: "",
    lastname: "",
    contact: "",
    municipality:"",
    gender:"",
    hours: [],
    // dateOfSubmit: this.moment(date),
    nameRules: [
      v => !!v || "Name is required",
      v => (v && v.length <= 50) || "Name must be less than 50 characters"
    ],
    email: "",
    emailRules: [
      v => !!v || "E-mail is required",
      v => /.+@.+\..+/.test(v) || "E-mail must be valid"
    ],
    selectService: null,
    services: [],
    note: "",
    date: null,
    currentDate: new Date().toISOString().substr(0, 10),
    modal: false,
    checkbox: false,
    lazy: false,
    dataHours: [],
    disable: true
  }),


  methods: {

    validate() {
    
      if (this.$refs.form.validate()) {
        this.disableSubmit = true;
        this.submitRequest();
        this.firstname = this.lastname = this.contact = this.email = this.note = this.municipality= this.gender = null;
        this.checkbox = false;
        this.snackbar = true;
        this.$refs.form.reset();

      }
    },

    submitRequest() {
      if (this.note == "") {
        this.note = "No note is added!";
      }
      let data = {
        firstname: this.firstname,
        lastname: this.lastname,
        email: this.email,
        contact: this.contact,
        municipality:this.municipality,
        gender:this.gender,
        note: this.note,
        status: this.status,
        action: this.action,

      };
      createAppointment(data)
        .then(data => {
          this.$emit("createAppointment", data.data);
        })
        .catch(err => alert(err.error));
    }
  },
  mounted() {
  }
};
</script>


<style>
.v-sheet--offset {
  top: -25px;
  position: relative;
}
</style>