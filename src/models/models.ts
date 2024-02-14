// Mapbox
export interface MapBoxResponse {
    type: string
    query: string[]
    features: IFeature[]
    attribution: string
}

export interface IFeature {
    id: string
    type: string
    place_type: string[]
    relevance: number
    properties: IProperties
    text_en: string
    language_en?: string
    place_name_en: string
    text: string
    language?: string
    place_name: string
    bbox: number[]
    center: number[]
    geometry: IGeometry
    context: IContext[]
    matching_text?: string
    matching_place_name?: string
}

export interface IProperties {
    mapbox_id: string
    wikidata?: string
}

export interface IGeometry {
    type: string
    coordinates: number[]
}

export interface IContext {
    id: string
    mapbox_id: string
    wikidata: string
    short_code?: string
    text_en: string
    language_en: string
    text: string
    language: string
}

// OpenWeather

export interface OpenWeatherResponse {
    cod: string
    message: number
    cnt: number
    list: IList[]
    city: ICity
}

export interface IList {
    dt: number
    main: IMain
    weather: IWeather[]
    clouds: IClouds
    wind: IWind
    visibility: number
    pop: number
    rain?: IRain
    sys: ISys
    dt_txt: string
}

export interface IMain {
    temp: number
    feels_like: number
    temp_min: number
    temp_max: number
    pressure: number
    sea_level: number
    grnd_level: number
    humidity: number
    temp_kf: number
}

export interface IWeather {
    id: number
    main: string
    description: string
    icon: string
}

export interface IClouds {
    all: number
}

export interface IWind {
    speed: number
    deg: number
    gust: number
}

export interface IRain {
    "3h": number
}

export interface ISys {
    pod: string
}

export interface ICity {
    id: number
    name: string
    coord: ICoord
    country: string
    population: number
    timezone: number
    sunrise: number
    sunset: number
}

export interface ICoord {
    lat: number
    lon: number
}

//my interfaces

export interface ICityWeatherData {
    cityName: string,
    weatherData: IList[] | undefined
}
