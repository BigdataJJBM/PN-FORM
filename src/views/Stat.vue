<template>
  <div>
    <apexchart width="500" type="bar" :options="options" :series="series"></apexchart>
  </div>
</template>
<script>
import Vue from "vue";
import VueApexCharts from "vue-apexcharts";
Vue.use(VueApexCharts);
Vue.component("apexchart", VueApexCharts);
// import { getByLocation } from "../helpers/actions";

import { getApplicantStat } from "../helpers/actions";
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
      getApplicantStat()
        .then(data => {
          this.options = data.data;
          console.log(data.data);
        })
        .catch(err => alert(err));
    }
  },
  mounted() {
    getApplicantStat()
      .then(data => {
        console.log(data);
        data.forEach(element => {
          this.options.xaxis.categories.push(element.municipality);
          var pass=0;
          var fail=0
          var pending=0;
          for (var counter = 0; counter < element.reports.length; counter++) {   
              var count =  element.reports[counter].count;    
            if (element.reports[counter].status == "Pass") {
                pass+=count;
            } else if (element.reports[counter].status == "Fail") {
                fail+=count;
            } else{
                pending+=count;
            }
            
          }
           console.log(pass)
            this.series[0].data.push(pass); 
            this.series[1].data.push(fail);
            this.series[2].data.push(pending);

          //    this.series[0].data.push(element.reports.count);
          // //    this.series[1].data.push(data[0][key]);
        });
        // console.log(JSON.stringify(data[0]));
        // for (var key in data[0]) {
        //   if (data[0].hasOwnProperty(key)) {
        //     console.log("this is the key " + key);
        //     this.options.xaxis.categories.push(key);
        //     this.series[0].data.push(data[0][key]);
        //     this.series[1].data.push(data[0][key]);
        //   }
        // }
      })
      .catch(err => alert(err));
  }
};
</script>
<style>
</style>
