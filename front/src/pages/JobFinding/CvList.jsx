import React, { useState, useEffect, useRef } from 'react';
import './CvList.scss';
import CvPaper from './CvPaper';

const CvList = () => {
    const paper = useRef(null);

    useEffect(() => {
        
        // const scaleGrid = () => {
        //     const item = paper;
        //     if (item) {
        //         const screenWidth = window.innerWidth;
        //         const screenHeight = window.innerHeight;
        //         const gridWidth = grid.offsetWidth;
        //         const gridHeight = grid.offsetHeight;
        //         const scaleX = screenWidth / gridWidth;
        //         const scaleY = screenHeight / gridHeight;
        //         const scaleFactor = Math.min(scaleX, scaleY);
        //         grid.style.transform = 'scale(' + scaleFactor + ')';
        //     }
        // };

        // scaleGrid();

        // window.addEventListener('resize', scaleGrid);

        // return () => {
        //     window.removeEventListener('resize', scaleGrid);
        // };
    }, []);

    return (
        <div className='cv-list'>
            <div className="grid-container">
                <div className="grid">
                    <CvPaper/>
                    <CvPaper/>
                    <CvPaper/>
                    <CvPaper/>
                    <CvPaper/>
                    <CvPaper/>
                    <CvPaper/>
                    <CvPaper/>
                    <CvPaper/>
                    <CvPaper/>
                    <CvPaper/>
                    <CvPaper/>
                    <CvPaper/>
                    <CvPaper/>
                </div>
            </div>
        </div>
    );
};

export default CvList;
