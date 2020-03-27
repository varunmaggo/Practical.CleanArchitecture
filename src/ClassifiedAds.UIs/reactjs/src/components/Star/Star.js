import React from "react";

import classes from "./Star.module.css";

const Star = props => {
  const width = (props.rating * 75) / 5;
  return (
    <div
      className={classes.Star}
      style={{ width: width }}
      title="rating"
      onClick={() =>
        props.ratingClicked(`The rating ${props.rating} was clicked!`)
      }
    >
      <div style={{ width: "75px" }}>
        <span className="fa fa-star"></span>
        <span className="fa fa-star"></span>
        <span className="fa fa-star"></span>
        <span className="fa fa-star"></span>
        <span className="fa fa-star"></span>
      </div>
    </div>
  );
};

export default Star;
