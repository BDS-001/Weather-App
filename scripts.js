const errorMessageDiv = document.getElementById('errorMessage');

function errorHandler(error) {
    console.log(error)
    errorMessageDiv.textContent = `Error: ${error.message}`;
    errorMessageDiv.style.display = 'block';
}

async function getweatherData(apiKey, location) {
    try {
    const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${location}&days=3`, {mode: 'cors'})
    const weatherData = await response.json()
    console.log(weatherData)

    if (weatherData.error) {
        errorHandler(weatherData.error)
    } else {
        errorMessageDiv.style.display = 'none';
        console.log(weatherData['location']['name'])
        console.log(weatherData['forecast']['forecastday'][0])
        console.log(weatherData['forecast']['forecastday'][1])
        console.log(weatherData['forecast']['forecastday'][2])
        return weatherData
    }

    } catch (error) {
        errorHandler(error)
    }
}

function createElementHelper(element, content) {
    const htmlElement = document.createElement(element)
    htmlElement.textContent = content
    return htmlElement
}

async function displayWeatherData(data) {
    console.log(data, 'data')
    if (data && data['forecast'] && data['forecast']['forecastday']) {
        const forcastsDivs = document.querySelectorAll('.day')
        const forcastData = data['forecast']['forecastday']
        for (let index = 0; index < forcastData.length; index++) {
            const day = forcastsDivs[index]
            day.append(createElementHelper('div', forcastData[index].date))
            day.append(createElementHelper('div', forcastData[index].day.avgtemp_c))
            day.append(createElementHelper('div', forcastData[index].day.avghumidity))
            day.append(createElementHelper('div', forcastData[index].day.condition.text))
        }
    }
}
document.getElementById('weatherForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    const location = document.getElementById('locationInput').value;
    const apiKey = document.getElementById('apiKeyInput').value;
    const data = await getweatherData(apiKey, location)
    displayWeatherData(data)

});