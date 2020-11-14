import React, { useState, useEffect } from "react";
import { Input, TextArea, FormBtn } from "../components/Form/index.js";
import API from "../utils/API";

function CafeForm({ form, id }) {

    // Initial state of user inputted value
    const [formObject, setFormObject] = useState(form)

    const [roastersReturned, setRoastersReturned] = useState([])

    // Handles updating component state when the user types into the input field
    function handleInputChange(event) {
        const { name, value } = event.target;
        setFormObject({ ...formObject, [name]: value })
    };

    function handleFormSubmit(e) {
        e.preventDefault()
        // If an id exists run an update, if no id run a create
        // Id will exist when a cafe is selected after a database search
        if (id) {
            console.log('UPDATE')
            console.log(formObject)
            API.updateCafe(id, {
                name: formObject.name,
                lat: formObject.lat,
                lng: formObject.lng,
                formatted_address: formObject.formatted_address,
                formatted_phone_number: formObject.formatted_phone_number,
                website: formObject.website,
                instagram_url: formObject.instagram_url,
                roasters: formObject.custom_data.roasters.map(roaster=>roaster._id)
            }).then(res=>console.log(res))
        } else {
            // Creates a new cafe to database
            API.postCafe({
                name: formObject.name,
                lat: formObject.lat,
                lng: formObject.lng,
                formatted_address: formObject.formatted_address,
                formatted_phone_number: formObject.formatted_phone_number,
                website: formObject.website,
                instagram_url: formObject.instagram_url
            })
        }
    }

    // Deletes cafes from database
    function handleDelete(e) {
        e.preventDefault()
        API.deleteCafe(id)
        .catch(err => console.log(err));
    }
    
    // Removes roaster from cafe
    function removeRoaster(e) {
        e.preventDefault()
        console.log(e.target.getAttribute("data-id"))
        let newFormObject = {...formObject};
        newFormObject.custom_data.roasters = newFormObject.custom_data.roasters.filter(roaster=>roaster._id !== e.target.getAttribute("data-id"))
        console.log(newFormObject)
        setFormObject(newFormObject)
    }

    async function searchRoasters(e) {
        e.preventDefault()
        try {
            let roasterName = formObject.searchRoaster
            let {data} = await API.roastersSearch(roasterName)
            console.log(data)
            setRoastersReturned(data)
        }
        catch (err) {
            console.error(err)
        }
    }
    
    // Adds selected roaster to state
    function handleRoasterSelect(roaster, event) {
        event.preventDefault()
        console.log(roaster)
        let newFormObject = {...formObject};
        newFormObject.custom_data.roasters.push(roaster)
        setFormObject(newFormObject)
    }


    useEffect(() => {
        setFormObject(form)
    }, [form])

    return (

        <form>
            {/* Allows admins to customize cafe details */}
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
                name="formatted_phone_number"
                value={formObject['formatted_phone_number'] || ''}
                placeholder="Phone Number (required)"
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
                value={formObject.instagram_url || ''}
                placeholder="Insta (required)"
            />
            {/* TODO - Images input goes here */}
            <Input
                onChange={handleInputChange}
                name="images"
                value={formObject['images'] || ''}
                placeholder="Images (required)"
            />
            {formObject.custom_data?.roasters.map(roaster=>{
                return (
                <div key={roaster._id}>
                    <span>{roaster.name}</span>
                    <button onClick={removeRoaster} data-id={roaster._id}>Remove Roaster</button>
                </div>
                )
            })}
            <Input
                onChange={handleInputChange}
                name="searchRoaster"
                value={formObject.searchRoaster || ''}
                placeholder="Add a roaster"
            />
            <button onClick={searchRoasters}>Search</button>
            {roastersReturned.map((roaster) => (
                <button onClick={(event) => handleRoasterSelect(roaster, event)} key={roaster._id}>{roaster.name}</button>
             ))}
            {/* Buttons are disabled depending on if an existing cafe is selected */}
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