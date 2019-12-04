<template>
  <v-card class="ma-5 mb-12 pa-5">
    <v-card-title class="display-2">
      List of Passers
      <v-spacer></v-spacer>
      <v-text-field v-model="search" append-icon="search" label="Search" single-line hide-details></v-text-field>
    </v-card-title>
    <v-data-table :headers="headers" :items="applicants" :search="search">
      <template v-slot:item.action="{ item }">
        <v-icon small @click="alertDelete(item)">mdi-delete</v-icon>
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
import Swal from "sweetalert2";
import { getApplicantDone, deleteApplicant } from "../helpers/actions";

export default {
  name: "Pass",
  data() {
    return {
      search: "",
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
        {
          text: "Actions",
          value: "action",
          sortable: false
        }
      ],
    applicants: []
    };
  },
  methods: {
    deleteApplicant(item) {
      const index = this.applicants.indexOf(item);
      const applicant = this.applicants[index];
      console.log(applicant);
      deleteApplicant(applicant._id)
        .then(() => this.$emit("deleteAppointment", applicant._id))
        .catch(err => alert(err));
      this.retrieveApplicant();
    },

    retrieveApplicant() {
      getApplicantDone()
        .then(data => ((this.applicants = data.data), console.log(data.data)))
        .catch(err => alert(err));
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
   getApplicantDone()
      .then(data => ((this.applicants = data.data), console.log(data.data)))
      .catch(err => alert(err));
  }
};
</script>
