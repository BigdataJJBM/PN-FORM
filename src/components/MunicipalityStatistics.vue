<template>
<v-card class="ma-12 mb-12 pa-12">
   <v-card-title  class="display-1">
      Percentage of Applicants who Pass per Municipality
  </v-card-title>
  <apexchart id="municipalitystat" width="600" type="donut" :options="chartOptions" :series="series" labelField="name"></apexchart>
   <v-layout justify-center>
        <v-col cols="12" md="5" align-self ="center">
      <ul>
  <li v-for="(item, index) in series" :key="index">
    For the Municipality of {{chartOptions.labels[index]}} - {{series[index]}} passer/passers
  </li>
</ul>

        </v-col>
   </v-layout>
  </v-card>
</template>
<script>
import Vue from "vue";
import VueApexCharts from "vue-apexcharts";
Vue.use(VueApexCharts);
Vue.component("apexchart", VueApexCharts);
import { getByLocation } from "../helpers/actions";
export default {
  props:{
    
  },
  data: function() {
    return {
      options: {},
      series: [],
      chartOptions: {
        labels: [],
        dataLabels: {
          enabled: true,
          formatter: function(val) {
            return parseFloat(val).toFixed(2) + "%";
          }
        },
        responsive: [
          {
            breakpoint: 480,
            options: {
              chart: {
                width: 200
              },
              legend: {
                show: true
              }
            }
          }
        ],
        legend: {
          position: "right",
          offsetY: 0,
          height: 230
        }
      }
    };
    },

  methods: {
    town: function (series) {
    return series.filter(function (val) {
      return val
    })
  },
    retriveLocation() {
      getByLocation()
        .then(data => {
          this.options = data.data;
          console.log(data.data);
        })
        .catch(err => alert(err));
    }
  },
  mounted() {
    getByLocation()
      .then(data => {
        console.log(JSON.stringify(data[0]));
        for (var key in data[0]) {
          if (data[0].hasOwnProperty(key)) {
            console.log("this is the key " + key);
            this.chartOptions.labels.push(key);
            this.series.push(data[0][key]);
          }
        }
      })
      .catch(err => alert(err));
  }
};
</script>
<style>
#municipalitystat{
  margin-left: 25%;
}
</style>
