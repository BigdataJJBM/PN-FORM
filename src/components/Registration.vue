<template>
 <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="1000px">
      <template v-slot:activator="{ on }">
        <v-btn color="light-blue accent-4" class="mt-7" @click="update" dark v-on="on">Update</v-btn>
      </template>
                 <v-card class="my-4 mx-auto px-10 pb-10" max-width="70%" elevation="5">
                  <v-form ref="form" v-model="valid" :lazy-validation="lazy">
                    <center>
                      <v-card-title>Passerelles numeriques IT Training Program 2020</v-card-title>
                    </center>
                    <center>
                      <v-card-subtitle class="pb-0">Application Form</v-card-subtitle>
                    </center>

                    <v-row>
                      <v-col cols="12" md="4">
                        <v-text-field
                          v-model="firstname"
                          :rules="nameRules"
                          label="First name"
                          required
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" md="4">
                        <v-text-field
                          v-model="middlename"
                          @keypress="onlyLetter"
                          label="Middle name"
                          required
                        ></v-text-field>
                      </v-col>

                      <v-col cols="12" md="4">
                        <v-text-field
                          @keypress="onlyLetter"
                          v-model="lastname"
                          :rules="nameRules"
                          label="Last name"
                          required
                        ></v-text-field>
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col cols="12" sm="6" md="4">
                        <v-menu
                          ref="menu"
                          v-model="menu"
                          :close-on-content-click="false"
                          :return-value.sync="date"
                          transition="scale-transition"
                          offset-y
                          min-width="290px"
                        >
                          <template v-slot:activator="{ on }">
                            <v-text-field
                              v-model="date"
                              label="Birthdate"
                              prepend-icon="event"
                              readonly
                              v-on="on"
                            ></v-text-field>
                          </template>
                          <v-date-picker v-model="date" no-title scrollable>
                            <v-spacer></v-spacer>
                            <v-btn text color="primary" @click="menu = false">Cancel</v-btn>
                            <v-btn text color="primary" @click="$refs.menu.save(date)">OK</v-btn>
                          </v-date-picker>
                        </v-menu>
                      </v-col>

                      <v-col cols="12" md="4">
                        <v-select v-model="gender" :items="items" label="Gender"></v-select>
                      </v-col>
                      <v-col cols="12" md="4">
                        <v-text-field v-model="age" @keypress="onlyNumber" label="Age" required></v-text-field>
                      </v-col>
                    </v-row>

                    <h5>Address</h5>
                    <v-row>
                      <v-col cols="12" md="4">
                        <v-text-field
                          v-model="province"
                          @keypress="onlyLetter"
                          label="Province"
                          required
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" md="4">
                        <v-select
                          v-model="municipality"
                          @keypress="onlyLetter"
                          :items="items1"
                          label="Municipality"
                        ></v-select>
                      </v-col>
                      <v-col cols="12" md="4">
                        <v-text-field
                          v-model="barangay"
                          @keypress="onlyLetter"
                          label="Barangay"
                          required
                        ></v-text-field>
                      </v-col>
                    </v-row>
                    <h5>Contact Information:</h5>
                    <v-row>
                      <v-col cols="12" md="7">
                        <v-text-field v-model="email" :rules="emailRules" label="E-mail" required></v-text-field>
                      </v-col>
                      <v-col cols="12" md="5">
                        <v-text-field
                          v-model="contact"
                          label="Contact Number"
                          @keypress="onlyNumber"
                          required
                        ></v-text-field>
                      </v-col>
                    </v-row>
                    <h5>Senior High School Education:</h5>
                    <v-row>
                      <v-col cols="12" md="7">
                        <v-text-field
                          v-model="school"
                          @keypress="onlyLetter"
                          label="Senior High School Name"
                          required
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" md="5">
                        <v-select
                          v-model="specialization"
                          :items="items2"
                          label="Choosen Senior High Field"
                        ></v-select>
                      </v-col>
                    </v-row>
                    <h5>FAMILY BACKGROUND</h5>
                    <v-row>
                      <v-col cols="12" md="7">
                        <v-text-field v-model="fatherName" label="Father Name" required></v-text-field>
                      </v-col>
                      <v-col cols="12" md="5">
                        <v-text-field
                          v-model="fatherIncome"
                          label="Father Income"
                          @keypress="onlyNumber"
                          required
                        ></v-text-field>
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col cols="12" md="7">
                        <v-text-field v-model="motherName" label="Mother Name" required></v-text-field>
                      </v-col>

                      <v-col cols="12" md="5">
                        <v-text-field
                          v-model="motherIncome"
                          label="Mother Income"
                          @keypress="onlyNumber"
                          required
                        ></v-text-field>
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col cols="12" md="3"></v-col>

                      <v-col cols="12" md="5">
                        <v-select
                          v-model="familySituation"
                          @keypress="onlyLetter"
                          :items="items3"
                          label="Family Situation"
                        ></v-select>
                      </v-col>
                    </v-row>

                    <v-textarea v-model="note" outlined name="input-7-4" label="Motivation" value></v-textarea>
                    <v-spacer></v-spacer>
                    <v-checkbox
                      v-model="checkbox"
                      :rules="[v => !!v || 'You must agree to continue!']"
                      label="Do you want to udpate this information?"
                      required
                    ></v-checkbox>

                    <v-btn color="primary" text class="ml-5" @click="dialog= false">Cancel</v-btn>
                    <v-btn
                      :disabled="!valid"
                      color="success"
                      class="mr-4"
                      @click="validate(),dialog=false"
                    >Update Request</v-btn>
                  </v-form>
                </v-card>
    </v-dialog>
  </v-row>
