const errorMessageDiv = document.getElementById('errorMessage');

function errorHandler(error) {
    console.log(error)
    errorMessageDiv.textContent = `Error: ${error.message}`;
    errorMessageDiv.style.display = 'block';
}

async function getweatherData(apiKey, location, forcastDays) {
    try {
    const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${location}&days=${forcastDays}`, {mode: 'cors'})
    const weatherData = await response.json()
    console.log(weatherData)

    if (weatherData.error) {
        errorHandler(weatherData.error)
    } else {
        errorMessageDiv.style.display = 'none';
        return weatherData
    }

    } catch (error) {
        errorHandler(error)
    }
}

function createElementHelper(element, innerContent, className='', options = false) {
    const htmlElement = document.createElement(element)
    if (innerContent) htmlElement.textContent = innerContent
    if (options) {
        options.forEach(option => {
            htmlElement.setAttribute(option.attribute, option.value)
        });
    }
    htmlElement.className = className
    return htmlElement
}

function dateTimeConverter(dateTime) {
    const date = new Date(dateTime);

    const timeIn12HourFormat = date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true
    });

    return timeIn12HourFormat
}

const backgroundImageMap = {
    'resources/backgrounds/thunder.png': [1087,1273,1276,1279,1282],
    'resources/backgrounds/cloudy.png': [1003,1006,1009],
    'resources/backgrounds/mist.png': [1030,1135,1147,],
    'resources/backgrounds/rain.png': [1063,1072,11501153,1168,1171,1180,1183,1186,1189,1192,1195,1198,1201,1240,1243,1246],
    'resources/backgrounds/snow.png': [1066,1069,1114,1117,1204,1207,1210,1213,1216,1219,1222,1225,1237,1249,1252,1255,1258,1261,1264],
    'resources/backgrounds/sunny.png': [1000,],
}

function mapBackgroundImage(code) {
    for (const key of Object.keys(backgroundImageMap)) {
        if (backgroundImageMap[key].includes(code)) {
            return `url('${key}')`; 
        }
    }
    return '';
}

async function displayWeatherData(data) {
    console.log(data)
    const daysOfWeek = ['Sun', 'Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat'];
    const weatherContainer = document.querySelector('.weather-container')
    const location = document.querySelector('.location')
    location.innerHTML = (data.location.region && data.location.region != data.location.name) ? `${data.location.name}, ${data.location.region}` : data.location.name
    weatherContainer.innerHTML = ''

    if (data && data['forecast'] && data['forecast']['forecastday']) {
        const forcastData = data['forecast']['forecastday']
        for (let index = 0; index < forcastData.length; index++) {
            const day = createElementHelper('div', false, 'day')
            const date = new Date(forcastData[index].date);
            const dayOfWeekNumber = date.getDay();

            day.append(createElementHelper('h1', daysOfWeek[dayOfWeekNumber], 'day-of-the-week'))
            day.append(createElementHelper('div',forcastData[index].date, 'weather-date',))
            const dailyWeatherContainer = createElementHelper('div', false, 'daily-weather-container')

            const conditionContainer = createElementHelper('div', false, 'condition-container')
            const conditionContainerText = createElementHelper('div', false, 'condition-container-text')
            conditionContainerText.append(createElementHelper('div',forcastData[index].day.avgtemp_c + "\u00B0C", 'weather-temp'))
            conditionContainerText.append(createElementHelper('div', forcastData[index].day.condition.text))
            conditionContainer.append(conditionContainerText)
            conditionContainer.append(createElementHelper('img', false, 'condition-container-icon', [{attribute: 'src', value: `https:${forcastData[index].day.condition.icon}`}]))  
            dailyWeatherContainer.append(conditionContainer)

            const dailyWeatherStats = createElementHelper('div', false, 'daily-weather-stats')
            dailyWeatherStats.append(createElementHelper('div','Humidity: ' + forcastData[index].day.avghumidity, 'weather-humidity'))
            dailyWeatherStats.append(createElementHelper('div','Wind: ' + forcastData[index].day.maxwind_kph, 'weather-wind-speed'))
            const rainChance = forcastData[index].day.daily_chance_of_rain
            const snowChance = forcastData[index].day.daily_chance_of_snow
            if (rainChance > 0) dailyWeatherStats.append(createElementHelper('div','Chance to Rain: ' + rainChance + '%', 'weather-chance-to-rain'))
            if (snowChance > 0) dailyWeatherStats.append(createElementHelper('div','Chance to Snow: ' + snowChance + '%', 'weather-chance-to-snow'))
            dailyWeatherContainer.append(dailyWeatherStats)

            day.append(dailyWeatherContainer)
            const hourlyWeatherConatainer = createElementHelper('div', false, 'hourly-weather-container')

            forcastData[index].hour.forEach(function(hourlyWeatherData) {
                const weatherHour = createElementHelper('div', false, 'hour-container')
                weatherHour.append(createElementHelper('div', dateTimeConverter(hourlyWeatherData.time), 'hour-time'))
                weatherHour.append(createElementHelper('div', hourlyWeatherData.temp_c + "\u00B0C", 'hour-temp'))
                weatherHour.append(createElementHelper('img', false, 'hour-icon', [{attribute: 'src', value: `https:${hourlyWeatherData.condition.icon}`}]))  
                weatherHour.append(createElementHelper('div', hourlyWeatherData.condition.text, 'hour-condition'))
                hourlyWeatherConatainer.append(weatherHour)
            })

            day.append(hourlyWeatherConatainer)
            day.style.backgroundImage = mapBackgroundImage(forcastData[index].day.condition.code);

            weatherContainer.append(day)
        }
    }
}

document.getElementById('weatherForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    const location = document.getElementById('locationInput').value;
    const apiKey = document.getElementById('apiKeyInput').value;
    const forecastDays = document.getElementById('forecastDays').value;
    const data = await getweatherData(apiKey, location, forecastDays)
    displayWeatherData(data)
});