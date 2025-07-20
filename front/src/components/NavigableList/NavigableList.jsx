import React, { useEffect, useRef, useState, useCallback } from 'react';
import './NavigableList.scss';

const NavigableList = ({ children, onChange = () => { }, onclickItem = () => { } }) => {
    const self = useRef();
    const list = useRef([]);
    const [activeIndex, setActiveIndex] = useState(-1);

    const handleMouseEnter = useCallback((index) => () => setActiveIndex(index), []);

    const handleMouseLeave = useCallback(() => setActiveIndex(-1), []);

    const handleEnterKey = useCallback(() => {
        if (activeIndex !== -1) {
            list.current[activeIndex]?.click();
        }
        onChange(activeIndex)
    }, [activeIndex]);

    const handleKeydown = useCallback((e) => {
        if (e.keyCode === 40 || e.keyCode === 38) {
            e.preventDefault();
            setActiveIndex((prevIndex) => {
                if (e.keyCode === 40) {
                    return prevIndex === list.current.length - 1 ? -1 : prevIndex + 1;
                } else if (e.keyCode === 38) {
                    return prevIndex === -1 ? list.current.length - 1 : prevIndex - 1;
                }
                return prevIndex;
            });
        }
    }, []);

    const handleKeyUp = useCallback(() => handleEnterKey(), [handleEnterKey]);

    useEffect(() => {
        window.addEventListener('keydown', handleKeydown);
        window.addEventListener('keyup', handleKeyUp);

        list.current = Array.from(self.current.querySelectorAll('ul li a'));
        list.current.forEach((a, index) => {
            a.setAttribute('data-index', index);
            a.addEventListener('mouseenter', handleMouseEnter(index));
            a.addEventListener('mouseleave', handleMouseLeave);
        });

        return () => {
            window.removeEventListener('keydown', handleKeydown);
            window.removeEventListener('keyup', handleKeyUp);

            list.current.forEach((a) => {
                const index = parseInt(a.getAttribute('data-index'));
                a.removeEventListener('mouseenter', handleMouseEnter(index));
                a.removeEventListener('mouseleave', handleMouseLeave);
            });
        };
    }, [children, handleKeydown, handleKeyUp, handleMouseEnter, handleMouseLeave]);

    useEffect(() => {
        list.current.forEach((a, index) => {
            a.classList.toggle('active', index === activeIndex);
        });
    }, [activeIndex]);

    useEffect(() => {
        list.current.forEach((a) => {
            a.addEventListener('click', (e) => {
                e.preventDefault()
                e.stopPropagation()
                
                onclickItem()
            })
        })
        return () => {
            list.current.forEach((a) => {
                a.addEventListener('click', (e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    onclickItem()
                })
            })
        }
    }, [list.current])

    return (
        <div className="navigable-list" ref={self} style={{ borderRadius: 5, fontSize: 13 }}>
            {children}
        </div>
    );
};

export default NavigableList;


