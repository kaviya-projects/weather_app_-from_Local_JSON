import React, { useState } from "react";

function App() {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState("");

  const getWeather = async () => {
    if (!city.trim()) {
      setError("Please enter a city name");
      setWeatherData(null);
      return;
    }

    try {
      const res = await fetch("/weather.json");
      const data = await res.json();

      const matched = data.find(
        (entry) => entry.city.toLowerCase() === city.toLowerCase()
      );

      if (!matched) {
        setError("City not found in data.");
        setWeatherData(null);
      } else {
        setWeatherData(matched);
        setError("");
      }
    } catch (err) {
      console.error("Error reading JSON:", err);
      setError("Something went wrong loading the data.");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: 40 }}>
      <h2>📂 Weather from Local JSON</h2>
      <input
        type="text"
        placeholder="Enter city"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        style={{ padding: 8 }}
      />
      <button onClick={getWeather} style={{ padding: 8, marginLeft: 10 }}>
        Get Weather
      </button>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {weatherData && (
        <div style={{ marginTop: 20 }}>
          <h3>Weather in {weatherData.city}</h3>
          <p>🌡️ Temp: {weatherData.temperature}°C</p>
          <p>💧 Humidity: {weatherData.humidity}%</p>
          <p>☁️ Description: {weatherData.description}</p>
        </div>
      )}
    </div>
  );
}

export default App;
