import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {IFeature, MapBoxResponse} from "../../models/models";

export const mapBoxApi = createApi({
    reducerPath: 'mapBox/api',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://api.mapbox.com/geocoding'
    }),
    endpoints: build => ({
        searchCity: build.query<IFeature[], string>({
            query: (search: string) => ({
                url: `/v5/mapbox.places/` + search + `.json`,
                params: {
                    access_token: process.env.REACT_APP_MAPBOX_API_KEY,
                    types: 'place',
                    language: 'en'
                }
            }),
            transformResponse: (response: MapBoxResponse) => response.features
        })
    })
})

export const {useSearchCityQuery} = mapBoxApi
