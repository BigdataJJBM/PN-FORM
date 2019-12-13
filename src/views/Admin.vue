<template>
  <v-data-table
    :headers="headers"
    :items="list"
    :single-expand="singleExpand"
    :expanded.sync="expanded"
    item-key
    class="elevation-5 ma-5"
  >
    <template v-slot:top>
      <v-toolbar flat class="ma-5 mb-12 pa-5">
        <v-spacer></v-spacer>
        <v-toolbar-title class="text-center display-2">Student Candidates:{{list.length}}</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-text-field v-model="search" append-icon="search" label="Search" single-line hide-details></v-text-field>
      </v-toolbar>
    </template>
    <v-text-field v-model="search" append-icon="search" label="Search" single-line hide-details></v-text-field>
    <template v-slot:item.action="{ item }">
      <v-btn
        x-small
        color="primary"
        :disabled="item.status == 'Pass'"
        dark
        @click="actionBtn(item)"
      >{{item.action}}</v-btn>
      <v-btn
        x-small
        color="warning"
        :disabled="item.status == 'Fail'"
        dark
        @click="actionBtn1(item)"
      >Fail</v-btn>
      <v-menu bottom left>
        <template v-slot:activator="{ on }">
          <v-btn icon v-on="on">
            <v-icon>mdi-delete-forever</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item v-for="(action, i) in actions" :key="i" @click="menu(item, action.title)">
            <v-list-item-title>{{ action.title }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </template>
    <template v-slot:item.status="{ item }">
      <span>{{item.status}}</span>
    </template>

    <template v-slot:item.info="{ item }">
      <v-dialog v-model="dialog" max-width="500px">
        <template v-slot:activator="{ on }">
          <v-icon small @click="details(item)" v-on="on">mdi-information</v-icon>
        </template>
        <v-card max-width="500" class="mx-auto">
          <v-card-title class="black--text">
            <v-list-item-avatar tile right size="62">
              <img src="../assets/pn-logo.png" />
            </v-list-item-avatar>
            <span class="headline">Applicant's Details</span>
          </v-card-title>
          <v-divider color="light-blue lighten-2"></v-divider>
          <v-list-item two-line>
            <v-list-item-content>
              <v-list-item-title class="text-md-center">Name</v-list-item-title>
              <v-list-item-title>First Name: {{firstname}}</v-list-item-title>
              <v-list-item-title>Middle Name: {{middlename}}</v-list-item-title>
              <v-list-item-title>Last Name: {{lastname}}</v-list-item-title>
              <v-list-item-title>Year Applied: {{batch}}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item two-line>
            <v-list-item-content>
              <v-list-item-title>Birthdate:{{date}}</v-list-item-title>
              <v-list-item-title>Gender: {{gender}}</v-list-item-title>
              <v-list-item-title>Age:{{age}}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item three-line>
            <v-list-item-content>
              <v-list-item-title class="text-md-center">Address</v-list-item-title>
              <v-list-item-title>Barangay:{{barangay}}</v-list-item-title>
              <v-list-item-title>Municipality: {{municipality}}</v-list-item-title>
              <v-list-item-title>Province:{{province}}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item three-line>
            <v-list-item-content>
              <v-list-item-title class="text-md-center">Contact Information</v-list-item-title>
              <v-list-item-title>Contact Number: {{contact}}</v-list-item-title>
              <v-list-item-title>Email: {{email}}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item three-line>
            <v-list-item-content>
              <v-list-item-title class="text-md-center">Senior High School Background</v-list-item-title>
              <v-list-item-title>Senior High School: {{school}}</v-list-item-title>
              <v-list-item-title>Specialization: {{specialization}}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item three-line>
            <v-list-item-content>
              <v-list-item-title class="text-md-center">Family Background</v-list-item-title>
              <v-list-item-title>Father Name: {{fatherName}}</v-list-item-title>
              <v-list-item-title>Father Income: {{fatherIncome}}</v-list-item-title>
              <v-list-item-title>Mother Name: {{motherName}}</v-list-item-title>
              <v-list-item-title>MOther Income: {{motherIncome}}</v-list-item-title>
              <v-list-item-title>Family Situation: {{familySituation}}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item three-line>
            <v-list-item-content>
              <v-list-item-title>Motivation</v-list-item-title>
              <v-list-item-subtitle>{{note}}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>

          <v-card-actions>
            <v-spacer></v-spacer>

            <RegisterForm />
            <v-btn color="blue darken-1" @click="dialog=false, reloadPage()">close</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </template>
    <template v-slot:item.date="{ item }">
      <span>{{item.date.substr(0, 10)}}</span>
    </template>
  </v-data-table>
</template>

<script>
import {
  getApplicant,
  deleteApplicant,
  updateApplicant
} from "../helpers/actions";

import RegisterForm from "../components/Registration";
import Swal from "sweetalert2";

export default {
  name: "Dashboard",
  components: {
    RegisterForm
  },
  data() {
    return {
      status: "On Queue",
      search: "",
      firstname: "",
      middlename: "",
      lastname: "",
      date: "",
      gender: "",
      age: "",
      contact: "",
      province: "",
      municipality: "",
      barangay: "",
      school: "",
      specialization: "",
      fatherName: "",
      fatherIncome: "",
      motherName: "",
      motherIncome: "",
      familySituation: "",
      email: "",
      note: "",
      batch: "",
      checked: false,
      expanded: [],
      applicants: [],
      list: [],
      list2: [],
      singleExpand: false,
      label: "Process",
      dialog: false,
      actions: [{ title: "Delete" }],
      headers: [
        {
          text: "Firstname",
          align: "left",
          value: "firstname"
        },
        {
          text: "Lastname",
          value: "lastname"
        },

        {
          text: "Municipality",
          value: "address.municipality"
        },
        {
          text: "Gender",
          value: "gender"
        },
        { text: "Comment", value: "status", sortable: false },
        { text: "Actions", value: "action", sortable: false },
        { text: "", value: "info" }
      ]
    };
  },
  methods: {
    filter() {
      this.applicants.forEach(item => {
        if (item.status != "Pass") {
          this.list.push(item);
        }
      });
    },
    reloadPage() {
      window.location.reload();
    },
    details(item) {
      console.log(item);
      localStorage.setItem("applicant", JSON.stringify(item));
      this.firstname = item.firstname;
      this.lastname = item.lastname;
      this.middlename = item.middlename;
      this.email = item.email;
      this.gender = item.gender;
      this.age = item.age;
      this.date = item.birthdate;
      this.barangay = item.address.barangay;
      this.province = item.address.province;
      this.municipality = item.address.municipality;
      this.school = item.seniorhighSchoolBackground.school;
      this.specialization = item.seniorhighSchoolBackground.specialization;
      this.fatherIncome = item.familyBackground.fatherIncome;
      this.fatherName = item.familyBackground.fatherName;
      this.motherName = item.familyBackground.motherName;
      this.motherIncome = item.familyBackground.motherIncome;
      this.familySituation = item.familyBackground.familySituation;
      this.gender = item.gender;
      this.batch = item.batch;
      this.contact = item.contact;
      this.note = item.note;
    },
    menu(item, title) {
      if (title == "Delete") {
        this.alertDelete(item);
      }
    },
    deleteApplicant(item) {
      const index = this.applicants.indexOf(item);
      const applicant = this.applicants[index];
      console.log(applicant);
      deleteApplicant(applicant._id)
        .then(() => this.$emit("deleteApplicant", applicant._id))
        .catch(err => alert(err));
      this.retrieveApplicant();
    },

    retrieveApplicant() {
      getApplicant()
        .then(data => ((this.applicants = data.data), console.log(data.data)))
        .catch(err => alert(err));
    },

    actionBtn(item) {
      console.log(item);
      const index = this.applicants.indexOf(item);
      const applicant = this.applicants[index];
      if (item.status == "For Examination") {
        item.action = "Pass";
        item.status = "For Social Investigation";
      } else if (item.status == "For Social Investigation") {
        item.action = "Pass";
        item.status = "Pass";
      }
      if (item.status == "Pass") {
        console.log(this.list);
        setTimeout(() => {
          this.list.splice(this.list.indexOf(item), 1);
        }, 2000);
      }
      const data = {
        check: applicant.check,
        action: applicant.action,
        status: applicant.status
      };
      updateApplicant(data, applicant._id)
        .then(data => {
          this.$emit("updateApplicant", data.data);
          this.retrieveApplicant();
          console.log(data.data);
        })
        .catch(err => alert(err.error));
    },
    actionBtn1(item) {
      console.log(item);
      const index = this.applicants.indexOf(item);
      const applicant = this.applicants[index];
      item.status = "Fail";
      if (item.status == "Fail") {
        console.log(this.list);
        setTimeout(() => {
          this.list.splice(this.list.indexOf(item), 1);
        }, 2000);
      }
      const data = {
        check: applicant.check,
        status: applicant.status
      };
      updateApplicant(data, applicant._id)
        .then(data => {
          this.$emit("updateApplicant", data.data);
          console.log(data.data);
        })
        .catch(err => alert(err.error));
    },

    alertDelete(item) {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
        reverseButtons: true
      }).then(result => {
        if (result.value) {
          this.reloadPage();
          this.deleteApplicant(item);
          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            type: "success",
            showConfirmButton: false,
            timer: 1500
          });
        }
      });
    }
  },

  mounted() {
    getApplicant()
      .then(data => ((this.applicants = data.data), this.filter()))
      .catch(err => alert(err));
  }
};
</script>
<style scoped>
.black--text label {
  color: black;
}
</style>