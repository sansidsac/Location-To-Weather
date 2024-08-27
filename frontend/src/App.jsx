const App = () => {
  const googleMapApiKey = import.meta.env.VITE_GOOGLE_MAP_API_KEY;
  const weatherApiKey = import.meta.env.VITE_WEATHER_API_KEY;
  const getWeather = () => {
    const location = document.getElementById("search");
    const weather = document.getElementById("output");
    let area = location.value;
    area = area.replace(/[, ]+/g, "%");
    axios
      .get(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${area}&key=${googleMapApiKey}`
      )
      .then((response1) => {
        let lat = response1.data.results[0].geometry.location.lat;
        let lng = response1.data.results[0].geometry.location.lng;
        axios
          .get(
            `http://api.weatherapi.com/v1/current.json?key=${weatherApiKey}&q=${lat},${lng}&aqi=no`
          )
          .then((response2) => {
            return response2.data;
          })
          .then((data) => {
            console.log(data);
            weather.innerHTML = `<p>Temperature: ${data.current.temp_c}°C</p><p>Wind: ${data.current.wind_kph} km/h</p><p>Description: ${data.current.condition.text}</p>`;
          })
          .catch((error) => {
            console.error("Error fetching the weather data:", error);
          });
      })
      .catch((error) => {
        console.error("Error fetching the weather data:", error);
      });
  };
  return (
    <> 
      <div className="container">
      <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-center mt-8 mb-6">
        Location to Weather
      </h1>
      </div>
      <div className="form flex flex-col sm:flex-row items-center justify-center mb-6">
        <label
          htmlFor="search"
          className="font-bold text-black text-xl sm:text-3xl md:text-4xl lg:text-4xl mb-2 sm:mb-0 sm:mr-4">
          Enter Location:
        </label>
        <input
          className="w-full sm:w-auto md:ml-4 px-3 py-2 sm:py-3 text-lg font-bold rounded-lg border focus:outline focus:outline-2 focus:outline-offset-2 bg-white text-gray-700 focus:outline-gray-400 border-gray-300"
          placeholder="London"
          id="search"></input>
        <button
          className="mt-3 sm:mt-0 sm:ml-4 w-full sm:w-auto px-4 py-2 text-lg font-bold rounded-lg bg-gray-800 text-white hover:bg-gray-700 focus:outline-none transition duration-150"
          id="submit"
          onClick={getWeather}>
          Get Weather →
        </button>
      </div>
      <div className="output">
        <p
          id="output"
          className="text-xl sm:text-2xl md:text-3xl text-gray-600 ml-4 mt-4"></p>
      </div>
    </>
  );
};

export default App;
