<template>
  <div>
    <v-card class="ma-12 mb-21 pa-9">
      <v-card-title class="display-1">Percentage Passers, On Process and Failed in this Year</v-card-title>
      <div id="chart">
        <apexchart
          class="justify-center"
          width="600"
          type="bar"
          :options="options"
          :series="series"
        ></apexchart>
      </div>
    </v-card>
  </div>
</template>
<script>
import Vue from "vue";
import VueApexCharts from "vue-apexcharts";
Vue.use(VueApexCharts);
Vue.component("apexchart", VueApexCharts);

import { getApplicantBatch } from "../helpers/actions";
export default {
  props: {},
  data: function() {
    return {
      options: {
        chart: {
          id: "vuechart-example"
        },
        xaxis: {
          categories: []
        }
      },
      series: [
        {
          name: "Pass",
          data: []
        },
        {
          name: "Fail",
          data: []
        },
        {
          name: "pending",
          data: []
        }
      ]
    };
  },
  methods: {
    town: function(series) {
      return series.filter(function(val) {
        return val;
      });
    },
    retriveStat() {
      getApplicantBatch()
        .then(data => {
          this.options = data.data;
          console.log(data.data);
        })
        .catch(err => alert(err));
    }
  },
  mounted() {
    getApplicantBatch()
      .then(data => {
        // console.log(data);
        data.forEach(element => {
          this.options.xaxis.categories.push(element.batch);
          console.log(element);
          var pass = 0;
          var fail = 0;
          var pending = 0;
          for (var counter = 0; counter < element.reports.length; counter++) {
            console.log(element.reports[counter].status);
            var count = element.reports[counter].count;
            if (element.reports[counter].status == "Pass") {
              pass += count;
            } else if (element.reports[counter].status == "Fail") {
              fail += count;
            } else {
              pending += count;
            }
          }
          this.series[0].data.push(pass);
          this.series[1].data.push(fail);
          this.series[2].data.push(pending);
        });
      })
      .catch(err => alert(err));
  }
};
</script>
<style>
</style>
