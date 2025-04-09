# Weather Forecast Application

A responsive web application that provides detailed weather forecasts for locations around the world. This project uses the WeatherAPI.com service to fetch and display weather data in an intuitive and visually appealing format.



## Features

- **Location-based Weather Forecasts**: Search for weather forecasts using city name, latitude/longitude, postal code, or IP address
- **Multi-day Forecasts**: View weather predictions for up to 3 days
- **Hourly Breakdowns**: Access detailed hourly weather information for each forecast day
- **Dynamic Backgrounds**: Weather conditions are visually represented with appropriate background images
- **Responsive Design**: Works on mobile devices and desktop browsers
- **Detailed Weather Data**: Includes temperature, condition descriptions, humidity, wind speed, and precipitation chances

## Technologies Used

- HTML5
- CSS3
- JavaScript (ES6+)
- WeatherAPI.com API
- Asynchronous JavaScript (Promises/Async-Await)

## Getting Started

### Prerequisites

To use this application, you'll need:
- A modern web browser
- A WeatherAPI.com API key (free tier available)

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/weather-forecast-app.git
   ```

2. Navigate to the project directory:
   ```
   cd weather-forecast-app
   ```

3. Open `index.html` in your web browser

### Using the Application

1. Enter a location in the search box (city name, coordinates, postal code, or IP)
2. Enter your WeatherAPI.com API key
3. Select the number of forecast days (1-3)
4. Click "Get Weather"
5. View the detailed weather forecast

## API Key

This application requires an API key from WeatherAPI.com:
- Create a free account at [WeatherAPI.com](https://www.weatherapi.com/)
- Obtain your API key from the dashboard
- Enter the key when prompted by the application

**Note:** For security best practices in a production environment, API keys should be stored securely on the server side and not exposed in client-side code.

## Project Structure

```
weather-forecast-app/
├── index.html          # Main HTML structure
├── style.css           # CSS styling
├── scripts.js          # JavaScript functionality
└── resources/          # Background images and assets
    └── backgrounds/
        ├── cloudy.png
        ├── mist.png
        ├── rain.png
        ├── snow.png
        ├── sunny.png
        └── thunder.png
```

## Dynamic Weather Visualization

The application changes the background image based on the current weather condition code:
- Thunder/storms
- Cloudy conditions
- Mist/fog
- Rain/precipitation
- Snow/winter conditions
- Sunny/clear skies

## License

[MIT License](LICENSE.md)

## Acknowledgments

- Weather data provided by [WeatherAPI.com](https://www.weatherapi.com/)
- Icons and weather condition graphics from WeatherAPI.com
