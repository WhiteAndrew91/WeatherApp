import React, { useState } from "react";
import PlacesAutocomplete from "react-places-autocomplete";
import { ExternalLink } from "react-external-link";

const api = {
  key: "81d97de1af8644934cddf9c29dae4778",
  url: "https://api.openweathermap.org/data/2.5/",
};

function App() {
  const [weather, setWeather] = useState({});
  const [address, setAddress] = useState("");

  function searchClick() {
    fetch(
      `${api.url}weather?q=${address},{country code}&units=metric&APPID=${api.key}`
    ).then(async (response) => {
      if (response.status === 200) {
        const result = await response.json();
        setWeather(result);
        setAddress("");
      } else if (response.status === 404) {
        window.alert("Please enter a valid city!");
      }
    });
  }

  function dateBuilder(d) {
    let months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    let days = [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];

    return `${day} ${date} ${month}`;
  }

  return (
    <>
      <div className="weatherApp">
        <div className="backBtn">
          <ExternalLink
            href="http://main.emdev.ro/"
            title="Back"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src="./images/iconback.png" alt="BackButton" />
          </ExternalLink>
        </div>
        <div className="searchbar">
          <div id="icon" title="Search">
            <img
              className="search-icon"
              src="../images/search.png"
              alt="Search"
              onClick={searchClick}
            />
          </div>
          <PlacesAutocomplete value={address} onChange={setAddress}>
            {({
              getInputProps,
              suggestions,
              getSuggestionItemProps,
              loading,
            }) => (
              <div>
                <input
                  className="suggestionInp"
                  id="inp"
                  {...getInputProps({
                    placeholder: "Search City...",
                  })}
                ></input>
                <div className="suggestionItems">
                  {loading && <div id="loadingDiv"> Loading... </div>}
                  {suggestions.map((suggestion) => {
                    const style = {
                      backgroundColor: suggestion.active ? "#818181" : "white",
                      padding: "2vh 2vw 2vh 2vw",
                      alignItems: "center",
                      zIndex: "1",
                    };

                    return (
                      <li
                        {...getSuggestionItemProps(suggestion, {
                          style,
                        })}
                        key={suggestion.placeId}
                      >
                        {suggestion.description}
                      </li>
                    );
                  })}
                </div>
              </div>
            )}
          </PlacesAutocomplete>
        </div>
        {typeof weather.main != "undefined" ? (
          <>
            <main>
              <section className="location">
                <div className="city">
                  {weather.name}, {weather.sys.country}
                </div>
                <div className="date"> {dateBuilder(new Date())} </div>
                <div className="temp"> {Math.round(weather.main.temp)}° C </div>
              </section>
              <section className="current">
                <div className="weather"> {weather.weather[0].main} </div>
                <div className="weatherIcon">
                  <img
                    src={
                      "http://openweathermap.org/img/w/" +
                      weather.weather[0].icon +
                      ".png"
                    }
                    alt="WeatherIcon"
                  />
                </div>
                <div className="hi-low values">
                  {Math.round(weather.main.temp_max)}° c /
                  {Math.round(weather.main.temp_min)}° c
                </div>
              </section>
            </main>
          </>
        ) : (
          ""
        )}
      </div>
    </>
  );
}

export default App;
