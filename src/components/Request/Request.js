import React from "react";
import Button from "../Button/Button";
import "./Request.scss";
export default function RequestCard(props) {
  return (
    <div className="RequestCard">
      <p>{props.email}</p>
      <p>{props.cafe_name}</p>
      <p>{props.cafe_address}</p>
      <p>{props.notes}</p>
      <Button onClick={() => props.deleteRequest(props.id)} name="Delete" />
    </div>
  );
}
