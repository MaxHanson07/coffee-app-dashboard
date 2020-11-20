import React, { useState } from "react";
import Button from "../../components/Button/Button.js";
import InputField from "../../components/InputField/InputField.js";
import API from "../../utils/API";
import "./RoasterForm.scss";

function RoasterForm() {
  const [roasterFormObject, setRoasterFormObject] = useState({
    name: "",
    instagram_url: "",
    photos: [],
    website: "",
  });

  const [noResults, setNoResults] = useState(false);
  const [success, setSuccess] = useState(false);
  const [fail, setFail] = useState(false);

  // Sets roaster state to track which current cafe is selected
  const [roasterSearch, setRoasterSearch] = useState("");
  const [roasters, setRoasters] = useState([]);

  // Adds/Updates a roaster to/in the database
  const handleRoasterFormSubmit = async (event) => {
    try {
      event.preventDefault();
      let method;
      if (roasterFormObject._id) {
        method = "updateRoaster";
      } else {
        method = "postRoaster";
      }
      await API[method](roasterFormObject._id, roasterFormObject);
      setRoasterFormObject({
        name: "",
        instagram_url: "",
        photos: [],
        website: "",
      });
      setSuccess(true);

      setTimeout(function () {
        setSuccess(false);
      }, 1000);
    } catch (err) {
      setFail(true);
    }
  };

  // Retrieves user input in the searchbar
  const handleRoasterSelection = (roaster) => {
    setRoasterFormObject(roaster);
    setRoasters([]);
  };

  // Form control for roaster form
  const handleRoasterInputChange = (event) => {
    const { name, value } = event.target;
    setRoasterFormObject({ ...roasterFormObject, [name]: value });
  };

  const handleRoasterSearchChange = (event) => {
    let { value } = event.target;
    setRoasterSearch(value);
  };

  const handleRoasterSearchSubmit = async (event) => {
    try {
      event.preventDefault();
      let { data } = await API.roastersSearch(roasterSearch);
      setRoasters(data);
      setRoasterSearch("");
      setNoResults(false);
    } catch (err) {
      setNoResults(true);
    }
  };

  const handleRoasterDelete = async () => {
    try {
      await API.deleteRoaster(roasterFormObject._id);
      setRoasterFormObject({
        name: "",
        instagram_url: "",
        photos: [],
        website: "",
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="RoasterForm">
      <h4>Add/Edit a roaster:</h4>
      <div className="Response">
        {noResults === true ? <p>No roasters found!</p> : null}
        <div className="Success">
          {success === true ? <p>Request Successful</p> : null}
        </div>
        {fail === true ? <p>Form submit failed</p> : null}
      </div>
      <form className="RoasterSearch" onSubmit={handleRoasterSearchSubmit}>
        <InputField
          type="text"
          onChange={handleRoasterSearchChange}
          name="roaster"
          placeholder="Search for a roaster to edit"
          value={roasterSearch}
        />
        <Button className="Btn" name="Submit" />
      </form>
      <div className="RoasterResults">
        {roasters.map((roaster) => (
          <button
            className="SearchResultsBtn"
            onClick={() => handleRoasterSelection(roaster)}
            key={roaster._id}
          >
            {roaster.name}
          </button>
        ))}
      </div>
      <form className="AddRoaster" onSubmit={handleRoasterFormSubmit}>
        <InputField
          name="name"
          placeholder="name"
          onChange={handleRoasterInputChange}
          value={roasterFormObject.name}
        />
        <InputField
          name="instagram_url"
          placeholder="instagram url"
          onChange={handleRoasterInputChange}
          value={roasterFormObject.instagram_url}
        />
        <InputField
          name="website"
          placeholder="website"
          onChange={handleRoasterInputChange}
          value={roasterFormObject.website}
        />
        <div className="BtnDiv">
          {roasterFormObject._id ? (
            <>
              <Button
                name="Update"
                className="Btn"
                disabled={!roasterFormObject._id}
              />
              <button
                className="Btn Delete"
                type="button"
                disabled={!roasterFormObject._id}
                onClick={handleRoasterDelete}
              >
                Delete
              </button>
            </>
          ) : (
            <Button
              name="Add"
              className="Btn"
              disabled={roasterFormObject._id}
            />
          )}
        </div>
      </form>
    </div>
  );
}

export default RoasterForm;
