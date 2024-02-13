import {useDispatch} from "react-redux";
import {bindActionCreators} from "@reduxjs/toolkit";
import {openWeatherActions} from "../store/openWeather/openWeather.slice";

const actions = {
    ...openWeatherActions
}

export const useActions = () => {
    const dispatch = useDispatch();
    return bindActionCreators(actions, dispatch)
}
