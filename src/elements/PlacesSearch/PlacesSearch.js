import React from "react";
import Button from "../../components/Button/Button";
import InputField from "../../components/InputField/InputField";
import "./PlacesSearch.scss";

export default function PlacesSearch(props) {
  return (
    <form className="PlacesSearch" onSubmit={props.handleSubmit}>
      <h4>Search Google</h4>
      <div className="Response"></div>
      <InputField
        type="text"
        name="placesSearchbar"
        placeholder="Search Google Places"
        onChange={props.handleInputChange}
        value={props.value}
      />
      <Button className="Btn" name="Search" disabled={!props.searchBar} />
    </form>
  );
}
