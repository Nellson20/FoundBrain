import React, { useEffect } from 'react'
import './EmblaCarousel.scss'
import useEmblaCarousel from 'embla-carousel-react'
import ClassNames from 'embla-carousel-class-names'

export function EmblaCarousel({ slides = [] }) {
    const [emblaRef] = useEmblaCarousel({ loop: false, align: 'start' })

    return (
        <div className="embla" ref={emblaRef}>
            <div className="embla__container">
                {
                    slides.map((slide, i) => <div key={i} className="embla__slide">{slide}</div>)
                }
            </div>
        </div>
    )
}
