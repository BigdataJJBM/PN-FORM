<template>

   <v-app light>
    <v-toolbar color="white">
      <v-toolbar-title v-text="title"></v-toolbar-title>
    </v-toolbar>
    <v-content>
      <section>
        <v-parallax src="../assets/pn_2.jpg" height="600">
          <v-layout
            column
            align-center
            justify-center
            class="white--text"
          >
            <img src="../assets/pn-logo.png" alt="Vuetify.js" height="200">
            <h1 class="white--text mb-2 display-1 text-center">Paserelles Numeriques</h1>
             <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="1000px">
      <template v-slot:activator="{ on }">
        <v-btn color="light-blue accent-4" class="mt-7" dark v-on="on">Inquire Scholarship</v-btn>
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
          <v-col cols="12" md="2">
          
         <h5>Name</h5>
           </v-col>
      <v-row>
        
         <v-col cols="12" md="4">
          <v-text-field v-model="firstname"  :rules="nameRules" label="First name" required></v-text-field>
        </v-col>
         <v-col cols="12" md="4">
          <v-text-field v-model="middlename"  label="Middle name" required></v-text-field>
        </v-col>

        <v-col cols="12" md="4">
          <v-text-field v-model="lastname" :rules="nameRules" label="Last name" required></v-text-field>
        </v-col>
        <v-col cols="12" md="2">
          
         <h5>Address</h5>
           </v-col>

        <v-col cols="12" md="3">
          <v-text-field v-model="province"  label="Province" required></v-text-field>
        </v-col>
         <v-col cols="12" md="3">

          <v-select
            v-model="municipality"
            :items="items1"
            label="Municipality"
          ></v-select>
        </v-col>
          <v-col cols="12" md="3">
          <v-text-field v-model="barangay"  label="Barangay" required></v-text-field>
        </v-col>
        <v-col cols="12" md="2">
          
         <h5>More info</h5>
           </v-col>

        <v-col cols="12" md="4">
            <v-select
            v-model="gender"
            :items="items"
            label="Gender"
          ></v-select>
        </v-col>
           <v-col cols="12" md="4">
          <v-text-field v-model="age"  @keypress="onlyNumber" label="Age" required></v-text-field>
        </v-col>
     
      </v-row>
       <h5>Contact Info:</h5>
      
      <v-text-field v-model="email" :rules="emailRules" label="E-mail" required></v-text-field>
      <v-text-field
        v-model="contact"
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
      <v-btn :disabled="!valid" color="success" class="mr-4" @click="validate(),dialog=false">Submit Request</v-btn>
    </v-form>
    </v-card>
    </v-dialog>
  </v-row>
          </v-layout>    
        </v-parallax>
      </section>
      <section id="info">


          <v-layout row wrap justify-center class="my-12">
            <v-flex xs12 sm4>
              <v-card flat class="transparent">
                <v-card-title primary-title class="layout justify-center">
                  <div class="headline">Organization Info</div>
                </v-card-title>
                <v-card-text>
                 Passerelles numériques is a French NGO created in 2005 and operating in Cambodia, the Philippines and VietnamPasserelles 
                 numériques is a French NGO created in 2005 and operating in Cambodia, the Philippines and Vietnam
                </v-card-text>
              </v-card>
            </v-flex>
            <v-flex xs12 sm4 offset-sm1>
              <v-card flat class="transparent">
                <v-card-title primary-title class="layout justify-center">
                  <div class="headline">Contact us</div>
                </v-card-title>
                <v-card-text>
                  For more information, contact us through the following details:
                </v-card-text>
                <v-list class="transparent">
                  <v-list-item>
                    <v-list-item-action>
                      <v-icon class="blue--text text--lighten-2">mdi-phone</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                      <v-list-item-title>+63 32 41 80 288</v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-action>
                      <v-icon class="blue--text text--lighten-2">mdi-map-marker</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                      <v-list-item-title>Talamban, Cebu City</v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-action>
                      <v-icon class="blue--text text--lighten-2">mdi-email</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                      <v-list-item-title>info.philippines@passerellesnumeriques.org</v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
              </v-card>
            </v-flex>
          </v-layout>
      </section>
    </v-content>
  </v-app>

</template>

 <script src="https://cdn.jsdelivr.net/npm/vue@2.x/dist/vue.js"></script>
 <script src="https://cdn.jsdelivr.net/npm/vuetify@2.x/dist/vuetify.js"></script>
 <script>
 import {
  createApplicant,
} from "../helpers/actions";
 export default {
     name: "applicantPage",
      data: () => ({
          title:"PASSERELLES NUMERIQUES PHILIPPINES",
    items: ['Female', 'Male'],
    items1:['Abuyog','Alcantara', 'Argao','Barili','Basey‎','Banban','Canlaon',
    'Carigara','Calape','Daanbantayan','Daram','Dalaguete','Isabel','Moalboal',
    'Oslob','Santander','Tubigon'],
     items2:['Bohol','Cebu', 'Leyte','Samar','Siquijor'],
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
   let keyCode = ($event.keyCode ? $event.keyCode : $event.which);
   if ((keyCode < 48 || keyCode > 57) && keyCode !== 46) { // 46 is dot
      $event.preventDefault();
   }
},
  onlyLetter($event)
{
  let keyCode = ($event.keyCode ? $event.keyCode : $event.which);
 if((event.charCode > 64 && 
event.charCode < 91) || (event.charCode > 96 && event.charCode < 123)){
  return true
} else{$event.preventDefault();
}
},
    validate() {
    
      if (this.$refs.form.validate()) {
        this.disableSubmit = true;
        this.submitRequest();
        this.firstname =this.middlename= this.lastname = this.contact = this.email = this.note = 
        this.municipality= this.gender =this.age= this.province= this.barangay = null;
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
        firstname: this.firstname.charAt(0).toUpperCase() + this.firstname.slice(1).toLowerCase() ,
        middlename:this.middlename.charAt(0).toUpperCase() + this.firstname.slice(1).toLowerCase(),
        lastname: this.lastname.charAt(0).toUpperCase() + this.firstname.slice(1).toLowerCase(),
        email: this.email,
        contact: this.contact,
        address:{
        province:this.province.charAt(0).toUpperCase() + this.firstname.slice(1).toLowerCase(), 
        municipality:this.municipality,
        barangay:this.barangay.charAt(0).toUpperCase() + this.firstname.slice(1).toLowerCase(),
        },
        age:this.age,
        gender:this.gender,

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
 }
 </script>
 <style>
 #info{
     margin-top:-100px;
 }
 
 </style>