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


document.getElementById('weatherForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    const location = document.getElementById('locationInput').value;
    const apiKey = document.getElementById('apiKeyInput').value;
    const data = await getweatherData(apiKey, location)

});