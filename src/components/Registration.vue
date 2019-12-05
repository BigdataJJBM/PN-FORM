<template>
 <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="1000px">
      <template v-slot:activator="{ on }">
        <v-btn color="light-blue accent-4" class="mt-7" dark v-on="on">Register</v-btn>
      </template>

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
         <v-col cols="12" md="4">
          <v-text-field v-model="firstname" :rules="nameRules" label="First name" required></v-text-field>
        </v-col>
         <v-col cols="12" md="4">
          <v-text-field v-model="middlename"  label="Middle name" required></v-text-field>
        </v-col>

        <v-col cols="12" md="4">
          <v-text-field v-model="lastname" :rules="nameRules" label="Last name" required></v-text-field>
        </v-col>
        <v-col cols="12" md="1">
          
         <h6>Address</h6>
           </v-col>

        <v-col cols="12" md="3">
          <v-text-field v-model="province"  label="Province" required></v-text-field>
        </v-col>
         <v-col cols="12" md="3">
          <v-text-field v-model="municipality"  label="Municipality" required></v-text-field>
        </v-col>
          <v-col cols="12" md="3">
          <v-text-field v-model="barangay"  label="Barangay" required></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
            <v-select
            v-model="gender"
            :items="items"
            label="Gender"
          ></v-select>
        </v-col>
           <v-col cols="12" md="6">
          <v-text-field v-model="age"  @keypress="onlyNumber" label="Age" required></v-text-field>
        </v-col>
     
      </v-row>
        <v-col cols="12" md="5">
          <v-text-field v-model="familyIncome"  @keypress="onlyNumber" label="Family Monthly Income" required></v-text-field>
        </v-col>
      <v-text-field v-model="email" :rules="emailRules" label="E-mail" required></v-text-field>
      <v-text-field
        v-model="contact"
        :rules="[v => !!v || 'Item is required']"
        label="Contact Number"
        @keypress="onlyNumber"
        required
      ></v-text-field>
      <v-textarea v-model="note"  outlined name="input-7-4" label="Motivation" value></v-textarea>
      <v-spacer></v-spacer>
      <v-checkbox
        v-model="checkbox"
        :rules="[v => !!v || 'You must agree to continue!']"
        label="Do you agree?"
        required
      ></v-checkbox>
        
      <v-btn color="primary" text class="ml-5" @click="dialog= false" >Cancel</v-btn>
      <v-btn :disabled="!valid" color="success" class="mr-4" @click="validate()">Submit Request</v-btn>
    </v-form>
    </v-card>
    </v-dialog>
  </v-row>
</template>

<script>

import {
  createApplicant,
} from "../helpers/actions";

export default {
 
  name: "RegisterForm",
  data: () => ({
    items: ['Female', 'Male'],
    status: "For Examination",
    action: "For SI",
    dialog: false,
    valid: true,
    firstname: "",
    middlename:"",
    lastname: "",
    contact: "",
    province:"",
    municipality:"",
    barangay:"",
    gender:"",
    age:"",
    familyIncome:"",
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
    onlyNumber ($event) {
   //console.log($event.keyCode); //keyCodes value
   let keyCode = ($event.keyCode ? $event.keyCode : $event.which);
   if ((keyCode < 48 || keyCode > 57) && keyCode !== 46) { // 46 is dot
      $event.preventDefault();
   }
},

    validate() {
    
      if (this.$refs.form.validate()) {
        this.disableSubmit = true;
        this.submitRequest();
        this.firstname =this.middlename= this.lastname = this.contact = this.email = this.note = 
        this.municipality= this.gender =this.age= this.province=this.familyIncome = this.barangay = null;
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
        middlename:this.middlename,
        lastname: this.lastname,
        email: this.email,
        contact: this.contact,
        address:{
        province:this.province, 
        municipality:this.municipality,
        barangay:this.barangay,
        },
        age:this.age,
        gender:this.gender,
        familyIncome:this.familyIncome,

        note: this.note,
        status: this.status,
        action: this.action,

      };
      createApplicant(data)
        .then(data => {
          this.$emit("createApplicant", data.data);
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