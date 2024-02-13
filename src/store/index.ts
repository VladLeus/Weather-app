import {configureStore} from "@reduxjs/toolkit";
import {mapBoxApi} from "./mapBox/mapBox.api";
import {openWeatherApi} from "./openWeather/openWeather.api";
import {openWeatherReducer} from "./openWeather/openWeather.slice";

export const store = configureStore({
    reducer: {
        [mapBoxApi.reducerPath]: mapBoxApi.reducer,
        [openWeatherApi.reducerPath]: openWeatherApi.reducer,
        openWeather: openWeatherReducer
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware()
        .concat(mapBoxApi.middleware)
        .concat(openWeatherApi.middleware)
})

export type RootState = ReturnType<typeof store.getState>
