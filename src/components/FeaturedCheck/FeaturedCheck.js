import React from "react";
import "./FeaturedCheck.scss";

export default function FeaturedCheck(props) {
  return (
    <div className="Checkbox">
      <label htmlFor={props.name}>Featured</label>
      <input type="checkbox" id="featured" {...props} />
    </div>
  );
}
