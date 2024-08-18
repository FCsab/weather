function showLoadingScreen() {
    const loadingDiv = document.createElement("div");
    loadingDiv.id = "loadingDiv";
    loadingDiv.style.position = "fixed";
    loadingDiv.style.top = "0";
    loadingDiv.style.left = "0";
    loadingDiv.style.width = "100%";
    loadingDiv.style.height = "100%";
    loadingDiv.style.backgroundColor = "rgba(0, 0, 0, 0.8)";
    loadingDiv.style.display = "flex";
    loadingDiv.style.justifyContent = "center";
    loadingDiv.style.alignItems = "center";
    loadingDiv.style.color = "white";
    loadingDiv.style.fontSize = "30px";
    loadingDiv.innerText = "Loading data...";
    document.body.appendChild(loadingDiv);
}

function hideLoadingScreen() {
    const loadingDiv = document.getElementById("loadingDiv");
    if (loadingDiv) {
        loadingDiv.remove();
    }
}

function fetchData(latitude, longitude) {
    fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,precipitation,rain,snowfall,weather_code&daily=uv_index_max,rain_sum,snowfall_sum&timezone=auto&forecast_days=1`)
        .then(response => response.json())
        .then(data => {
            let gentime = data.generationtime_ms.toFixed(5);
            let probability = data.current.precipitation;
            let temperature = data.current.temperature_2m;
            let rain = data.current.rain;
            let snowfall = data.current.snowfall;
            let uvIndex = data.daily.uv_index_max;
            let elevation = data.elevation;
            let weather_code = data.current.weather_code;
            hideLoadingScreen();

            fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`)
                .then(response => response.json())
                .then(locationData => {
                    const locationName = locationData.address.city || locationData.address.town || locationData.address.village || "Unknown location";
                    
                    document.title = `Weather Forecast - ${locationName}`;
                    const mainDiv = document.getElementById("mainDiv");
                    mainDiv.innerHTML = `
                        <p>Location: ${locationName}</p>
                        <p>${weather_codes[weather_code]}</p>
                        <p>Eleveation: ${elevation} m</p>
                        <p>Temperature: ${temperature} °C</p>
                        <p>Max UV Index: ${uvIndex}</p>
                        <p>Precipitation Probability: ${probability} %</p>
                        <p>Rain: ${rain} mm</p>
                        ${snowfall > 0 ? `<p>Snowfall: ${snowfall} cm</p>` : ''}
                        <p>Generation Time: ${gentime} ms</p>
                    `;
                })
                .catch(error => {
                    console.error("Error fetching location name: ", error);
                    const mainDiv = document.getElementById("mainDiv");
                    mainDiv.innerHTML = `
                        <p>Location: Latitude ${latitude}, Longitude ${longitude}</p>
                        <p>Temperature: ${temperature} °C</p>
                        <p>Precipitation Probability: ${probability} %</p>
                        <p>Rain: ${rain} mm</p>
                        ${snowfall > 0 ? `<p>Snowfall: ${snowfall} cm</p>` : ''}
                        <p>Generation Time: ${gentime} ms</p>
                    `;
                });
        })
        .catch(error => {
            console.error(error);
        });
}

