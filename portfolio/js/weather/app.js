/**
 * Capitalizes the first letter of a string
 * @param {string} s - The string to capitalize
 * @returns {string} - The capitalized string
 */
const capitalize = s => s && s[0].toUpperCase() + s.slice(1);

/**
 * Initializes the weather application when the DOM is fully loaded
 */
document.addEventListener("DOMContentLoaded", populateTableRows);

/**
 * Fetches weather data for Dublin and populates the HTML table with the result
 * @returns {Promise<void>}
 */
async function populateTableRows() {
  try {
    const API_KEY = 'bc425ac2188d406c884f4fdd88b339f0';
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=dublin,ie&units=metric&APPID=${API_KEY}`
    );

    if (!response.ok) {
      console.error(`Error Status Code: ${response.status}`);
      return;
    }

    const data = await response.json();

    // Create table rows with weather information
    const strTableRows = `
      <tr>
        <td><span>Summary</span></td>
        <td>${capitalize(data.weather[0].description)}</td>
      </tr>
      <tr>
        <td><span>Temperature</span></td>
        <td>${data.main.temp} &deg;C</td>
      </tr>
      <tr>
        <td><span>Humidity</span></td>
        <td>${data.main.humidity} %</td>
      </tr>
      <tr>
        <td><span>Pressure</span></td>
        <td>${data.main.pressure} Pa</td>
      </tr>`;

    // Insert table rows into DOM
    document.querySelector("#table-weather-dublin tbody").innerHTML = strTableRows;
  } catch (error) {
    // Handle any error from fetch or parsing
    console.error('Error fetching weather data:', error);
  }
}

/**
 * Changes the background image based on the current time
 * Sets night image from 11PM to 6AM, day image otherwise
 */
function changeBackground() {
  const currentHour = new Date().getHours();

  // Set background to night if hour is between 0-6 or after 23
  const isNight = currentHour > 23 || currentHour <= 6;
  const backgroundImage = isNight
    ? "url('assets/img/dublin-night.jpg')"
    : "url('assets/img/dublin-day.jpg')";

  document.querySelector(".theme-js").style.backgroundImage = backgroundImage;
}

// Set the appropriate background image when script loads
changeBackground();