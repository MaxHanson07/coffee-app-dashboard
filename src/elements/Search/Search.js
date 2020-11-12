import React from 'react';
import "./style.css";

function Search(props) {
    return (
      <form className="search">
        <div className="form-group">
          <label htmlFor="cafes">Cafe Name:</label>
          <input
            value={props.search}
            onChange={props.handleInputChange}
            name="cafe"
            list="cafes"
            type="text"
            className="form-control"
            placeholder="Type the name of a cafe in to begin"
            id="cafe"
          />
          <button type="submit" onClick={props.handleFormSubmit} className="btn btn-success">
            Search
          </button>
        </div>
      </form>
    );
  }

  export default Search