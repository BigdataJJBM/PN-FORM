<template>
   <v-data-table
    :headers="headers"
    :items="list"
    :single-expand="singleExpand"
    :expanded.sync="expanded"
    item-key=""
    class="elevation-5 ma-5"
  >
    <template v-slot:top>
      <v-toolbar flat class="ma-5 mb-12 pa-5">
        <v-spacer></v-spacer>
        <v-toolbar-title class="text-center display-2">Student Candidates</v-toolbar-title>
        <!-- <v-text-field v-model="search" append-icon="search" label="Search" single-line hide-details></v-text-field> -->
        <v-spacer></v-spacer>
      </v-toolbar>
    </template>
    <!-- <v-text-field v-model="search" append-icon="search" label="Search" single-line hide-details></v-text-field> -->
    <template v-slot:item.action="{ item }">
      <v-btn
        x-small
        color="primary"
        :disabled="item.status == 'Pass'"
        dark
        @click="actionBtn(item)"
      >{{item.action}}</v-btn>
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
        <v-card class="pa-4">
          <v-card-title class="black--text">
            <v-list-item-avatar tile right size="62">
              <img src="../assets/pn-logo.png" />
            </v-list-item-avatar>
            <span class="headline">Applicant's Details</span>
          </v-card-title>
          <v-divider color="light-blue lighten-2"></v-divider>
          <v-list-item three-line>
            <v-list-item-content>
              <v-list-item-title>Name</v-list-item-title>
              <v-list-item-subtitle>{{firstname+" "+lastname}}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>

          <v-list-item three-line>
            <v-list-item-content>
              <v-list-item-title>Email Address</v-list-item-title>
              <v-list-item-subtitle>{{email}}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>

          <v-list-item three-line>
            <v-list-item-content>
              <v-list-item-title>Contact Number</v-list-item-title>
              <v-list-item-subtitle>{{contact}}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>

          <v-list-item three-line>
            <v-list-item-content>
              <v-list-item-title>Notes</v-list-item-title>
              <v-list-item-subtitle>{{note}}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" @click="dialog=false">close</v-btn>
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
import Swal from "sweetalert2";

export default {
  name: "Dashboard",
  data() {
    return {
      status:'On Queue',
      search:"",
      firstname: "",
      lastname: "",
      email: "",
      contact: "",
      municipality: "",
      gender: "",
      note: "",
      checked: false,
      expanded: [],
      applicants: [],
      list: [],
      singleExpand: false,
      label: "Process",
      dialog: false,
      actions: [{ title: "Cancel" }, { title: "Delete" }],
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
    details(item) {
      console.log(item);
      this.firstname = item.firstname;
      this.lastname = item.lastname;
      this.email = item.email;
      this.municipality = item.municipality;
      this.gender = item.gender;
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
        item.status = "Social Investigaion...";
      } else if (item.status == "Social Investigaion...") {
        item.action = "Pass";
        item.status ="Pass"
      }else if (item.status == "Pass") {
        item.status = "Pass";
        item.action="Pass"
     
      }
      if (item.status == "Pass") {
        console.log(this.list)
        setTimeout(() => {
          this.list.splice(this.list.indexOf(item), 1);
        }, 2000);
      }
      const data = { status: applicant.status, check: applicant.check, action: applicant.action };
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