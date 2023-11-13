<template>
  <div style="display: flex;align-items: center;flex-direction: column">
    <h3 style="font-style: ">{{this.day}}</h3>
    <div style="display: flex;flex-direction: row;justify-content: space-between">
    <p>Min: {{this.minTemp}}&nbsp;&nbsp;</p>
    <p>Max: {{this.maxTemp}}</p>
    </div>
    <p>Weather: {{this.weather}}</p>
    <br/>
  </div>
</template>
<script>

export default {
  name: "WeatherDay",
  data() {
    return {}
  },
  props: {
    day: {
      type: String,
      required: true
    },
    minTemp: {
      type: Number,
      required: true
    },
    maxTemp: {
      type: Number,
      required: true
    },
    weather: {
      type: String,
      required: true
    }
  },
}
</script>
