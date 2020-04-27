<template>
  <div id="app">
    <!-- <imgDisplay msg="Welcome"/> -->
    <imgt msg="Welcome"/>

  </div>
</template>

<script>
// import imgDisplay from './components/imgDisplay.vue'
import imgt from "./components/imgt.vue";
export default {
  name: 'App',
  components: {
    // imgDisplay,
    imgt
  }
}
</script>

<style>
#app {
  height: auto;
}
</style>
