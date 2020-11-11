import React, { useState, useEffect } from "react";
import { Input, TextArea, FormBtn } from "../components/Form";

function ShopForm() {

    // Initial state of user inputted value
    const [formObject, setFormObject] = useState({})

    // Handles updating component state when the user types into the input field
    function handleInputChange(event) {
        const { name, value } = event.target;
        setFormObject({ ...formObject, [name]: value })
    };

    //   function handleFormSubmit {

    //   }

    return (

        <form>
            <Input
                onChange={handleInputChange}
                name="name"
                placeholder="Name (required)"
            />
            <Input
                onChange={handleInputChange}
                name="id"
                placeholder="Id (required)"
            />
            <Input
                onChange={handleInputChange}
                name="lat"
                placeholder="Lat (required)"
            />
            <Input
                onChange={handleInputChange}
                name="lon"
                placeholder="Lon (required)"
            />
            <Input
                onChange={handleInputChange}
                name="address"
                placeholder="Address (required)"
            />
            <Input
                onChange={handleInputChange}
                name="website"
                placeholder="Website (required)"
            />
            <Input
                onChange={handleInputChange}
                name="insta"
                placeholder="Insta (required)"
            />
            <Input
                onChange={handleInputChange}
                name="id"
                placeholder="Id (required)"
            />
            <TextArea
                onChange={handleInputChange}
                name="synopsis"
                placeholder="Synopsis (Optional)"
            />
            <FormBtn
                onClick={handleFormSubmit}
            >
                Add
              </FormBtn>
            <FormBtn
                onClick={handleFormSubmit}
            >
                Update
              </FormBtn>
            <FormBtn
                onClick={handleFormSubmit}
            >
                Delete
              </FormBtn>
        </form>

    );
}

export default ShopForm;