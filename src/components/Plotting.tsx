import React from "react";
import {ICityWeatherData, IList} from "../models/models";
import {Area, AreaChart, LabelList, ResponsiveContainer, Tooltip, XAxis} from 'recharts';

export function Plotting({city}: { city: ICityWeatherData }) {
    const filteredData: IList[] = [...city.weatherData!.filter(wd => wd.dt_txt.split(' ')[1] === '00:00:00')];

    return (
        <>
            <ResponsiveContainer className="font-jost font-normal text-secTextCol text-[8px]">
                <AreaChart
                    width={500}
                    height={400}
                    data={[...filteredData.map((fd: IList) => {
                        return {
                            ...fd,
                            dt_txt: fd.dt_txt.split(' ')[0].split('-')[2]
                        };
                    })]}
                    margin={{
                        top: 10,
                        right: 15,
                        left: 15,
                        bottom: 0,
                    }}
                >
                    <XAxis dataKey="dt_txt" axisLine={false} tickLine={false}/>
                    <Tooltip/>
                    <defs>
                        <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#FFA25B" stopOpacity={0.1}/>
                            <stop offset="95%" stopColor="#FFF4F4" stopOpacity={0.8}/>
                        </linearGradient>
                    </defs>
                    <Area type="monotone"
                          dataKey="main.temp_max"
                          stroke={`#FFF4F4`}
                          fill="url(#colorUv)"
                          radius={100}
                    >
                        <LabelList
                            dataKey="main.temp_max"
                            position="top"
                            formatter={(value: number): string => `${Math.round(value)}`}
                        />
                    </Area>
                </AreaChart>
            </ResponsiveContainer>
        </>
    )
}