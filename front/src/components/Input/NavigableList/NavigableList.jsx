import React, { Children, useEffect, useMemo, useRef, useState } from 'react'
import './NavigableList.scss'

const NavigableList = ({ refName = null, className = null, startIndex = -1, children, mapping = (elem) => elem, eventTarget = document, onEnter = () => { }, onSelect = () => { }, ...props }) => {
    const [selectedItem, setSelectedItem] = useState(-1)
    const childRefs = useRef([]);
    const childrenArray = useMemo(() => {
        return Children.toArray(children)
    }, [children])
    useEffect(() => {
        onSelect(selectedItem)
    }, [selectedItem])

    useEffect(() => {
        console.log(props, 'PROPS')
    }, [props])

    const handleKeydown = (e) => {
        if (e.key === "ArrowUp" || e.key === "ArrowDown" || e.key === "Enter") {
            e.preventDefault()
            if (e.key === "ArrowUp") {
                if (selectedItem > 0) {
                    setSelectedItem(prev => prev - 1)

                } else if (selectedItem === 0) {
                    (startIndex === -1) ? setSelectedItem(prev => prev - 1) :
                        setSelectedItem(childrenArray.length - 1)
                } else {
                    setSelectedItem(childrenArray.length - 1)
                }
            } else if (e.key === "ArrowDown") {
                if (selectedItem <= childrenArray.length - 2) {
                    setSelectedItem(prev => prev + 1)
                } else {
                    setSelectedItem(startIndex)
                }
            } else if (e.key === "Enter") {
                if (selectedItem !== -1 && selectedItem < childrenArray.length) {

                    onEnter(selectedItem)
                    const selectedChildRef = childRefs.current[selectedItem];
                    console.log(selectedChildRef)
                    if (selectedChildRef) {
                        selectedChildRef.click();
                    }
                }
            }
        }
    }

    const handleMouseOver = (e, i) => {
        setSelectedItem(i)
    }

    const handleMouseOut = (e) => {
        setSelectedItem(-1)
    }

    useEffect(() => {
        eventTarget.addEventListener('keydown', handleKeydown)
        return () => {
            eventTarget.removeEventListener('keydown', handleKeydown)
        }
    }, [selectedItem, childrenArray])
    useEffect(() => {
        if (childrenArray.length < 1) {
            setSelectedItem(-1)
        }
    }, [childrenArray])

    return (
        <ul ref={refName} {...props} className={`navigable-list${className ? " " + className : ""}`}>
            {
                childrenArray.map((c, i) => (
                    <li key={i}
                        onMouseOver={(e) => handleMouseOver(e, i)} onMouseOut={handleMouseOut} className={selectedItem === i ? "active" : ""}>
                        {React.cloneElement(c, {
                            ref: (ref) => (childRefs.current[i] = ref),
                        })}
                    </li>
                ))
            }
        </ul>
    )
}

export default NavigableList
