import React, { useState, useEffect, useRef, Component } from 'react';
import { XLg } from 'react-bootstrap-icons';
import useSafeState from '../../Hooks/useSafeState';
import './selectorMedia.css';
const SelectorMedia = ({ media, removeSelf }) => {

    const [load, setLoad] = useState(false);
    const [source, setSource] = useState(null);
    const [loaded, setLoaded] = useState(0);
    const self = useRef();
    const [selfWidth, setSelfWidth] = useState(0);



    const createThumbnail = async (file) => {
        console.log(file,'fileddd')
        const reader = new FileReader();
        reader.addEventListener('progress', (e) => {

            setLoaded(Math.ceil((e.loaded * 100) / e.total));

        });
        reader.addEventListener('load', (e) => {
            setSource(e.currentTarget.result);
            setLoad(true);
        });
        await reader.readAsDataURL(file);
    }
    useEffect(() => {
        createThumbnail(media.file);
        if (self.current) {
            setSelfWidth(self.current.offsetWidth)
        }
    }, [media]);




    return (

        <div>

            {
                (load && source != null) &&
                    (/^image/.test(media.type)) ?
                    <img src={source} alt="go" />
                    : ((/^video/.test(media.type)) ?
                        <video src={source}></video>
                        : ''
                    )

            }
            {
                loaded < 100 ?
                    <div ref={self} className="prog">
                        <div style={{ width: (loaded) + '%' }}>
                            <div style={{ animation: 'loadingBackground 1s ease infinite', width: selfWidth + 'px' }}></div>
                        </div>
                    </div> : ""
            }
            {
                load ?
                    <div onClick={() => { removeSelf() }} className="remove a-center">
                        <XLg />
                    </div> : ""
            }

        </div>

    )
}

export default SelectorMedia