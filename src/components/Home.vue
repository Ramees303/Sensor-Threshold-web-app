<template>
<h2 id="heading">Integrated Smart Monitoring for Elderly Care</h2>

<h4>Real-time monitoring system for enhanced elderly care and safety</h4>

<button 
  :style="{ backgroundColor: isMonitoring ? 'red' : '#2ecc71', color: 'white' }"
  @click="callTriggeSimulation">
  {{ isMonitoring ? 'Stop Monitoring' : 'Start Monitoring' }}
</button>
<SensorCard   v-if="sensorData!=null"  :sensorInfo="sensorData"/>
<ToastCard  v-if="showToast && sensorData!=null" :message= "resultKey"  :type="toastType" :key="resultKey + toastType + Date.now()" :stackIndex=3 />

</template>

<script>

import SensorCard from './Card.vue';
import axios from 'axios';
import ToastCard from './Toast.vue';

export default{
  name : 'HomePage',
  components:{
    SensorCard,
    ToastCard
  },
  data() {
    return {
      sensorData: null,
      toastMessageList: [],
      showToast: false,
      isMonitoring: false,
    };
  },
  computed :{
    statusCounts() {
      const counts = {};

      this.toastMessageList.forEach(input => {
        const status = input.status;

     
        if (!counts[status]) {
          counts[status] = 0;
        }
        counts[status]++;
      });
      return counts;
    },

    resultKey() {
    if (this.statusCounts["Level 2 Triggered"] > 0) {
      return "Level 2 Triggered";
    } else if (this.statusCounts["Level 1 Triggered"] > 0) {
      return "Level 1 Triggered";
    } else {
      return "Normal";
    }
  },

  toastType() {
  if (this.resultKey === "Level 2 Triggered") {
    return "error";
  } else if (this.resultKey === "Level 1 Triggered") {
    return "info";
  } else {
    return "success";
  }
}
    
  },
  methods:{
    async callTriggeSimulation(){
      try {
          const response = await axios.get('/api');
          const sensorUnFilterdData = [response.data]; 
          const sensorFilteredData=sensorUnFilterdData.at(0).generated_data;
          const toastMessageList=sensorUnFilterdData.at(0).prediction_results;
          this.toastMessageList=toastMessageList;
          
          this.showToast = true; 
          this.isMonitoring = !this.isMonitoring;

          if(this.isMonitoring){
            this.sensorData=sensorFilteredData;
          }else{
            this.sensorData=null;
          }
          console.log("Toast Message List:", toastMessageList);
        } catch (error) {
          console.error("API call failed:", error);
        }
    },

   
  }
}
</script>

<style scoped="local">
#heading {
    color: #003366;
}
button {
  background-color: #28a745;  /* Green for success */
  color: white;
  padding: 10px 20px;
  border-radius: 5px;
  border: none;
  cursor: pointer;
}

button:hover {
  background-color: #218838;  /* Darker green on hover */
}

</style>