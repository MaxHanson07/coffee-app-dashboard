import React, { useState, useEffect } from "react";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "../../components/Button/Button.js";
import InputField from "../../components/InputField/InputField.js";
import API from "../../utils/API";
import "./CafeForm.scss";
import FeaturedCheck from "../../components/FeaturedCheck/FeaturedCheck.js";

function CafeForm({ form, id }) {
  // Initial state of user inputted value
  const [formObject, setFormObject] = useState(form);
  const [roastersReturned, setRoastersReturned] = useState([]);
  const [isFeatured, setIsFeatured] = useState(form.is_featured);

  // Handles updating component state when the user types into the input field
  function handleInputChange(event) {
    const { name, value } = event.target;
    setFormObject({ ...formObject, [name]: value });
    if (isFeatured === true) {
      setIsFeatured(false);
    } else {
      setIsFeatured(true);
    }
  }

  function handleFormSubmit(e) {
    e.preventDefault();
    // If an id exists run an update, if no id run a create
    // Id will exist when a cafe is selected after a database search
    if (id) {
      API.updateCafe(id, {
        name: formObject.name,
        lat: formObject.lat,
        lng: formObject.lng,
        formatted_address: formObject.formatted_address,
        formatted_phone_number: formObject.formatted_phone_number,
        photos: formObject.photos,
        website: formObject.website,
        instagram_url: formObject.instagram_url,
        roasters: formObject.roasters?.map((roaster) => roaster._id),
        custom_photos: [formObject.images],
        is_featured: isFeatured,
      });
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
        roasters: formObject.roasters?.map((roaster) => roaster._id),
        custom_photos: [formObject.images],
        is_featured: isFeatured,
      });
    }

    setIsFeatured(false);
    setFormObject({});
  }

  // Deletes cafes from database
  function handleDelete(e) {
    e.preventDefault();
    API.deleteCafe(id).catch((err) => console.error(err));
    setFormObject({});
  }

  // Removes roaster from cafe
  function removeRoaster(id) {
    let newFormObject = { ...formObject };
    newFormObject.roasters = newFormObject.roasters.filter(
      (roaster) => roaster._id !== id
    );
    setFormObject(newFormObject);
  }

  // Searches the database for roasters
  async function searchRoasters(e) {
    e.preventDefault();
    try {
      let roasterName = formObject.searchRoaster;
      let { data } = await API.roastersSearch(roasterName);
      setRoastersReturned(data);
      setFormObject({ ...formObject, searchRoaster: "" });
    } catch (err) {
      console.error(err);
    }
  }

  // Adds selected roaster to state
  function handleRoasterSelect(roaster, event) {
    event.preventDefault();
    let newFormObject = { ...formObject };
    if (newFormObject.roasters) {
      newFormObject.roasters.push(roaster);
    } else {
      newFormObject.roasters = [roaster];
    }
    setFormObject(newFormObject);
    setRoastersReturned([]);
  }

  function deletePhoto(photo_url) {
    let newFormObject = { ...formObject };
    newFormObject.photos = newFormObject.photos.filter(
      (photo) => photo.photo_url !== photo_url
    );
    setFormObject(newFormObject);
  }

  useEffect(() => {
    setFormObject(form);
    setIsFeatured(form.is_featured);
  }, [form]);

  let cloudinaryWidget = window.cloudinary.createUploadWidget(
    {
      cloudName: "dtnhqkg8n",
      uploadPreset: "u3zfjskp",
      sources: ["local", "url", "image_search", "camera"],
    },
    (error, result) => {
      if (!error && result && result.event === "success") {
        let photo = {
          photo_reference: "none",
          html_attributions: "",
          photo_url: result.info.url,
        };
        setFormObject({ ...formObject, photos: [...formObject.photos, photo] });
      }
    }
  );

  function showWidget() {
    cloudinaryWidget.open();
  }

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

        <FeaturedCheck
          onChange={handleInputChange}
          checked={isFeatured === true ? true : false}
          name="featured"
          value={isFeatured || false}
        />

        <div className="Photos">
          {formObject.photos?.[0]?.photo_url
            ? formObject.photos?.map((photo) => {
                return (
                  <div key={photo.photo_url}>
                    <img
                      className="GooglePhotos"
                      src={photo.photo_url}
                      alt="cafe"
                    />
                    <Button
                      className="Btn "
                      name="Delete"
                      type="button"
                      onClick={() => deletePhoto(photo.photo_url)}
                    />
                  </div>
                );
              })
            : null}
        </div>

        <button type="button" className="Btn" onClick={showWidget}>
          Upload
        </button>

        {formObject.roasters?.map((roaster) => {
          return (
            <div key={roaster._id}>
              <span>{roaster.name}</span>
              <button
                className="X"
                onClick={() => removeRoaster(roaster._id)}
                type="button"
              >
                <FontAwesomeIcon icon={faTimesCircle} size="1x" />
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
          )}
        </div>
      </form>
    </>
  );
}
export default CafeForm;
