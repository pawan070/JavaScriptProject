// using event listeners to handle button click and display current date and time
// document.querySelector('button').addEventListener('click', () => {
//     alert(`Current Date and Time: ${date}`);
// });


// Get the modal
var modal1 = document.getElementById("myModal1");
var modal2 = document.getElementById("myModal2");
var btn1 = document.getElementById("myBtn1");
var btn2 = document.getElementById("myBtn2");

btn1.onclick = function () {
    const date = new Date();
    modal1.style.display = "block";
    document.getElementById('date').innerHTML = 
        `Date: ${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}<br>
        Time: ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()} <br>
        Date and Time: ${date} <br>`;
}
btn2.onclick = function () {
    modal2.style.display = "block";
}

var spanElements = document.querySelectorAll(".close");
spanElements.forEach(function(span) {
    span.onclick = function () {
        modal1.style.display = "none";
        modal2.style.display = "none";
    };
});

window.onclick = function (event) {
    if (event.target == modal1 || event.target == modal2) {
        modal1.style.display = "none";
        modal2.style.display = "none";
    }
}


getWeatherBtn.onclick = async () => {
  const city = document.getElementById("locationInput").value.trim();
  if (!city) {
    forecastDiv.innerHTML = "<p>Please enter a city name.</p>";
    return;
  }

  forecastDiv.innerHTML = "<p>Loading...</p>";

  try {
    // 1️⃣ Get latitude & longitude from Open-Meteo Geocoding API
    const geoRes = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${city}`);
    const geoData = await geoRes.json();

    if (!geoData.results || geoData.results.length === 0) {
      forecastDiv.innerHTML = "<p>Location not found.</p>";
      return;
    }

    const { latitude, longitude } = geoData.results[0];

    // 2️⃣ Get 7-day forecast
    const weatherRes = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=temperature_2m_max,temperature_2m_min,weathercode&timezone=auto`);
    const weatherData = await weatherRes.json();

    // 3️⃣ Display forecast
    forecastDiv.innerHTML = "";
    weatherData.daily.time.forEach((date, index) => {
      forecastDiv.innerHTML += `<p><strong>${date}</strong>: ${weatherData.daily.temperature_2m_min[index]}°C - ${weatherData.daily.temperature_2m_max[index]}°C</p>`;
    });

  } catch (error) {
    forecastDiv.innerHTML = "<p>Something went wrong. Try again.</p>";
    console.error(error);
  }
};
