<template>
 <Home/>
</template>

<script>

import Home from './components/Home.vue'

export default {
  name: 'App',
  components :{
      Home
  },

}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

* {
 
  font-family: 'Roboto', sans-serif;
  background-color: #f0f0f0;
}


</style>
