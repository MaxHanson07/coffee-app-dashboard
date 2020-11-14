import React from "react";
import Button from "../../components/Button/Button";
import InputField from "../../components/InputField/InputField";
import "./Search.scss";

function Search(props) {
  return (
    <form className="Search">
      <InputField
        name="cafes"
        value={props.search}
        onChange={props.handleInputChange}
        list="cafes"
        type="text"
        placeholder="Type the name of a cafe in to begin"
        id="cafe"
      />
      <Button className="Btn" name="Search" onClick={props.handleFormSubmit} />
    </form>
  );
}

export default Search;
