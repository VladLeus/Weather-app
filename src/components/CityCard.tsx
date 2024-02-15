import React, {useEffect, useState} from "react";
import {ICityWeatherData} from "../models/models";
import {Plotting} from "./Plotting";
import {useActions} from "../hooks/actions";

export function CityCard({city}: { city: ICityWeatherData }) {
    const [isMetricUnits, setIsMetricUnits] = useState(true);
    const [temperature, setTemperature] = useState(0);
    const [feelsLikeTemp, setFeelsLikeTemp] = useState(0);
    const warmCardClasses: string
        = 'flex flex-col gap-1 justify-center w-[350px] h-[260px] ' +
        'bg-warmCardBG rounded-[5px] shadow-sm shadow-shadowEfCol';
    const coldCardClasses: string
        = 'flex flex-col gap-1 justify-center w-[350px] h-[260px] ' +
        'bg-coldCardBG rounded-[5px] shadow-sm shadow-shadowEfCol';
    const activeTempClasses: string = 'font-jost font-normal text-black text-[22px] cursor-pointer transition-colors';
    const notActiveTempClasses: string = 'font-jost font-normal text-secTextCol text-[22px] cursor-pointer transition-colors';

    const {removeFavourite} = useActions();

    const removeFromFavourite = (event: React.MouseEvent<HTMLParagraphElement>) => {
        event.preventDefault()
        if (city.cityName.length > 0)
            removeFavourite(city.cityName);
    }
    const formatDate = (date: Date): string => {
        const days: string[] = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        const months: string[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

        const day: string = days[date.getDay()];
        const month: string = months[date.getMonth()];
        const dayOfMonth: number = date.getDate();
        const hour: number = date.getHours();
        const minute: number = date.getMinutes();

        return `${day}, ${dayOfMonth} ${month}, ${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
    }

    const changeUnits = () => {
        setIsMetricUnits(prevState => !prevState);
    }

    useEffect(() => {
        const cityTemp = city.weatherData?.[0].main.temp!;
        const feelsLike = city.weatherData?.[0].main.feels_like!;
        if (!isMetricUnits) {
            setTemperature(Math.round((cityTemp * 9 / 5) + 32))
            setFeelsLikeTemp(Math.round((feelsLike * 9 / 5) + 32))
        } else {
            setTemperature(Math.round(cityTemp))
            setFeelsLikeTemp(Math.round(feelsLike))
        }
    }, [city.weatherData, isMetricUnits]);

    const getTempString = (temp: number): string => {
        if (temp === 0) {
            return temp.toString();
        } else if (temp > 0) {
            return `+${temp}`;
        }
        return `${temp}`;
    }
    return (
        <>
            {city.weatherData &&
                <div className={city.weatherData[0].main.temp <= 0 ? coldCardClasses : warmCardClasses}>
                    <div className="flex justify-between items-center">
                        <p className="font-jost font-normal text-black text-base ml-[15px]">{city.cityName.split(' ')[0]
                            + ', ' + city.cityName.split(' ')[1].toUpperCase()}</p>
                        <div className="flex justify-around w-max items-center">
                            <img
                                src={`https://openweathermap.org/img/wn/${city.weatherData?.[0].weather[0].icon}@2x.png`}
                                alt="ico"
                                className="w-[50px] h-[50px]"
                            />
                            <div className="flex justify-around w-max items-center">
                                <p className="font-jost font-normal text-secTextCol text-[13px] mr-[15px]"
                                >
                                    {city.weatherData?.[0].weather[0].main}
                                </p>
                                <p
                                    className="font-jost font-normal text-secTextCol hover:text-black cursor-pointer
                                    pb-6 pr-2"
                                    onClick={removeFromFavourite}
                                >&times;</p>
                            </div>
                        </div>
                    </div>
                    <p className="font-jost font-light text-black text-lg ml-[15px]">{formatDate(new Date())}</p>
                    <Plotting city={city} chartColor={city.weatherData[0].main.temp <= 0 ? "#5B8CFF" : "#FFA25B"}/>
                    <div className="flex justify-between items-center">
                        <div className="w-[120px] h-[80px] flex flex-col gap-0.5 justify-center items-center">
                            <div className="flex gap-0.5 justify-between ml-[15px]">
                                <p
                                    className="font-jost font-normal text-black text-[44px]"
                                    id="temperature">
                                    {getTempString(temperature)}
                                </p>
                                <div className="flex justify-between items-start">
                                    <p
                                        className={isMetricUnits ? activeTempClasses : notActiveTempClasses}
                                        onClick={changeUnits}
                                    >&deg;C</p>
                                    <p className="font-jost font-normal text-black text-[22px]"> | </p>
                                    <p
                                        className={!isMetricUnits ? activeTempClasses : notActiveTempClasses}
                                        onClick={changeUnits}
                                    >&deg;F</p>
                                </div>
                            </div>
                            <p
                                className="font-jost font-normal text-secTextCol text-[13px] mb-2"
                            >Feels like:
                                {` ${getTempString(feelsLikeTemp)}`} &deg;{isMetricUnits ? 'C' : 'F'}
                            </p>
                        </div>
                        <div className="mr-[15px] font-jost font-normal text-black text-[12px]">
                            <p>Wind: <span
                                className={city.weatherData[0].main.temp <= 0
                                    ? "text-coldChart"
                                    : "text-warmChart"}
                            >{Math.round(city.weatherData[0].wind.speed)} m/s
                                    </span>
                            </p>
                            <p>Humidity: <span
                                className={city.weatherData[0].main.temp <= 0
                                    ? "text-coldChart"
                                    : "text-warmChart"}
                            >{city.weatherData[0].main.humidity}%
                                        </span>
                            </p>
                            <p>Pressure: <span
                                className={city.weatherData[0].main.temp <= 0
                                    ? "text-coldChart"
                                    : "text-warmChart"}
                            >{city.weatherData[0].main.pressure}Pa
                                        </span>
                            </p>
                        </div>
                    </div>
                </div>
            }
        </>
    );
}
