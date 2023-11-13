<template>
<div>
    <h1>{{weather.cityName ? weather.cityName : "Loading"}}</h1>
</div>
  <div class="weather">
  <div v-for="day in weather.dailyTemps" :key="day.dayName">
    <WeatherDay
      :day="day.dayName"
      :minTemp="day.minTemp"
      :maxTemp="day.maxTemp"
      :weather="day.weatherState"
    />
  </div>
  </div>
</template>
<script>
import * as api from "../api"
import WeatherDay from "@/components/WeatherDay.vue";

export default {

  name: "WeatherDisplayer",
  components: {WeatherDay},
  data() {
    return {
      weather: {}
    }
  },
  setup() {
    return {}
  },
  async mounted() {
   this.weather = await api.getWeather()
    console.log(this.weather)
  }
}


</script>
