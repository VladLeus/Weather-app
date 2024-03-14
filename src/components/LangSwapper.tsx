import React, {useEffect} from "react";
import {useTranslation} from "react-i18next";

export function LangSwapper() {

    const {t, i18n} = useTranslation();
    useEffect(() => {
        i18n.changeLanguage('en');
    }, []);

    const changeLanguage = (language: string) => {
        i18n.changeLanguage(language);
    };

    return (
        <>
            <div className="absolute top-1 right-1 md:top-4 md:right-4 z-50">
                <select
                    className="md:py-2 px-2 md:px-4 h-5 md:h-10 outline-none rounded shadow-shadowEfCol
                    shadow-md font-jost font-light md:font-normal text-secTextCol text-sm"
                    onChange={(e) => changeLanguage(e.target.value)}
                >
                    <option className="text-black" value="en">EN</option>
                    <option className="text-black" value="ua">UA</option>
                </select>
            </div>
        </>
    );
}