</template>

<script>

import {
  updateApplicant,
} from "../helpers/actions";


export default {
  name: "RegisterForm",
  data: () => ({
    menu: false,
    modal: false,
    menu2: false,
    title: "PASSERELLES NUMERIQUES PHILIPPINES",
    items: ["Female", "Male"],
    items1: [
      "Abuyog",
      "Alcantara",
      "Argao",
      "Barili",
      "Basey‎",
      "Banban",
      "Canlaon",
      "Carigara",
      "Calape",
      "Daanbantayan",
      "Daram",
      "Dalaguete",
      "Isabel",
      "Moalboal",
      "Oslob",
      "Santander",
      "Tubigon"
    ],
    items2: [
      "ABM",
      "AGRI-FISHERY",
      "HUMSS",
      "HOME ECOMOMICS",
      "STEM",
      "ICT",
      "PRE-BACCALAUREATE",
      "INDUSTRIAL ARTS",
      "GENERAL ACADEMIC",
      "TVL MARITIME",
      "SPORTS",
      "ARTS AND DESIGN"
    ],
    items3: [
      "Married",
      "Live-in",
      "Separated",
      "Father left",
      "Father died",
      "Mother left",
      "Mother died",
      "Bothe left",
      "Both died"
    ],
    status: "For Examination",
    action: "For SI",
    dialog: false,
    valid: true,
    search: "",
    firstname: "",
    middlename: "",
    lastname: "",
    date: new Date().toISOString().substr(0, 10),
    gender: "",
    age: "",
    contact: "",
    province: "",
    municipality: "",
    barangay: "",
    school:"",
    specialization:"",
    fatherName:"",
    fatherIncome:"",
    motherName:"",
    motherIncome:"",
    familySituation:"",
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

    currentDate: new Date().toISOString().substr(0, 10),
    checkbox: false,
    lazy: false,
    dataHours: [],
    disable: true
  }),

  methods: {
    update : function () {
      var applicant = JSON.parse(localStorage.getItem('applicant'))
      this.firstname = applicant.firstname;
      this.middlename = applicant.middlename;
      this.lastname = applicant.lastname;
      this.email = applicant.email;
      this.gender = applicant.gender;
      this.age = applicant.age;
      this.date = applicant.birthdate;
      this.barangay = applicant.address.barangay;
      this.province = applicant.address.province;
      this.municipality = applicant.address.municipality;
      this.school = applicant.seniorhighSchoolBackground.school;
      this.specialization = applicant.seniorhighSchoolBackground.specialization;
      this.fatherIncome = applicant.familyBackground.fatherIncome;
      this.fatherName = applicant.familyBackground.fatherName;
      this.motherName = applicant.familyBackground.motherName;
      this.motherIncome = applicant.familyBackground.motherIncome;
      this.familySituation = applicant.familyBackground.familySituation;
      this.gender = applicant.gender;
      this.contact = applicant.contact;
      this.note = applicant.note;
    },
    onlyNumber($event) {
      let keyCode = $event.keyCode ? $event.keyCode : $event.which;
      if ((keyCode < 48 || keyCode > 57) && keyCode !== 46) {
        $event.preventDefault();
      }
    },
    onlyLetter($event) {
      if (
        (event.charCode > 64 && event.charCode < 91) ||
        (event.charCode > 96 && event.charCode < 123)
      ) {
        return true;
      } else {
        $event.preventDefault();
      }
    },
    validate() {
      if (this.$refs.form.validate()) {
        this.disableSubmit = true;
        this.submitRequest();
        this.firstname = this.middlename = this.lastname = this.contact = this.email = this.note  = this.gender = this.age = this.municipality= this.province = this.barangay = this.school=this.specialization=this.fatherName=
        this.fatherIncome=this.motherName=this.motherIncome=this.familySituation= null;
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
        firstname:
          this.firstname.charAt(0).toUpperCase() +
          this.firstname.slice(1).toLowerCase(),
        middlename:
          this.middlename.charAt(0).toUpperCase() +
          this.middlename.slice(1).toLowerCase(),
        lastname:
          this.lastname.charAt(0).toUpperCase() +
          this.lastname.slice(1).toLowerCase(),
        email: this.email,
        contact: this.contact,
        birthdate:this.date,
        age: this.age,
        gender: this.gender,
        address: {
          province:
            this.province.charAt(0).toUpperCase() +
            this.province.slice(1).toLowerCase(),
          municipality: this.municipality,
          barangay:
            this.barangay.charAt(0).toUpperCase() +
            this.barangay.slice(1).toLowerCase()
        },
        seniorhighSchoolBackground:{
          school:this.school,
          specialization:this.specialization,
        },
        familyBackground:{
          fatherName:this.fatherName,
          fatherIncome:this.fatherIncome,
          motherName:this.motherName,
          motherIncome:this.motherIncome,
          familySituation:this.familySituation,
        },
        note: this.note,
        status: this.status,
        action: this.action
      };
      updateApplicant(data, JSON.parse(localStorage.getItem('applicant'))._id)
        .then(data => {
          this.$emit("updateApplicant", data.data);
          localStorage.removeItem('applicant')
        })
        .catch(err => alert(err.error));
    }
  },
  mounted() {}
};
</script>
 <style>
#info {
  margin-top: -100px;
}
</style>