async function getweatherData(apiKey, location) {
    const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${location}&days=3`, {mode: 'cors'})
    const weatherData = await response.json()
    
    console.log(weatherData)
    console.log(weatherData['location']['name'])
    console.log(weatherData['forecast']['forecastday'][0])
    console.log(weatherData['forecast']['forecastday'][1])
    console.log(weatherData['forecast']['forecastday'][2])
}

document.getElementById('weatherForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const location = document.getElementById('locationInput').value;
    const apiKey = document.getElementById('apiKeyInput').value;
    getweatherData(apiKey, location)
});