import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
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
      <button
        disabled={!props.search}
        className="SearchBtn"
        type="submit"
        onClick={props.handleFormSubmit}
      >
        <FontAwesomeIcon icon={faSearch} size="2x" />
      </button>
    </form>
  );
}

export default Search;
