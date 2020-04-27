<!--
 * @Descripttion: 
 * @version: 
 * @Author: xiaoka
 * @Date: 2020-04-14 17:10:32
 * @LastEditors: xiaoka
 * @LastEditTime: 2020-04-26 11:31:16
 -->
<template>
  <div id="app">
    <!-- <imgDisplay msg="Welcome"/> -->
    <!-- <imgt msg="Welcome"/> -->
    <homepage />
  </div>
</template>

<script>
// import imgDisplay from './components/imgDisplay.vue'
// import imgt from "./components/imgt.vue";
import homepage from "./components/homepage.vue";

export default {
  name: 'App',
  components: {
    // imgDisplay,
    // imgt,
    homepage
  }
}
</script>

<style>
#app {
  height: 100%;
}
</style>
