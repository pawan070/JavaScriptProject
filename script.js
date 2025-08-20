var modal1 = document.getElementById("myModal1");
var modal2 = document.getElementById("myModal2");
var modal3 = document.getElementById("myModal3");
var modal4 = document.getElementById("myModal4");
var btn1 = document.getElementById("myBtn1");
var btn2 = document.getElementById("myBtn2");
var btn3 = document.getElementById("myBtn3");
var btn4 = document.getElementById("myBtn4");

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
    const time = now.toLocaleTimeString("en-US", { hour12: true });
    document.getElementById("clock").textContent = time;
    const dateStr = now.toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" });
    document.getElementById("date").textContent = dateStr;
}
btn2.onclick = function () {
    modal2.style.display = "block";
}
btn1.onclick = function () {
    modal1.style.display = "block";
}
btn4.onclick = function () {
    modal4.style.display = "block";
}

var spanElements = document.querySelectorAll(".close");
spanElements.forEach(function (span) {
    span.onclick = function () {
        modal1.style.display = "none";
        modal2.style.display = "none";
        modal3.style.display = "none";
        modal4.style.display = "none";
    };
});

window.onclick = function (event) {
    if (event.target == modal1 || event.target == modal2 || event.target == modal3 || event.target == modal4) {
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
        console.log('Geo data of the location is ** ', geoData.results);
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

// calculator script starts
const display = document.getElementById('display');
const keys = document.querySelector('.keys');

function insert(val) {
    if (display.value === '0' && /[0-9.]/.test(val)) {
        display.value = val;
    } else {
        display.value += val;
    }
}

function evaluateExpr(expr) {
    const safe = expr.replace(/\s+/g, '');
    if (!/^[0-9+\-*/%.()]+$/.test(safe)) throw new Error('Invalid input');
    // Replace % with /100 for simple percentage behavior
    const normalized = safe.replace(/%/g, '/100');
    // eslint-disable-next-line no-new-func
    return Function(`"use strict"; return (${normalized});`)();
}

function equals() {
    try {
        const result = evaluateExpr(display.value);
        display.value = Number.isFinite(result) ? String(result) : 'Error';
    } catch {
        display.value = 'Error';
    }
}

function del() {
    display.value = display.value.length > 1 ? display.value.slice(0, -1) : '0';
}

keys.addEventListener('click', e => {
    const btn = e.target.closest('button');
    if (!btn) return;

    const val = btn.dataset.value;
    const action = btn.dataset.action;

    if (val) insert(val);
    if (action === 'clear') display.value = '0';
    if (action === 'delete') del();
    if (action === 'equals') equals();
});

document.addEventListener('keydown', e => {
    const map = { Enter: 'equals', '=': 'equals', Escape: 'clear', Backspace: 'delete' };
    if (map[e.key] === 'equals') { e.preventDefault(); equals(); }
    else if (map[e.key] === 'clear') { display.value = '0'; }
    else if (map[e.key] === 'delete') { del(); }
    else if (/^[0-9+\-*/%.()]$/.test(e.key)) { insert(e.key); }
});
// calculator script ends

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