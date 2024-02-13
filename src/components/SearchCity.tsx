import React, {useEffect, useState} from "react";
import {useSearchCityQuery} from "../store/mapBox/mapBox.api";
import {useDebounce} from "../hooks/debounce";
import {IFeature} from "../models/models";
import {useLazyGetCityWeatherQuery} from "../store/openWeather/openWeather.api";
import {useActions} from "../hooks/actions";

export function SearchCity() {
    const [search, setSearch] = useState('');
    const [dropDown, setDropdown] = useState(false)
    const [cityName, setCityName] = useState('');
    const debounced: string = useDebounce(search, 500)
    const {isLoading, isError, data} = useSearchCityQuery(debounced, {
        skip: debounced.length < 2
    })

    const [fetchWeather,
        {isLoading: isWeatherLoading, data: weather}] = useLazyGetCityWeatherQuery()

    const {addFavourite} = useActions();

    useEffect(() => {
        setDropdown(debounced.length > 2 && data?.length! > 0)
    }, [debounced, data])

    useEffect(() => {
        console.log(cityName)
    }, [cityName]);

    const selectCity = (cityName: string) => {
        setCityName(cityName)
    }

    const addToFavourite = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()

        if (cityName.length > 0) {
            addFavourite(cityName)
        }
    }

    return (
        <div className="flex justify-center pt-10 mx-auto h-max w-screen">
            {isError && <p className="text-xl font-jost font-normal text-red-600">Something went wrong</p>}

            <div className="relative w-[550px]">
                <div className="flex justify-between w-full">
                    <input
                    type="text"
                    className="border py-2 px-4 w-[450px] h-[42px] mb-2"
                    placeholder="Search for city..."
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    />
                    <button
                        className="py-1 px-4 bg-coldStatCol rounded
                        hover:shadow-md hover:shadow-shadowEfCol transition-all"
                        onClick={addToFavourite}
                    >Add
                    </button>
                </div>

                {dropDown && <ul
                    className=" list-none absolute top-[42px] left-0 right-0 max-h-[200px]
                    shadow-shadowEfCol shadow-md bg-white overflow-y-scroll">
                    {isLoading && <p className="text-center font-jost font-light">Loading...</p>}
                    {data?.map((city: IFeature) => (
                        <li
                            key={city.id}
                            onClick={() => selectCity(city.text)}
                            className="py-2 px-4 hover:bg-dropDownElCol bg-white
                            transition-colors cursor-pointer"
                        > {city.place_name} </li>
                    ))}
                </ul>}
            </div>
        </div>
    );
}
