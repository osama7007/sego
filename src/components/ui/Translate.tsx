import React from "react";
import locale from "../../locale";

type TranslateProps = {
    text: string;
}

const Translate: React.FC<TranslateProps> = ({ text }) => {
    const lang = sessionStorage.getItem('lang') || 'en';
    const res = lang === 'ar' ? locale.ar?.[text] : text
    return (
        <>{res}</>
    );
}

export default Translate;
