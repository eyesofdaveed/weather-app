const city = document.querySelector("#city");
const submit = document.querySelector("#submit");

const body = document.querySelector("body");
const container = document.querySelector(".container");

const temperature = document.querySelector("#temperature");
const condition = document.querySelector("#condition");

function displayWeather() {
  let cityVal = city.value.trim();

  let api_url = `https://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=AcLcn3F5r4TMZmfAAxkNkwmqDbtr9N5C&q=${cityVal}`;
  axios.get(api_url).then((response) => {
    let cityKey = response.data[0].Key;
    let weather_url = `https://dataservice.accuweather.com/currentconditions/v1/${cityKey}?apikey=AcLcn3F5r4TMZmfAAxkNkwmqDbtr9N5C&details=true`;
    axios.get(weather_url).then((response) => {
        let cityObj = response.data[0];
        let day = cityObj.IsDayTime;
        if (day == true) {
            body.className = "day-bg";
            container.className = "container day";
        } else {
            body.className = "night-bg";
            container.className = "container night";
        }
        temperature.innerText = cityObj.Temperature.Metric.Value + "°" +cityObj.Temperature.Metric.Unit;
        condition.innerText =cityObj.WeatherText;
    })
  });
}

submit.addEventListener("click", () => {
  displayWeather();
});
