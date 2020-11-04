<template>
  <div id="app">
    <div id="nav">      
      <forum-title></forum-title>
      <router-link to="/mineIndex">mineIndex</router-link>
    </div>
    <router-view />
  </div>
</template>


<script>

import ForumTitle from "@/components/index/ForumTitle.vue";
export default {  
  components: {
    ForumTitle
  },
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
}

#nav {
  margin-bottom: 30px;
  padding: 0;
  font-weight: bold;
}


.body {  
  font-family: "Helvetica Neue",Helvetica,Arial,sans-serif;
}
</style>
