import { createContext, useContext, useEffect, useState } from "react";
import axios from 'axios'

const WeatherContext = createContext();

 

export const WeatherProvider = ({ children }) => {
    const [city, setCity] = useState("İstanbul")
    const [isLoading, setIsLoading] = useState(true)
    const [weatherData, setWeatherData] = useState()
    
 
    useEffect(() => {
       setIsLoading(true)
       fetchData(city)
        
    }, [city])

    const values = {
        city,
        setCity,
        weatherData,
        setWeatherData,
        isLoading
        
    }

    async function fetchData(newCity){
        //YOUR API KEY
        const api_key = "217d3b4f53a54372b3e211859233103"
        const url = `http://api.weatherapi.com/v1/forecast.json?key=${api_key}&q=${newCity}&days=8&hour=24&lang=tr`
    
         await axios(url).then(res => res.data)
                .then(res => res.forecast)
                .then(res => setWeatherData(res.forecastday))
                .then(()=>setIsLoading(false))
                .catch((e)=>console.log(e))
                 
 
         
    }

    return (<WeatherContext.Provider value={values}>
        {children}
    </WeatherContext.Provider>)
}



export const useWeather = () => useContext(WeatherContext);