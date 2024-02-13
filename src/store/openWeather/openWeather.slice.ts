import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const LS_FAV_KEY = "favk"

interface OpenWeatherState {
    favourites: string[]
}

const initialState: OpenWeatherState = {
    favourites: JSON.parse(localStorage.getItem(LS_FAV_KEY) ?? '[]')
}

export const openWeatherSlice = createSlice({
    name: 'openweather',
    initialState,
    reducers: {
        addFavourite(state, action: PayloadAction<string>){
            state.favourites.push(action.payload)
            localStorage.setItem(LS_FAV_KEY, JSON.stringify(state.favourites))
        },
        removeFavourite(state, action: PayloadAction<string>){
            state.favourites = state.favourites.filter(f => f !== action.payload)
            localStorage.setItem(LS_FAV_KEY, JSON.stringify(state.favourites))
        },
    }
});

export const openWeatherActions = openWeatherSlice.actions;
export const openWeatherReducer = openWeatherSlice.reducer;
