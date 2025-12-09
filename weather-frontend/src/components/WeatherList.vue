<template>
  <div>
    <h1>Weather App</h1>
    <input type="text" v-model="searchTerm" placeholder="Search location..." />

    <div class="weather-grid">
      <WeatherCard
        v-for="w in filteredWeather"
        :key="w._id"
        :weather="w"
      />
    </div>
  </div>
</template>

<script>
import { ref, onMounted, computed } from "vue";
import WeatherCard from "./WeatherCard.vue";

export default {
  name: "WeatherList",
  components: { WeatherCard },
  setup() {
    const weatherData = ref([]);
    const searchTerm = ref("");

    const fetchWeather = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/weather"); // Replace with deployed backend URL later
        const data = await res.json();
        weatherData.value = data.weather;
      } catch (err) {
        console.error(err);
      }
    };

    onMounted(() => {
      fetchWeather();
    });

    const filteredWeather = computed(() =>
      weatherData.value.filter((w) =>
        w.location.toLowerCase().includes(searchTerm.value.toLowerCase())
      )
    );

    return { weatherData, searchTerm, filteredWeather };
  },
};
</script>

<style scoped>
.weather-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}
input[type="text"] {
  padding: 8px;
  margin-bottom: 16px;
  width: 300px;
}
</style>