import React, { useState, useEffect } from "react";
import { Input, TextArea, FormBtn } from "../components/Form/index.js";
import API from "../utils/API";

function CafeForm({ form, id }) {

    // Initial state of user inputted value
    const [formObject, setFormObject] = useState(form)

    // Handles updating component state when the user types into the input field
    function handleInputChange(event) {
        const { name, value } = event.target;
        setFormObject({ ...formObject, [name]: value })
    };

    function handleFormSubmit(e) {
        e.preventDefault()
        console.log(formObject)

        // TODO - Test
        if (id) {
            console.log('UPDATE')
            API.updateCafe(id)({
                name: formObject.name,
                lat: formObject.lat,
                lng: formObject.lng,
                formatted_address: formObject.address,
                website: formObject.website,
                instagram_url: formObject.instagram_url,
                roasters: formObject.roasters
            })
        } else {
            console.log('CREATE')
            API.postCafe({
                name: formObject.name,
                lat: formObject.lat,
                lng: formObject.lng,
                formatted_address: formObject.address,
                website: formObject.website,
                instagram_url: formObject.instagram_url
            })
        }
    }

    // TODO - Test
    function handleDelete(e) {
        e.preventDefault()
        console.log('DELETE', id)
        API.deleteCafe(id)
            .catch(err => console.log(err));
    }

    useEffect(() => {
        console.log(form)
        setFormObject(form)
    }, [form])

    return (

        <form>
            <Input
                onChange={handleInputChange}
                name="name"
                value={formObject['name'] || ''}
                placeholder="Name (required)"
            />
            <Input
                onChange={handleInputChange}
                name="lat"
                value={formObject['lat'] || ''}
                placeholder="Lat (required)"
            />
            <Input
                onChange={handleInputChange}
                name="lng"
                value={formObject['lng'] || ''}
                placeholder="Lng (required)"
            />
            <Input
                onChange={handleInputChange}
                name="formatted_address"
                value={formObject['formatted_address'] || ''}
                placeholder="Address (required)"
            />
            <Input
                onChange={handleInputChange}
                name="website"
                value={formObject['website'] || ''}
                placeholder="Website (required)"
            />
            <Input
                onChange={handleInputChange}
                name="instagram_url"
                value={formObject.custom_data?.instagram_url || ''}
                placeholder="Insta (required)"
            />
            {/* TODO - Images input goes here */}
            <Input
                onChange={handleInputChange}
                name="images"
                value={formObject['images'] || ''}
                placeholder="Images (required)"
            />
            <Input
                onChange={handleInputChange}
                name="roasters"
                value={formObject.custom_data?.roasters[0] || ''}
                placeholder="Roasters (required)"
            />
            <FormBtn
                onClick={handleFormSubmit}
                disabled={id}
            >
                Add
              </FormBtn>
            <FormBtn
                onClick={handleFormSubmit}
                disabled={!id}
            >
                Update
              </FormBtn>
            <FormBtn
                onClick={handleDelete}
                disabled={!id}
            >
                Delete
              </FormBtn>
        </form>

    );
}

export default CafeForm;