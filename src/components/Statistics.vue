<template>
     <apexchart width="380" type="donut" :options="options" :series="series"></apexchart>  
</template>
<script>
import Vue from 'vue'

import VueApexCharts from 'vue-apexcharts'
Vue.use(VueApexCharts)

Vue.component('apexchart', VueApexCharts)
import  {getByLocation} from '../helpers/actions'
export default {
    data: function() {
    return {
      options: {},
      series: [100, 60, 20, 10, 5,5]
    }
  },
   mounted() {
     getByLocation()
      .then(data => (this.municipality = data.data, console.log(data.data)))
      .catch(err => alert(err));
  }
  
};
</script>
