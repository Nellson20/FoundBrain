import React, { Fragment, useState, useRef, useEffect } from 'react';
import './MediasSelector.scss';
import SelectorMedia from '../selectorMedia/SelectorMedia';
import { FileEarmarkImage } from 'react-bootstrap-icons';

const MediasSelector = ({ gap = 10, col = 5, setMediasState = () => { },onChange=()=>{}, defaultState = [], animate = true, selectorBtn = null, hiddenIfEmpty = false }) => {
    const [tmpMediasList, setTmpMediasList] = useState(defaultState.map((s, i) => ({ type: s.type, url: URL.createObjectURL(s), file: s, delay: i, index: i })));

    useEffect(() => {
        setMediasState(tmpMediasList.map(tmp => tmp.file))
        onChange(tmpMediasList)
    }, [tmpMediasList])

    // useEffect(() => {
    //     setTmpMediasList();
    // }, [defaultState])


    const mediasInput = useRef()
    const removeTmpMedia = (index) => {
        const medias = tmpMediasList.slice();
        const med = medias.filter((m, i) => i !== index);
        setTmpMediasList(med);
    }

    const addMedias = (fileArray) => {
        const files = [...tmpMediasList];
        for (let i = 0; i < fileArray.length; i++) {
            files.push({ type: fileArray[i].type, url: URL.createObjectURL(fileArray[i]), file: fileArray[i], delay: i, index: i });
        }
        setTmpMediasList(files);
    }
    const clickMediasInput = () => {
        mediasInput.current.click();
    }
    useEffect(() => {
        if (selectorBtn) {
            selectorBtn.addEventListener('click', clickMediasInput)
            return () => {
                selectorBtn.removeEventListener('click', clickMediasInput)
            }
        }
    }, [selectorBtn])

    return (



        <Fragment>
            <input multiple ref={mediasInput} type="file" onChange={(e) => {
                addMedias(e.target.files);
            }}
                style={{ display: 'none' }} />
            {
                (!hiddenIfEmpty || tmpMediasList.length > 0) &&
                <div className={"medias-selector square-grid"} style={{ gridTemplateColumns: `repeat(${col},1fr)`, gridGap: gap + "px" }}>

                    {
                        tmpMediasList.length > 0 ? tmpMediasList.map((m, i) => {

                            return (
                                <div key={i} style={animate ? { animation: `scaleIn .1s ${m.delay / 10}s forwards` } : { transform: 'scale(1)', opacity: 1 }} className="m-parent scaleIn">
                                    <SelectorMedia media={m} removeSelf={() => { removeTmpMedia(i) }} />
                                </div>
                            )
                        }) : ''
                    }
                    <div onClick={clickMediasInput} className="fake-image-selector-input" style={{ minWidth: 0 }}>
                        <div>
                            <div><FileEarmarkImage /></div>
                            <span>Selectionner</span>
                        </div>

                    </div>


                </div>
            }


        </Fragment >


    )
}

export default MediasSelector;