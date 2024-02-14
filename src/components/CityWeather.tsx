import React, { useEffect, useState } from "react";
import { useAppSelector } from "../hooks/redux";
import { useLazyGetCityWeatherQuery } from "../store/openWeather/openWeather.api";
import {ICityWeatherData} from "../models/models";



export function CityWeather() {
    const { favourites } = useAppSelector(state => state.openWeather);
    const [cities, setCities] = useState<ICityWeatherData[]>([]);

    const [fetchWeather, { isLoading, isError, data }] = useLazyGetCityWeatherQuery();

    useEffect(() => {
        const fetchDataForCities = async () => {
            const updatedCities: ICityWeatherData[] = [];

            for (const city of favourites) {
                const result = await fetchWeather(city.split(' ')[0]);

                if (!result.error) {
                    updatedCities.push({
                        cityName: city,
                        weatherData: result.data
                    });
                }
            }
            console.log(updatedCities)
            setCities(updatedCities);
        };

        fetchDataForCities();
    }, [favourites]); // Запускаємо ефект, коли favourites змінюється

    if (favourites.length === 0) {
        return <p className="text-center font-jost font-semibold text-black">No added cities yet.</p>;
    }

    if (isLoading) {
        return <p className="text-center font-jost font-semibold text-black">City data is loading...</p>;
    }

    if (isError) {
        return <p className="text-center font-jost font-semibold text-black">Some error occurred!</p>;
    }

    // Тут ви можете використовувати стан cities для відображення даних
    return (
        <>
            {cities.map(city => (
                <div key={city.cityName}>
                    <p>{city.cityName.split(' ')[0] + ', ' + city.cityName.split(' ')[1].toUpperCase()}</p>
                </div>
            ))}
        </>
    );
}
