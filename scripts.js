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

async function displayWeatherData(data) {
    console.log(data)
    const daysOfWeek = ['Sun', 'Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat'];
    const weatherContainer = document.querySelector('.weather-container')
    weatherContainer.innerHTML = ''

    if (data && data['forecast'] && data['forecast']['forecastday']) {
        const forcastData = data['forecast']['forecastday']
        for (let index = 0; index < forcastData.length; index++) {
            const day = createElementHelper('div', false, 'day')
            const date = new Date(forcastData[index].date);
            const dayOfWeekNumber = date.getDay();

            day.append(createElementHelper('h1', daysOfWeek[dayOfWeekNumber]))
            day.append(createElementHelper('div',forcastData[index].date, 'weather-date',))

            const conditionContainer = createElementHelper('div', false, 'condition-container')
            const conditionContainerText = createElementHelper('div', false, 'condition-container-text')

            conditionContainerText.append(createElementHelper('div',forcastData[index].day.avgtemp_c + "\u00B0C", 'weather-temp'))
            conditionContainerText.append(createElementHelper('div', forcastData[index].day.condition.text))

            conditionContainer.append(conditionContainerText)
            conditionContainer.append(createElementHelper('img', false, '', [{attribute: 'src', value: `https:${forcastData[index].day.condition.icon}`}]))
            
            day.append(conditionContainer)

            day.append(createElementHelper('div','Humidity: ' + forcastData[index].day.avghumidity, 'weather-humidity'))

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