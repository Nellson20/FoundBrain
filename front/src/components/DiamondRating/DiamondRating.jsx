import React from 'react'
import Rating from 'react-rating'

const DiamondRating = ({ ...args }) => {
    return (
        <Rating
            {...args}
            fractions={2}
            emptySymbol={<img src="/img/icons/diamond_grey.png" className="icon rating-diamond-img" />}
            fullSymbol={<img src="/img/icons/diamond.png" className="icon rating-diamond-img" />}
        />
    )
}

export default DiamondRating
