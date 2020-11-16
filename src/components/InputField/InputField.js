import React from "react";
import "./InputField.scss";

export default function InputField(props) {
  return (
    <>
      <label htmlFor={props.name}></label>
      <input className="Input" {...props}></input>
    </>
  );
}
