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
            <div className="absolute top-4 right-4 z-50">
                <select
                    className="py-2 px-4 h-[40px] outline-none rounded shadow-shadowEfCol
                    shadow-md font-jost font-normal text-secTextCol"
                    onChange={(e) => changeLanguage(e.target.value)}
                >
                    <option className="text-black" value="en">EN</option>
                    <option className="text-black" value="ua">UA</option>
                </select>
            </div>
        </>
    );
}
