import React, { useState, useEffect } from "react";
import Button from "../../components/Button/Button.js";
import InputField from "../../components/InputField/InputField.js";
import API from "../../utils/API";
import "./CafeForm.scss";

function CafeForm({ form, id }) {
  // Initial state of user inputted value
  const [formObject, setFormObject] = useState(form);

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
        website: formObject.website,
        instagram_url: formObject.instagram_url,
        roasters: formObject.roasters,
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
  }

  // Deletes cafes from database
  function handleDelete(e) {
    e.preventDefault();
    API.deleteCafe(id).catch((err) => console.log(err));
  }

  useEffect(() => {
    setFormObject(form);
  }, [form]);

  return (
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
      <InputField
        onChange={handleInputChange}
        name="roasters"
        value={formObject.roasters || ""}
        placeholder="Roasters (required)"
      />
      {/* Buttons are disabled depending on if an existing cafe is selected */}

      <div className="BtnDiv">
        <Button name="Add" onClick={handleFormSubmit} disabled={id} />
        <Button name="Update" onClick={handleFormSubmit} disabled={id} />
        <Button name="Delete" onClick={handleDelete} disabled={id} />
      </div>
    </form>
  );
}

export default CafeForm;
