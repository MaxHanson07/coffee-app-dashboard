import React from "react";
import Button from "../Button/Button";
import "./Request.scss";
export default function RequestCard(props) {
  return (
    <div className="RequestCard">
      <div className="RequestItem">
        <h5>email:</h5>
        <p> {props.email}</p>
      </div>
      <div className="RequestItem">
        <h5>cafe:</h5>
        <p> {props.cafe_name}</p>
      </div>
      <div className="RequestItem">
        <h5>add:</h5>
        <p> {props.cafe_address}</p>
      </div>
      <div className="RequestItem">
        <h5>notes:</h5>
        <p> {props.notes}</p>
      </div>
      <Button
        style={{ margin: "auto" }}
        onClick={() => props.deleteRequest(props.id)}
        name="Delete"
      />
    </div>
  );
}
