import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {IList, OpenWeatherResponse} from "../../models/models";

export const openWeatherApi = createApi({
    reducerPath: 'openWeather/api',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://api.openweathermap.org'
    }),
    endpoints: build => ({
        getCityWeather: build.query<IList[], string>({
            query: (cityName: string) => ({
                url: `/data/2.5/forecast`,
                params: {
                    q: cityName.toLowerCase(),
                    units: 'metric',
                    lang: 'en',
                    appid: process.env.REACT_APP_OPENWEATHER_API_KEY
                }
            }),
            transformResponse: (response: OpenWeatherResponse) => response.list
        })
    })
})

export const {useLazyGetCityWeatherQuery} = openWeatherApi
