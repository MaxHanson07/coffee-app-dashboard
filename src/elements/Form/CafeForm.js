import React, { useState, useEffect } from "react";
import Button from "../../components/Button/Button.js";
import InputField from "../../components/InputField/InputField.js";
import API from "../../utils/API";
import "./CafeForm.scss";

function CafeForm({ form, id }) {
  // Initial state of user inputted value
  const [formObject, setFormObject] = useState(form);

  const [roasterFormObject, setRoasterFormObject] = useState({
    name: "",
    instagram_url: "",
    photos: [],
    website: "",
  });

  const [roastersReturned, setRoastersReturned] = useState([]);

  // Handles updating component state when the user types into the input field
  function handleInputChange(event) {
    const { name, value } = event.target;
    setFormObject({ ...formObject, [name]: value });
  }

  function handleRoasterInputChange(event) {
    const { name, value } = event.target;
    setRoasterFormObject({ ...roasterFormObject, [name]: value });
  }

  function handleFormSubmit(e) {
    e.preventDefault();
    // If an id exists run an update, if no id run a create
    // Id will exist when a cafe is selected after a database search
    if (id) {
      console.log("UPDATE");
      console.log(formObject);
      API.updateCafe(id, {
        name: formObject.name,
        lat: formObject.lat,
        lng: formObject.lng,
        formatted_address: formObject.formatted_address,
        formatted_phone_number: formObject.formatted_phone_number,
        website: formObject.website,
        instagram_url: formObject.instagram_url,
        roasters: formObject.custom_data.roasters.map((roaster) => roaster._id),
      }).then((res) => console.log(res));
    } else {
      // Creates a new cafe to database
      API.postCafe({
        name: formObject.name,
        lat: formObject.lat,
        lng: formObject.lng,
        formatted_address: formObject.formatted_address,
        formatted_phone_number: formObject.formatted_phone_number,
        website: formObject.website,
        instagram_url: formObject.instagram_url,
      });
    }
    setFormObject({});
  }

  // Adds a roaster to the database
  function handleRoasterFormSubmit(event) {
    event.preventDefault();
    API.postRoaster(roasterFormObject).catch((err) => console.error(err));
    setRoasterFormObject({
      name: "",
      instagram_url: "",
      photos: [],
      website: "",
    });
  }

  // Deletes cafes from database
  function handleDelete(e) {
    e.preventDefault();
    API.deleteCafe(id).catch((err) => console.log(err));
    setFormObject({});
  }

  // Removes roaster from cafe
  function removeRoaster(e) {
    e.preventDefault();
    console.log(e.target.getAttribute("data-id"));
    let newFormObject = { ...formObject };
    newFormObject.custom_data.roasters = newFormObject.custom_data.roasters.filter(
      (roaster) => roaster._id !== e.target.getAttribute("data-id")
    );
    console.log(newFormObject);
    setFormObject(newFormObject);
  }

  // Searches the database for roasters
  async function searchRoasters(e) {
    e.preventDefault();
    try {
      let roasterName = formObject.searchRoaster;
      let { data } = await API.roastersSearch(roasterName);
      console.log(data);
      setRoastersReturned(data);
    } catch (err) {
      console.error(err);
    }
  }

  // Adds selected roaster to state
  function handleRoasterSelect(roaster, event) {
    event.preventDefault();
    console.log(roaster);
    let newFormObject = { ...formObject };
    newFormObject.custom_data.roasters.push(roaster);
    setFormObject(newFormObject);
    setRoastersReturned([]);
  }

  useEffect(() => {
    setFormObject(form);
  }, [form]);

  return (
    <>
      <form className="DatabaseForm">
        <h4>Cafe Form</h4>
        {/* Allows admins to customize cafe details */}
        <InputField
          onChange={handleInputChange}
          name="name"
          value={formObject["name"] || ""}
          placeholder="Name (required)"
        />
        <InputField
          onChange={handleInputChange}
          name="lat"
          value={formObject["lat"] || ""}
          placeholder="Lat (required)"
        />
        <InputField
          onChange={handleInputChange}
          name="lng"
          value={formObject["lng"] || ""}
          placeholder="Lng (required)"
        />
        <InputField
          onChange={handleInputChange}
          name="formatted_address"
          value={formObject["formatted_address"] || ""}
          placeholder="Address (required)"
        />
        <InputField
          onChange={handleInputChange}
          name="formatted_phone_number"
          value={formObject["formatted_phone_number"] || ""}
          placeholder="Phone Number (required)"
        />
        <InputField
          onChange={handleInputChange}
          name="website"
          value={formObject["website"] || ""}
          placeholder="Website (required)"
        />
        <InputField
          onChange={handleInputChange}
          name="instagram_url"
          value={formObject.instagram_url || ""}
          placeholder="Insta (required)"
        />
        {/* TODO - Images input goes here */}
        <InputField
          onChange={handleInputChange}
          name="images"
          value={formObject["images"] || ""}
          placeholder="Images (required)"
        />
        {formObject.custom_data?.roasters.map((roaster) => {
          return (
            <div key={roaster._id}>
              <span>{roaster.name}</span>
              <button onClick={removeRoaster} data-id={roaster._id}>
                Remove Roaster
              </button>
            </div>
          );
        })}
        <InputField
          onChange={handleInputChange}
          name="searchRoaster"
          value={formObject.searchRoaster || ""}
          placeholder="Add a roaster"
        />
        <Button className="Btn" name="Search" onClick={searchRoasters} />
        {roastersReturned.map((roaster) => (
          <Button
            className="Btn"
            name={roaster.name}
            onClick={(event) => handleRoasterSelect(roaster, event)}
            key={roaster._id}
          />
        ))}

        {/* Buttons are disabled depending on if an existing cafe is selected */}

        <div className="BtnDiv">
          <Button
            className="Btn"
            name="Add"
            onClick={handleFormSubmit}
            disabled={id}
          />
          <Button
            className="Btn"
            name="Update"
            onClick={handleFormSubmit}
            disabled={id}
          />
          <Button
            className="Btn"
            name="Delete"
            onClick={handleDelete}
            disabled={id}
          />
        </div>
      </form>

      <form className="RoasterForm" onSubmit={handleRoasterFormSubmit}>
        <h2>Add a roaster:</h2>
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
        <Button className="Btn" name="Add" />
      </form>
    </>
  );
}

export default CafeForm;
