import React, {useEffect, useState} from "react";
import {useLazySearchCityQuery, useSearchCityQuery} from "../store/mapBox/mapBox.api";
import {useDebounce} from "../hooks/debounce";
import {IFeature} from "../models/models";
import {useActions} from "../hooks/actions";
import {useAppSelector} from "../hooks/redux";
import {useTranslation} from "react-i18next";

export function SearchCity() {
    const [search, setSearch] = useState('');
    const [dropDown, setDropdown] = useState(false)
    const [cityName, setCityName] = useState('');
    const [currUserPos, setCurrUserPos] = useState('');
    const {t, i18n} = useTranslation();
    const {favourites} = useAppSelector(state => state.openWeather);
    const debounced: string = useDebounce(search, 500)
    const {isLoading, isError, data} = useSearchCityQuery(debounced, {
        skip: debounced.length < 2
    })
    const [fetchCity, {isLoading: isCityLoading, isError: isCityError}] = useLazySearchCityQuery();

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(position => {
            if (position) {
                setCurrUserPos(`${position.coords.longitude},${position.coords.latitude}`)
            }
        })
    }, []);

    useEffect(() => {
        if (currUserPos.length) {
            const fetchCityByCurrUserPos = async () => {
                const result = await fetchCity(currUserPos);
                const cityName = result.data?.[0].text
                    + ' ' + result.data?.[0].context[result.data?.[0].context.length - 1].short_code;
                console.log(currUserPos);
                console.log(result.data);
                if (cityName && !favourites.includes(cityName)) {
                    addFavourite(cityName);
                }
            }
            fetchCityByCurrUserPos();
        }
    }, [currUserPos]);

    const {addFavourite} = useActions();

    useEffect(() => {
        setDropdown(debounced.length > 2 && data?.length! > 0)
    }, [debounced, data])

    const selectCity = (cityName: string) => {
        setCityName(cityName)
    }

    const addToFavourite = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()

        if (cityName.length > 0 && !favourites.includes(cityName)) {
            addFavourite(cityName)
            setSearch('');
            setDropdown(false);
        }
    }

    return (
        <div className="flex justify-center pt-10 mx-auto h-max w-screen">
            {isError && <p className="text-xl font-jost font-normal text-red-600">Something went wrong</p>}

            <div className="relative w-[750px]">
                <div className="flex justify-between w-full">
                    <input
                        type="text"
                        className="border py-2 px-4 w-[570px] h-[40px] outline-none
                    mb-2 rounded shadow-shadowEfCol shadow-md
                    font-jost font-light
                    "
                        placeholder={t('search')}
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                    />
                    <button
                        className="w-[115px] h-[40px] bg-coldStatCol rounded
                        hover:shadow-md hover:shadow-shadowEfCol transition-all
                        font-jost font-normal text-white"
                        onClick={addToFavourite}
                    >{t('add')}
                    </button>
                </div>

                {dropDown && <ul
                    className=" list-none absolute top-[42px] left-0 right-0 max-h-[200px]
                    shadow-shadowEfCol shadow-md bg-white overflow-y-scroll rounded w-[570px]">
                    {isLoading && <p className="text-center font-jost font-light">Loading...</p>}
                    {data?.map((city: IFeature) => (
                        <li
                            key={city.id}
                            onClick={() => selectCity(city.text + ' ' + city.context[city.context.length - 1].short_code)}
                            className="py-2 px-4 hover:bg-dropDownElCol bg-white
                            transition-colors cursor-pointer"
                        > {city.place_name} </li>
                    ))}
                </ul>}
            </div>
        </div>
    );
}
