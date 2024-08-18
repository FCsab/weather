function fetchData(latitude, longitude) {
    fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,precipitation,rain,snowfall&daily=uv_index_max,rain_sum,snowfall_sum&timezone=auto&forecast_days=1`)
        .then(response => response.json())
        .then(data => {
            let gentime = data.generationtime_ms.toFixed(5);
            let probability = data.current.precipitation;
            let temperature = data.current.temperature_2m;
            let rain = data.current.rain;
            let snowfall = data.current.snowfall;

            // Fetch the location name using a reverse geocoding API
            fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`)
                .then(response => response.json())
                .then(locationData => {
                    const locationName = locationData.address.city || locationData.address.town || locationData.address.village || "Unknown location";

                    const mainDiv = document.getElementById("mainDiv");
                    mainDiv.innerHTML = `
                        <p>Location: ${locationName}</p>
                        <p>Temperature: ${temperature} °C</p>
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

function getLocationAndFetchData() {
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