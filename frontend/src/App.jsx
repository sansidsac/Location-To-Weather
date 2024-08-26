const App = () => {
const  googleMapApiKey=import.meta.env.VITE_GOOGLE_MAP_API_KEY;
const  weatherApiKey=import.meta.env.VITE_WEATHER_API_KEY;
const getWeather=()=>{
    const location=document.getElementById("search");
    const weather=document.getElementById("output");
    let area=location.value;
    area=area.replace(/[, ]+/g, '%');
    axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${area}&key=${googleMapApiKey}`)
    .then((response1)=>{
        let lat=response1.data.results[0].geometry.location.lat;
        let lng=response1.data.results[0].geometry.location.lng;
        axios.get(`http://api.weatherapi.com/v1/current.json?key=${weatherApiKey}&q=${lat},${lng}&aqi=no`)
        .then((response2)=>{
            return response2.data
        })
        .then((data)=>{
            console.log(data)
            weather.innerHTML=`<p>Temperature: ${data.current.temp_c}°C</p><p>Wind: ${data.current.wind_kph} km/h</p><p>Description: ${data.current.condition.text}</p>`
        })
        .catch((error)=>{
            console.error('Error fetching the weather data:', error);
        })
    })
    .catch((error)=>{
        console.error('Error fetching the weather data:', error);
    })
}
  return (
    <>
        <h1 className="text-3xl font-bold text-center">Location to Weather</h1>
    <div className="form">
        <label htmlFor="search">Enter Location:</label>
        <input type="text" id="search" placeholder="Enter Location"/>
        <button id="submit" onClick={getWeather}>Submit</button>
    </div>
    <div className="output">
        <p id="output"></p>
    </div>
    </>
  )
}

export default App
