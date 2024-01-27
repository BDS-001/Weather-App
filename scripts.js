document.getElementById('weatherForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const location = document.getElementById('locationInput').value;
    const apiKey = document.getElementById('apiKeyInput').value;

    async function getweatherData(apiKey, location) {
        const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}`, {mode: 'cors'})
        const weatherData = await response.json()
        console.log(weatherData)
    }

    getweatherData(apiKey, location)
});