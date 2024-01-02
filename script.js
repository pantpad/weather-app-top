const API_KEY = "a658fc69faf74c2c820205545232512";

async function getData(QUERY) {
  let url = `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${QUERY}&aqi=no`;
  const response = await fetch(url, { mode: "cors" });
  const data = await response.json();
  if (!response.ok) {
    //handleError
    console.log(data.error.message);
  }
  return data;
}

const searchBar = document.getElementById("searchBar");
const searchBtn = document.getElementById("searchBtn");
const resultBoxContainer = document.getElementById("resultBoxContainer");

async function getMeteo() {
  let QUERY = searchBar.value;
  if (QUERY == "") return;

  createResultBox(await getData(QUERY));
}

function createResultBox(data) {
  console.log(data);
  let html = `<div class="resultBox">
    <h2>${data.location.name}</h2>
    <p>${data.current.temp_c}°C</p>
    <p>Fells Like: ${data.current.feelslike_c} C</p>
    <p>Humidity: ${data.current.humidity} %</p>
    <p>Wind: ${data.current.wind_kph} kph</p>
  </div>`;
  console.log(html);
  resultBoxContainer.innerHTML = "";
  resultBoxContainer.innerHTML = html;
}

searchBtn.addEventListener("click", getMeteo);
