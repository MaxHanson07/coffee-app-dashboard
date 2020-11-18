import React from "react";
import "./Button.scss";

export default function Button(props) {
  return (
    <button type="submit" {...props}>
      {props.name}
    </button>
  );
}
