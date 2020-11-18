import React from "react";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "./Request.scss";
export default function RequestCard(props) {
  return (
    <div className="RequestCard">
      <div className="BtnDiv">
        <button
          className="X"
          style={{ margin: "auto" }}
          onClick={() => props.deleteRequest(props.id)}
          name="Delete"
        >
          <FontAwesomeIcon icon={faTimesCircle} size="1x" />
        </button>
      </div>
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
    </div>
  );
}
