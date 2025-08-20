var modal1 = document.getElementById("myModal1");
var modal2 = document.getElementById("myModal2");
var modal3 = document.getElementById("myModal3");
var btn1 = document.getElementById("myBtn1");
var btn2 = document.getElementById("myBtn2");
var btn3 = document.getElementById("myBtn3");

btn1.onclick = function () {
    modal1.style.display = "block";
}
btn2.onclick = function () {
    modal2.style.display = "block";
}
btn3.onclick = function () {
    console.log('inside btn3 onclick');
    modal3.style.display = "block";
    const now = new Date();

    const hours = now.getHours();
    let greeting = "Hello 👋";
    if (hours < 12) greeting = "Good Morning ";
    else if (hours < 17) greeting = "Good Afternoon ";
    else if (hours < 21) greeting = "Good Evening ";
    else greeting = "Good Night 🌙";

    document.getElementById("greeting").textContent = greeting;
    const time = now.toLocaleTimeString("en-IN", { hour12: true });
    document.getElementById("clock").textContent = time;
    const dateStr = now.toLocaleDateString("en-IN", { weekday: "long", year: "numeric", month: "long", day: "numeric" });
    document.getElementById("date").textContent = dateStr;
}

var spanElements = document.querySelectorAll(".close");
spanElements.forEach(function (span) {
    span.onclick = function () {
        modal1.style.display = "none";
        modal2.style.display = "none";
        modal3.style.display = "none";
    };
});

window.onclick = function (event) {
    if (event.target == modal1 || event.target == modal2 || event.target == modal3) {
        modal1.style.display = "none";
        modal2.style.display = "none";
        modal3.style.display = "none";
        modal4.style.display = "none";
    }
}

const getWeatherBtn = document.getElementById("getWeatherBtn");
const forecastDiv = document.getElementById("forecastDiv");
getWeatherBtn.onclick = async () => {
    console.log('inside getWeatherBtn onclick');
    const city = document.getElementById("locationInput").value.trim();
    if (!city) {
        forecastDiv.innerHTML = "<p>Please enter a city name.</p>";
        return;
    }
    forecastDiv.innerHTML = "<p>Loading...</p>";
    try {
        const geoRes = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${city}`);
        const geoData = await geoRes.json();
        // console.log('Geo data of the location is ** ', geoData.results);
        if (!geoData.results || geoData.results.length === 0) {
            forecastDiv.innerHTML = "<p>Location not found.</p>";
            return;
        }
        const { latitude, longitude } = geoData.results[0];
        const weatherRes = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=temperature_2m_max,temperature_2m_min,weathercode&timezone=auto`);
        const weatherData = await weatherRes.json();
        forecastDiv.innerHTML = "";
        console.log('Weather Data:', weatherData);
        weatherData.daily.time.forEach((date, index) => {
            forecastDiv.innerHTML += `<p><strong>${date}</strong>: ${weatherData.daily.temperature_2m_min[index]}°C - ${weatherData.daily.temperature_2m_max[index]}°C</p>`;
        });
    } catch (error) {
        forecastDiv.innerHTML = "<p>Something went wrong. Try again.</p>";
        console.error(error);
    }
};

// git user search script starts
const searchGithub = document.getElementById("searchGithub");
searchGithub.onclick = async () => {
    console.log('inside searchGithub onclick');
    const resultDiv = document.getElementById("githubResult");
    const username = document.getElementById("githubInput").value.trim();
    if (!username) {
        resultDiv.innerHTML = "<p>Please enter a username.</p>";
        return;
    }
    resultDiv.innerHTML = "<p>Loading...</p>";
    try {
        const res = await fetch(`https://api.github.com/users/${username}`);
        if (!res.ok) {
            resultDiv.innerHTML = "<p>User not found.</p>";
            return;
        }
        const data = await res.json();
        resultDiv.innerHTML = `
        <img src="${data.avatar_url}" alt="${data.login} avatar">
        <h3>${data.name || data.login}</h3>
        <p><strong>Bio:</strong> ${data.bio || "No bio available"}</p>
        <p><strong>Public Repos:</strong> ${data.public_repos}</p>
        <p><strong>Followers:</strong> ${data.followers}</p>
        <p><a href="${data.html_url}" target="_blank">View Profile</a></p>
        `;
    } catch (error) {
        resultDiv.innerHTML = "<p>Something went wrong. Try again.</p>";
        console.error(error);
    }
}
// git user search script ends