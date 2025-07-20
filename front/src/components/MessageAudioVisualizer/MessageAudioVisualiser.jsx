import React, { useRef, useEffect } from "react";
import WaveSurfer from 'wavesurfer.js';

function MessageAudioVisualizer({ url }) {
    const waveformRef = useRef(null);
    const wavesurfer = useRef(null);
    const audioElement = useRef();

    useEffect(() => {
        wavesurfer.current = WaveSurfer.create({
            container: waveformRef.current,
            waveColor: "violet",
            progressColor: "purple",
            responsive: true,
            height: 30,
            barWidth: 4,
            barRadius: 5,
            backend: "WebAudio",
            responsive: true,
            height: 50,
            normalize: true,
        });

        wavesurfer.current.load(url);

        // Attendre une interaction utilisateur pour jouer le média
        document.querySelector('#playButton').addEventListener('click', function () {
            wavesurfer.current.play();
        });

        return () => {
            wavesurfer.current.destroy();
        };
    }, [url]);

    return (
        <>
            <div ref={waveformRef} />
            <button id="playButton">Play</button>
        </>
    );
}

export default MessageAudioVisualizer;