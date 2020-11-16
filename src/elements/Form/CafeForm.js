import React, { useState, useEffect } from "react";
import Button from "../../components/Button/Button.js";
import InputField from "../../components/InputField/InputField.js";
import API from "../../utils/API";
import "./CafeForm.scss";

function CafeForm({ form, id }) {
  // Initial state of user inputted value
  const [formObject, setFormObject] = useState(form);
  const [roastersReturned, setRoastersReturned] = useState([]);

  // Handles updating component state when the user types into the input field
  function handleInputChange(event) {
    const { name, value } = event.target;
    setFormObject({ ...formObject, [name]: value });
  }

  function handleFormSubmit(e) {
    e.preventDefault();
    // If an id exists run an update, if no id run a create
    // Id will exist when a cafe is selected after a database search
    if (id) {
      console.log("UPDATE");
      API.updateCafe(id, {
        name: formObject.name,
        lat: formObject.lat,
        lng: formObject.lng,
        formatted_address: formObject.formatted_address,
        formatted_phone_number: formObject.formatted_phone_number,
        photos: formObject.photos,
        website: formObject.website,
        instagram_url: formObject.instagram_url,
        roasters: formObject.roasters.map((roaster) => roaster._id),
        custom_photos: [formObject.images]
      }).then((res) => console.log(res));
    } else {
      // Creates a new cafe to database
      API.postCafe({
        name: formObject.name,
        places_id: formObject.places_id,
        lat: formObject.lat,
        lng: formObject.lng,
        formatted_address: formObject.formatted_address,
        formatted_phone_number: formObject.formatted_phone_number,
        photos: formObject.photos,
        website: formObject.website,
        instagram_url: formObject.instagram_url,
        roasters: formObject.roasters.map((roaster) => roaster._id),
        custom_photos: [formObject.images]
      });
    }
    setFormObject({});
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
    newFormObject.roasters = newFormObject.roasters.filter(
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
    if (newFormObject.roasters) {
      newFormObject.roasters.push(roaster);
    } else {
      newFormObject.roasters = [roaster]
    }
    setFormObject(newFormObject);
    setRoastersReturned([]);
  }

  function deletePhoto(photo_url) {
    let newFormObject = { ...formObject };
    newFormObject.photos = newFormObject.photos.filter(
      photo => photo.photo_url !== photo_url
    );
    console.log(newFormObject);
    setFormObject(newFormObject);
  }

  useEffect(() => {
    setFormObject(form);
  }, [form]);

  return (
    <>
      <form className="DatabaseForm">
        <h4>Cafe Form</h4>
        <div className="Response"></div>
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

        {formObject.photos?.[0]?.photo_url ? (
          formObject.photos?.map((photo) => {
            return (
              <div key={photo.photo_url}>
                <img src={photo.photo_url} alt="cafe" />
                <button onClick={() => deletePhoto(photo.photo_url)}>Delete</button>
              </div>
            )
          })) : <span>Loading Photos</span>}


        {formObject.roasters?.map((roaster) => {
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
        <Button
          className="Btn"
          name="Search"
          disabled={!formObject.searchRoaster}
          onClick={searchRoasters}
        />
        {roastersReturned.map((roaster) => (
          <Button
            className="SearchResultsBtn"
            name={roaster.name}
            onClick={(event) => handleRoasterSelect(roaster, event)}
            key={roaster._id}
          />
        ))}

        {/* Buttons are disabled depending on if an existing cafe is selected */}

        <div className="BtnDiv">
          {id ? (
            <>
              <Button
                className="Btn"
                name="Update"
                onClick={handleFormSubmit}
                disabled={!id}
              />
              <Button
                className="Btn"
                name="Delete"
                onClick={handleDelete}
                disabled={!id}
              />
            </>
          ) : (
              <Button
                className="Btn"
                name="Add"
                onClick={handleFormSubmit}
                disabled={id}
              />
            )
          }
        </div>
      </form>
    </>
  );
}

export default CafeForm;
