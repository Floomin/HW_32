const baseUrl = 'http://api.openweathermap.org/data/2.5/weather?';
const apiKey = 'd5e5cf68a96f2aa25ea1ca879d08a6b1';
const loc = document.getElementById('city-input');
const units = 'units=metric';
const wetherIconUrl = 'http://openweathermap.org/img/w/';


function getWeather() {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();

        xhr.open('GET', `${baseUrl}q=${loc.value}&${units}&appid=${apiKey}`, true);

        xhr.onload = function () {
            if (xhr.status === 200) {
                const data = JSON.parse(xhr.responseText);
                resolve(data);
            } else {
                reject(`Error: ${xhr.status}`);
            }
        }
        xhr.onerror = function () {
            reject('Request failed');
        };

        xhr.send();
    });
}



function createWidget() {
    getWeather()
        .then(weatherData => {

            const weatherIcon = `${wetherIconUrl}${weatherData.weather[0].icon}.png`;


            const date = new Date(weatherData.dt * 1000);
            const sunrise = new Date(weatherData.sys.sunrise * 1000);
            const sunset = new Date(weatherData.sys.sunset * 1000);


            const weatherWidgetHTML = `
                <div class="weather-widget">
                    <p class="weather-widget__date">${date.toLocaleDateString()}</p>
                    <div class="weather-widget__main">
                        <div class="weather-widget__location">
                            <p class="weather-widget__city-name">${weatherData.name}</p>
                            <div class="weather-widget__coordinates">
                                <img class="weather-widget__icon" src="images/compass.png" alt="Compass Icon" />
                                <p class="weather-widget__coords-text">${weatherData.coord.lat}, ${weatherData.coord.lon}</p>
                            </div>
                        </div>
                        <div class="weather-widget__current">
                            <p class="weather-widget__temperature">${weatherData.main.temp}°C</p>
                            <img class="weather-widget__icon" src="${weatherIcon}" alt="Weather Icon" />
                            <p class="weather-widget__description">${weatherData.weather[0].description}</p>
                        </div>
                    </div>
                    <div class="weather-widget__details">
                        <div class="weather-widget__row">
                            <div class="weather-widget__temperature-range">
                                <img class="weather-widget__icon" src="images/temperature.png" alt="Temperature Icon" />
                                <div class="weather-widget__temp-values">
                                    <p class="weather-widget__temp-min">Мин: ${weatherData.main.temp_min}°C</p>
                                    <p class="weather-widget__temp-max">Макс: ${weatherData.main.temp_max}°C</p>
                                    <p class="weather-widget__feels-like">Ощущается как: ${weatherData.main.feels_like}°C</p>
                                </div>
                            </div>
                            <div class="weather-widget__wind">
                                <img class="weather-widget__icon" src="images/wind.png" alt="Wind Icon" />
                                <p class="weather-widget__wind-text">
                                    <span class="weather-widget__wind-direction" style="display: inline-block; transform: rotate(${weatherData.wind.deg}deg);">↑</span>
                                    ${weatherData.wind.speed} м/с
                                </p>
                            </div>
                        </div>
                        <div class="weather-widget__row">
                            <div class="weather-widget__clouds">
                                <img class="weather-widget__icon" src="images/clouds.png" alt="Cloud Icon" />
                                <p class="weather-widget__cloudiness">Облачность: ${weatherData.clouds.all}%</p>
                            </div>
                            <div class="weather-widget__humidity">
                                <img class="weather-widget__icon" src="images/humidity.png" alt="Humidity Icon" />
                                <p class="weather-widget__humidity-text">Влажность: ${weatherData.main.humidity}%</p>
                            </div>
                        </div>
                    </div>
                    <div class="weather-widget__sun-times">
                        <p class="weather-widget__pressure">Давление: ${weatherData.main.pressure} hPa</p>
                        <p class="weather-widget__sunrise">Рассвет: ${sunrise.toLocaleTimeString()}</p>
                        <p class="weather-widget__sunset">Закат: ${sunset.toLocaleTimeString()}</p>
                    </div>
                </div>
            `;

            const weatherInfoContainer = document.getElementById('weather-info');
            weatherInfoContainer.innerHTML += weatherWidgetHTML;
        })
        .catch(error => {
            console.error('Ошибка получения данных о погоде:', error);
        });
}



function addWidget(event) {
    event.preventDefault();
    createWidget();
}

const weatherForm = document.getElementById('weather-form');
weatherForm.addEventListener('submit', addWidget);