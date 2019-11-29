<template>
  <v-card class="my-4 mx-auto px-10 pb-10" max-width="70%" elevation="5">
    <v-sheet
      class="v-sheet--offset mx-auto mt-10 pa-5"
      color="light-blue accent-2"
      elevation="10"
      max-width="calc(100% - 1px)"
    >
      <h3>Please provide the following information:</h3>
    </v-sheet>
    <v-form ref="form" v-model="valid" :lazy-validation="lazy">
      <!-- <v-select
        v-model="selectService"
        :items="services"
        item-text="name"
        :rules="[v => !!v || 'Item is required']"
        label="Dental Services"
        sort-by="name"
        @change="disable = false, modal= true"
        required
      ></v-select> -->
      <!-- <v-menu
          v-model="menu"
          :close-on-content-click="false"
          max-width="290"
      >-->
      <!-- <v-dialog ref="dialog" v-model="modal" :return-value.sync="date" persistent width="290px">
        <template v-slot:activator="{ on }">
          <v-text-field v-model="date" label="When" readonly v-on="on" :disabled="disable"></v-text-field>
        </template>
        <v-date-picker v-model="date" scrollable :min="currentDate" @change="selectDate">
          <v-spacer></v-spacer>
          <v-btn text color="primary" @click="modal = false">Cancel</v-btn>
          <v-btn text color="primary" @click="$refs.dialog.save(date)">OK</v-btn>
        </v-date-picker>
      </v-dialog> -->
      <h3 class="mb-2">Personal Information</h3>
      <v-row>
        <v-col cols="12" md="6">
          <v-text-field v-model="municipality"  label="Municpality" required></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field v-model="gender"  label="Gender" required></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field v-model="firstname" :rules="nameRules" label="First name" required></v-text-field>
        </v-col>

        <v-col cols="12" md="6">
          <v-text-field v-model="lastname" :rules="nameRules" label="Last name" required></v-text-field>
        </v-col>
      </v-row>
      <v-text-field v-model="email" :rules="emailRules" label="E-mail" required></v-text-field>
      <v-text-field
        v-model="contact"
        :rules="[v => !!v || 'Item is required']"
        label="Contact Number"
        required
      ></v-text-field>
      <v-textarea v-model="note" outlined name="input-7-4" label="Notes" value></v-textarea>
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
// import moment from "moment";
// import Swal from "sweetalert2";
import {
  createAppointment,
} from "../helpers/actions";

export default {
  name: "RegisterForm",
  data: () => ({
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