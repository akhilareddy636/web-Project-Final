<template>
  <div class="weather-card">
    <h3>{{ weather.location }}</h3>
    <p>Temperature: {{ weather.temperature }}°C</p>
    <p>Condition: {{ weather.weatherCondition }}</p>
    <p>Forecast: {{ weather.forecast }}</p>
  </div>
</template>

<script>
export default {
  name: "WeatherCard",
  props: {
    weather: {
      type: Object,
      required: true
    }
  }
};
</script>

<style scoped>
.weather-card {
  border: 1px solid #ccc;
  padding: 12px;
  border-radius: 8px;
  margin: 8px;
  background-color: #f0f8ff;
  width: 200px;
  text-align: center;
}
</style>