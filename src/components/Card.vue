<template>

  <table class="center" style="width: 50%;   box-shadow: 1px 1px 6px #2c3e50; border-radius: 1rem;">
    <tr style="height: 2.5rem; " v-if="sensors!=null">
      <td> Hour </td>
      <td>Temperature</td>
      <td>Humidity </td>
      <td> Activity</td>
    </tr>
    <tr v-for="sensor in sensors" :key="sensor.id" style="height: 2.5rem; ">
      <td > {{ sensor.hour }}</td>
      <td :class="[getSensorColorCodes(sensor).temperatureColor]" :style="getFlashStyle(getSensorColorCodes(sensor).temperatureColor)">{{ sensor.temperature.toFixed(2) }}°C</td>
      <td :class="[getSensorColorCodes(sensor).humidityColor]" :style="getFlashStyle(getSensorColorCodes(sensor).humidityColor)">  {{ sensor.humidity.toFixed(2) }}%</td>
      <td :class="[getSensorColorCodes(sensor).activityColor]" :style="getFlashStyle(getSensorColorCodes(sensor).activityColor)"> {{ sensor.any_activity }}</td>
    </tr>
  </table>
  
    
  </template>
  
  <script>
  export default {
    name : "SensorCard",
    props :{
    sensorInfo: {
      type: Array,
      required:true
    }
  },
   computed : {
      sensors (){
        return this.sensorInfo
      }
    },
  
    methods: {

      getFlashStyle(color) {
      return {
        '--flash-color': color === 'blue' ? '#66b2ff' :       // soft blue
                     color === 'orange' ? '#ffb347' :     // soft orange
                     color === 'yellow' ? '#ffe066' :     // warm yellow
                     color === 'grey' ? '#a9a9a9' :       // medium grey
                     '#cccccc'    
      };
    },
    
 
    getSensorColorCodes(sensor) {
    const result = {};

    // ✅ Temperature
    if (sensor.temperature < 18.0) {
      result.temperatureColor = 'blue';
    } else if (sensor.temperature > 28.0) {
      result.temperatureColor = 'orange';
    } else {
      result.temperatureColor = 'default'; // Normal color
    }

    // ✅ Humidity
    if (sensor.humidity < 30 || sensor.humidity > 60) {
      result.humidityColor = 'yellow';
    } else {
      result.humidityColor = 'default'; // Normal color
    }

    // ✅ Activity
    if (sensor.any_activity === 0) {
      result.activityColor = 'grey';
      result.activityLabel = 'Inactive';
    } else if (sensor.any_activity === 1) {
      result.activityColor = 'default'; // Normal
      result.activityLabel = 'Active';
    } else {
      result.activityColor = 'grey'; // Fallback
      result.activityLabel = 'Unknown';
    }

    return result;
  }
    }
  };
  </script>
  
  <style scoped>
 .card-body {
    padding: .5rem;
    display: flex;
    /* border : 2px solid red; */
    border-radius: 10px;
    justify-content: space-around;
    margin: 2rem ;
    background-color: white;
    box-shadow: 3px 4px 6px #2c3e50;
    
    
  }


  .card-item {
    margin: 0.5rem;
    width: 18rem;
    /* border: 2px solid red; */
    background-color: white;
    box-shadow: 3px 4px 6px #2c3e50;
    border-radius: 10px;
    
  }
  
  .card-item p {
    font-size: 16px;
    margin: 5px 0;
    background-color: transparent;
  }
  
  .card-item span {
    font-weight: bold;
  }


  @keyframes flash {
  0% {
     background-color: inherit;
     }
  50% { 
    background-color: var(--flash-color);  
   } 
  100% { 
    background-color: inherit;
   }
}

.flash {
  animation: flash 5s infinite;
}

.blue { 
  color: black;
  background-color: var(--flash-color);
}


.orange { 
  color: black;
  background-color: var(--flash-color);

}
.yellow { 
  color: black;
  background-color: var(--flash-color);
}
.grey { 
  color: black;
  background-color: var(--flash-color);
}
.default {
  color: black;
  background-color: var(--flash-color);
  }

  .center {
  margin-left: auto;
  margin-right: auto;
  margin-top:2.5rem;
  padding: auto;
}


table {
  border-collapse: collapse;
}

td {
  border-bottom: 0.1px solid #506e8b;
}


tr:first-child td:first-child {
  border-top-left-radius: 1rem;
}
tr:first-child td:last-child {
  border-top-right-radius: 1rem;
}


tr:last-child td:first-child {
  border-bottom-left-radius: 1rem;
}
tr:last-child td:last-child {
  border-bottom-right-radius: 1rem;
}

tr:last-child td {
  border-bottom: none !important;
}

  

  </style>
  