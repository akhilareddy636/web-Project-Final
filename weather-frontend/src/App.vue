<template>
  <div id="app">
    <WeatherList />
  </div>
</template>

<script>
import WeatherList from "./components/WeatherList.vue";

export default {
  name: "App",
  components: { WeatherList },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  margin-top: 20px;
}
</style>