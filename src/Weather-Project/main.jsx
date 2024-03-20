import React, { useEffect, useState } from "react";
import GetData from "./callweatherdata";
import Loadingcomponent from "./loading";
import "./weather.css";
import 'bootstrap/dist/css/bootstrap.min.css';

function Main (){
    const[name, setName] = useState("")
    const[hasloaded, setLoading] = useState(false);
    const[displayweather, setdisplayweather] = useState(false);
    const[weatherData, setweatherdata] = useState([""]);

    const handleGetWeather = async () => {
       try{    
        setLoading(true);
        const res = await GetData(name);
        console.log(res, "===res");
        setweatherdata(res);
       }
       catch(error){
        console.error("Error fetching data", error);
       }
       finally{
        setTimeout(() => setLoading(false), 1000);
        setdisplayweather(true);
       }
    };

    if(hasloaded){
        return (
            <div className="mainClass">   
                <Loadingcomponent/>
            </div>
        )
    }


    const isDaytime = () => {
        if (weatherData) {
            const hour = parseInt(weatherData.location.localtime.split(' ')[1].split(':')[0]);
            return hour >= 6 && hour < 18; 
        }
        return false; 
    };

    if(displayweather && isDaytime()){
        return(
            <div className="mainClassDay">
                <div class="container d-flex justify-content-center align-items-center h-100">
                    <div class="weather-data text-center bg-light p-4 rounded">
                        <h1>{weatherData.current.temp_c}°C</h1>
                        <h2>Location: {weatherData.location.name}, {weatherData.location.region}, {weatherData.location.country}</h2>
                        <p>Last Updated: {weatherData.current.last_updated}</p>
                        <p>Feels Like: {weatherData.current.feelslike_c}°C ({weatherData.current.feelslike_f}°F)</p>
                        
                    </div>
                </div>
            </div>
        )
    }

    if(displayweather && !isDaytime()){
        console.log("night")
        return(
            <div className="mainClassNight">
                <div class="container d-flex justify-content-center align-items-center h-100">
                    <div class="weather-data text-center bg-light p-4 rounded">
                        <h1>{weatherData.current.temp_c}°C</h1>
                        <h2>Location: {weatherData.location.name}, {weatherData.location.region}, {weatherData.location.country}</h2>
                        <p>Last Updated: {weatherData.current.last_updated}</p>
                        <p>Feels Like: {weatherData.current.feelslike_c}°C ({weatherData.current.feelslike_f}°F)</p>
                        <h2 style={{textAlign:"left"}}> Weather details : </h2>
                        <p style={{textAlign:"left", width:"400px"}}>humidity: {weatherData.current.humidity}</p>
                        <p style={{textAlign:"left", width:"400px"}}>UV: {weatherData.current.uv}</p>
                        <p style={{textAlign:"left", width:"400px"}}>Pressure: {weatherData.current.wind_dir}</p>
                        <p style={{textAlign:"left", width:"400px"}}>Wind Direction: {weatherData.current.pressure_mb}</p>
                    </div>
                </div>
            </div>
        )
    }


    return(
        <div className='mainClass'>
            <div>
            <input className="getWeather" onChange={(e)=>setName(e.target.value)} type="text" placeholder="type correct city to get weather" />
            <button className="getWeather1" onClick={handleGetWeather}> Get Weather </button>
            </div>
        </div>
    )
}

export default Main;