let weather_codes = {
    0: "No clouds forming.",
    1: "Clouds are fading away.",
    2: "The sky remains unchanged.",
    3: "Clouds are forming.",
    4: "Reduced visibility due to smoke.",
    5: "Hazy conditions, but no other weather.",
    6: "Dusty air reducing visibility.",
    7: "Wind-blown dust or sand, reducing visibility.",
    8: "Dust or sand whirls are present.",
    9: "Duststorm or sandstorm seen nearby.",
    10: "Light mist is present.",
    11: "Patches of fog in low areas.",
    12: "Shallow fog is present.",
    13: "Lightning seen but no thunder.",
    14: "Rain or snow seen but not reaching the ground.",
    15: "Rain or snow seen far away.",
    16: "Rain or snow nearby but not at the station.",
    17: "Thunderstorm heard but no rain.",
    18: "Squalls seen but no rain.",
    19: "Funnel cloud seen nearby.",
    20: "Drizzle occurred recently but has stopped.",
    21: "Rain occurred recently but has stopped.",
    22: "Snow occurred recently but has stopped.",
    23: "Rain mixed with snow occurred recently but has stopped.",
    24: "Freezing rain or drizzle occurred recently but has stopped.",
    25: "Rain showers occurred recently but have stopped.",
    26: "Snow or mixed showers occurred recently but have stopped.",
    27: "Hail showers occurred recently but have stopped.",
    28: "Fog or ice fog occurred recently but has stopped.",
    29: "Thunderstorm occurred recently but has stopped.",
    30: "Duststorm or sandstorm occurred recently but has ended.",
    31: "Duststorm or sandstorm seen nearby but not at the station.",
    32: "Severe duststorm or sandstorm seen nearby but not at the station.",
    33: "Duststorm or sandstorm is lessening, and visibility is improving.",
    34: "Duststorm or sandstorm seen, no change in intensity.",
    35: "Duststorm or sandstorm is starting or getting worse.",
    36: "Severe duststorm or sandstorm is lessening, and visibility is improving.",
    37: "Severe duststorm or sandstorm seen, no change in intensity.",
    38: "Severe duststorm or sandstorm is starting or getting worse.",
    39: "Blowing snow occurred recently but has stopped.",
    40: "Fog seen nearby but not at the station.",
    41: "Fog appearing in patches.",
    42: "Fog is thinning, with the sky visible.",
    43: "Thick fog is thinning but still blocks the sky.",
    44: "Fog present, with the sky visible, no change.",
    45: "Thick fog present, blocking the sky, no change.",
    46: "Fog is thickening, with the sky visible.",
    47: "Thick fog is increasing, blocking the sky.",
    48: "Fog with rime, sky still visible.",
    49: "Thick fog with rime, blocking the sky.",
    50: "Light drizzle off and on.",
    51: "Light continuous drizzle.",
    52: "Moderate drizzle off and on.",
    53: "Moderate continuous drizzle.",
    54: "Heavy drizzle off and on.",
    55: "Heavy continuous drizzle.",
    56: "Light freezing drizzle.",
    57: "Moderate or heavy freezing drizzle.",
    58: "Light drizzle mixed with rain.",
    59: "Moderate or heavy drizzle mixed with rain.",
    60: "Light rain off and on.",
    61: "Light continuous rain.",
    62: "Moderate rain off and on.",
    63: "Moderate continuous rain.",
    64: "Heavy rain off and on.",
    65: "Heavy continuous rain.",
    66: "Light freezing rain.",
    67: "Moderate or heavy freezing rain.",
    68: "Light rain or drizzle mixed with snow.",
    69: "Moderate or heavy rain or drizzle mixed with snow.",
    70: "Light snowflakes falling off and on.",
    71: "Light continuous snow.",
    72: "Moderate snowflakes falling off and on.",
    73: "Moderate continuous snow.",
    74: "Heavy snowflakes falling off and on.",
    75: "Heavy continuous snow.",
    76: "Tiny ice crystals falling.",
    77: "Tiny snow grains falling.",
    78: "Isolated snow crystals falling.",
    79: "Ice pellets falling.",
    80: "Light rain showers.",
    81: "Moderate or heavy rain showers.",
    82: "Intense rain showers.",
    83: "Light rain and snow showers.",
    84: "Moderate or heavy rain and snow showers.",
    85: "Light snow showers.",
    86: "Moderate or heavy snow showers.",
    87: "Light snow or hail showers, possibly with rain.",
    88: "Moderate or heavy snow or hail showers, possibly with rain.",
    89: "Light hail showers, possibly with rain or snow.",
    90: "Moderate or heavy hail showers, possibly with rain or snow.",
    91: "Light rain and thunderstorm.",
    92: "Moderate or heavy rain and thunderstorm.",
    93: "Light snow and thunderstorm.",
    94: "Moderate or heavy snow and thunderstorm.",
    95: "Light rain and hail.",
    96: "Moderate or heavy rain and hail.",
    97: "Light snow or mixed precipitation with hail.",
    98: "Thunderstorm but no rain.",
    99: "Thunderstorm with duststorm or sandstorm."
};

function getLocationAndFetchData() {
    showLoadingScreen();
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            position => {
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;
                fetchData(latitude, longitude);
                setInterval(() => fetchData(latitude, longitude), 900000);
            },
            error => {
                console.error("Error getting location: ", error);

                const defaultLatitude = 47.58;
                const defaultLongitude = 19.08;
                fetchData(defaultLatitude, defaultLongitude);
                setInterval(() => fetchData(defaultLatitude, defaultLongitude), 900000);
            }
        );
    } else {
        console.error("Geolocation is not supported by this browser.");

        const defaultLatitude = 47.58;
        const defaultLongitude = 19.08;
        fetchData(defaultLatitude, defaultLongitude);
        setInterval(() => fetchData(defaultLatitude, defaultLongitude), 900000);
    }
}

getLocationAndFetchData();

const header = document.getElementById("header");
const footer = document.getElementById("footer");
const main = document.getElementById("main");
const body = document.getElementById("body");

body.style.backgroundColor = "Black";
body.style.display = "flex";
body.style.flexDirection = "column";
body.style.justifyContent = "center";
body.style.alignItems = "center";
body.style.height = "100vh";
body.style.margin = "0";

let headerText = document.createElement("h1");
headerText.innerText = "Weather Forecast";
headerText.style.color = "white";
headerText.style.fontSize = "50px";
headerText.style.fontWeight = "bold";
headerText.style.textAlign = "center";
headerText.style.backgroundColor = "black";

header.appendChild(headerText);

let mainDiv = document.createElement("div");
mainDiv.id = "mainDiv";
mainDiv.style.color = "white";
mainDiv.style.textAlign = "center";
mainDiv.style.backgroundColor = "black";
mainDiv.style.padding = "20px";
mainDiv.style.fontSize = "30px";

main.appendChild(mainDiv);

footer.style.color = "white";
footer.style.fontSize = "14px";
footer.style.textAlign = "center";
footer.style.backgroundColor = "black";
footer.style.padding = "10px";
footer.innerHTML = "Made by <a href='https://github.com/FCsab'>FCsab</a>";

body.appendChild(footer);

const style = document.createElement('style');
style.innerHTML = `
    @media (max-width: 600px) {
        body {
            height: auto;
            padding: 20px;
        }
        h1 {
            font-size: 30px;
        }
        #mainDiv {
            font-size: 20px;
            padding: 10px;
        }
        footer {
            font-size: 12px;
        }
    }
`;
document.head.appendChild(style);