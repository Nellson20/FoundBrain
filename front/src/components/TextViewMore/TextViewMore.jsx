import { useState } from "react";
import { ChevronDown, ChevronUp } from "react-bootstrap-icons";
import './TextViewMore.scss'

function limiterPhrase(phrase, limiteMots) {
    const mots = phrase?.split(' ');
    const phraseLimite = mots?.slice(0, limiteMots).join(' ');
    return phraseLimite;
}

const TextViewMore = ({ children, limiteMot = 50 }) => {
    const text = children;
    const [isReadMore, setIsReadMore] = useState(true);
    const toggleReadMore = () => {
        setIsReadMore((toogle) => !toogle);
    };
    const tronquerTexte = (texte) => {
        return limiterPhrase(texte, limiteMot);
    };

    // Vérifie si le texte est plus long que la limite de mots
    const isTextLongerThanLimit = text?.split(' ').length > limiteMot;

    return (
        <p className="text txt-3">
            {isReadMore ? tronquerTexte(text) : text}
            {isTextLongerThanLimit && (
                <span
                    onClick={toggleReadMore}
                    className="read-or-hide"
                >
                    {isReadMore ? 
                    <span className="inline-flex align-items-center gap-5"><span>...voir plus</span><ChevronDown/></span> : 
                    <span className="inline-flex align-items-center gap-5"><span> voir moin</span><ChevronUp/></span>}
                </span>
            )}
        </p>
    );
};

export default TextViewMore;
