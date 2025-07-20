import React from 'react'
import { Link } from 'react-router-dom'

const TextWithLinks = ({ children }) => {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
   
    // Diviser le texte en segments basés sur les virgules et les espaces
    const segments = children.split(/(\s+|,)/);
   
    // Remplacer les URL par des composants <Link> et conserver les virgules et les espaces
    const contents = segments.map((segment, i) => {
       // Vérifier si le segment est une URL
       if (urlRegex.test(segment)) {
         return (
           <Link key={i} to={segment} className='link-txt'>
             {segment}
           </Link>
         );
       } else {
         // Conserver les virgules et les espaces
         return segment;
       }
    });
   
    return <>{contents}</>;
   };
export default TextWithLinks
