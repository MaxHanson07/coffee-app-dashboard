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

  // Sets roaster state to track which current cafe is selected
  const [roasterSearch, setRoasterSearch] = useState("");
  const [roasters, setRoasters] = useState([]);

  // Adds/Updates a roaster to/in the database
  function handleRoasterFormSubmit(event) {
    event.preventDefault();
    let method;
    if (roasterFormObject._id) {
      method = "updateRoaster";
    } else {
      method = "postRoaster";
    }
    API[method](roasterFormObject._id, roasterFormObject).catch((err) =>
      console.error(err)
    );
    setRoasterFormObject({
      name: "",
      instagram_url: "",
      photos: [],
      website: "",
    });
  }

  // Retrieves user input in the searchbar
  const handleRoasterSelection = (roaster) => {
    setRoasterFormObject(roaster);
    setRoasters([]);
  };

  // Form control for roaster form
  function handleRoasterInputChange(event) {
    const { name, value } = event.target;
    setRoasterFormObject({ ...roasterFormObject, [name]: value });
  }

  function handleRoasterSearchChange(event) {
    let { value } = event.target;
    setRoasterSearch(value);
  }

  async function handleRoasterSearchSubmit(event) {
    try {
      event.preventDefault();
      let { data } = await API.roastersSearch(roasterSearch);
      setRoasters(data);
      setRoasterSearch("");
    } catch (err) {
      console.error(err);
    }
  }

  async function handleRoasterDelete() {
    try {
      let result = await API.deleteRoaster(roasterFormObject._id);
      setRoasterFormObject({
        name: "",
        instagram_url: "",
        photos: [],
        website: "",
      });
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="RoasterForm">
      <h4>Add/Edit a roaster:</h4>
      <div className="Response"></div>
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
                className="Btn"
                name="Update"
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
              className="Btn"
              name="Add"
              disabled={roasterFormObject._id}
            />
          )}
        </div>
      </form>
    </div>
  );
}

export default RoasterForm;
