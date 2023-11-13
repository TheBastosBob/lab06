import * as geo from './geo.js';

export async function getWeather() {
    const location = await geo.getLocation();
    const cityName = await reverseGeocode(location);

    const params = {
        "latitude": location.coords.latitude,
        "longitude": location.coords.longitude,
        "daily": "temperature_2m_max,temperature_2m_min,precipitation_sum,rain_sum,snowfall_sum",
    };
    const weatherUrl = "https://api.open-meteo.com/v1/forecast";
    console.log(weatherUrl + "?" + new URLSearchParams(params));

    const response = await fetch(weatherUrl + "?" + new URLSearchParams(params));
    const data = await response.json();
    const today = new Date().toISOString().split('T')[0];
    const todayIndex = data.daily.time.indexOf(today);

    const dailyTemps = data.daily.time.map((time, index) => {
        const dayDifference = index - todayIndex;
        let dayName;

        if (dayDifference === 0) {
            dayName = "Today";
        } else {
            // Adjust the date based on the day difference
            const adjustedDate = new Date();
            adjustedDate.setDate(adjustedDate.getDate() + dayDifference);
            dayName = adjustedDate.toLocaleDateString('en-US', { weekday: 'long' });
        }

        const maxTemp = data.daily.temperature_2m_max[index];
        const minTemp = data.daily.temperature_2m_min[index];
        const rainSum = data.daily.rain_sum[index];
        const snowfallSum = data.daily.snowfall_sum[index];

        let weatherState = 'clear';
        if (snowfallSum > 0) {
            weatherState = 'snowy';
        } else if (rainSum > 0) {
            weatherState = 'rainy';
        } else if (maxTemp > 0 && maxTemp < 5) {
            weatherState = 'cloudy';
        }

        return {
            dayName,
            maxTemp,
            minTemp,
            weatherState
        };
    });

    return {
        cityName,
        dailyTemps
    }
}


export async function reverseGeocode(location) {
    //https://geocode.maps.co/reverse?lat=40.7558017&lon=-73.9787414
    const params = {
        "lat": location.coords.latitude,
        "lon": location.coords.longitude,
    }
    const geocodeUrl = "https://geocode.maps.co/reverse";

    const response = await fetch(geocodeUrl + "?" + new URLSearchParams(params));
    const data = await response.json();
    return data.address.city;
}
