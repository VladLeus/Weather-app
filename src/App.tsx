import React from 'react';
import {SearchCity} from "./components/SearchCity";
import {CityWeather} from "./components/CityWeather";
import {LangSwapper} from "./components/LangSwapper";

function App() {
    return (
        <div className="relative">
            <LangSwapper/>
            <SearchCity/>
            <CityWeather/>
        </div>
    );
}

export default App;
