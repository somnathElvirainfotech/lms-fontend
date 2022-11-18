import React from 'react';
import ReactStars from "react-rating-stars-component";

function RatingBar(props) {

    //alert(props.value)

    var thirdExample = {
        size: 40,
        count: 5,
        isHalf: false,
        value: props.value,
        color: "grey",
        activeColor: "#ebc934",
        onChange: (data) => props.setRating(data),

    };

    return (
        <ReactStars {...thirdExample} onChange={(data) => props.setRating(data)} />
    )
}

export default RatingBar