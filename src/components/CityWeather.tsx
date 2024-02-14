import React, {useEffect, useState} from "react";
import {useAppSelector} from "../hooks/redux";
import {useLazyGetCityWeatherQuery} from "../store/openWeather/openWeather.api";
import {ICityWeatherData} from "../models/models";
import {CityCard} from "./CityCard";

export function CityWeather() {
    const {favourites} = useAppSelector(state => state.openWeather);
    const [cities, setCities] = useState<ICityWeatherData[]>([]);

    const [fetchWeather, {isLoading, isError}] = useLazyGetCityWeatherQuery();

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
    }, [favourites]);

    if (favourites.length === 0) {
        return <p className="text-center font-jost font-semibold text-black">No added cities yet.</p>;
    }

    if (isLoading) {
        return <p className="text-center font-jost font-semibold text-black">City data is loading...</p>;
    }

    if (isError) {
        return <p className="text-center font-jost font-semibold text-black">Some error occurred!</p>;
    }

    return (
        <>
            <div className="grid grid-cols-3 gap-1 mt-[200px] xl:grid-cols-5 place-items-center">
                {cities.map(city => (
                    <CityCard key={city.cityName} city={city}/>
                ))}
            </div>
        </>
    );
}
