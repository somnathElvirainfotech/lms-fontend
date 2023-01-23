import React from 'react';
import ReactStars from "react-rating-stars-component";
 
function StaticRating(props) {

    var thirdExample = {
        size: 25,
        count: 5,
        isHalf: true,
        value: props.value,
        color: "grey",
        activeColor: "#ebc934",
        edit:false
    };

    return <ReactStars {...thirdExample} />;
    
}

export default StaticRating