import React from "react";
import Button from "../../components/Button/Button";
import InputField from "../../components/InputField/InputField";
import "./PlacesSearch.scss";

export default function PlacesSearch(props) {
  return (
    <form className="PlacesSearch" onSubmit={props.handleSubmit}>
      <InputField
        type="text"
        name="placesSearchbar"
        placeholder="Search Google Places"
        value={props.searchBar}
        onChange={props.handleInputChange}
      />
      <Button className="Btn" name="Search" />
    </form>
  );
}
