import React, { useState, useEffect } from "react";
import { Input, TextArea, FormBtn } from "../components/Form/index.js";
import API from "../utils/API";

function CafeForm({ id }) {

    // Initial state of user inputted value
    const [formObject, setFormObject] = useState({})

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
                lon: formObject.lon,
                formatted_address: formObject.address,
                website: formObject.website,
                insta: formObject.insta
            })
        } else {
            console.log('CREATE')
            API.postCafe({
                name: formObject.name,
                lat: formObject.lat,
                lon: formObject.lon,
                formatted_address: formObject.address,
                website: formObject.website,
                insta: formObject.insta
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

    function getCoffeeCafeById(id) {
        // TODO - Replace with actual API call
        return new Promise(resolve => setTimeout(() => resolve({
            name: 'Zumba Coffee Roasters'
        }), 800))
    }

    useEffect(() => {
        if (id) {
            getCoffeeCafeById(id).then((cafeForm) => {
                setFormObject(cafeForm)
            })

        }

    }, [])

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
                name="id"
                value={formObject['id'] || ''}
                placeholder="Id (required)"
            />
            <Input
                onChange={handleInputChange}
                name="lat"
                value={formObject['lat'] || ''}
                placeholder="Lat (required)"
            />
            <Input
                onChange={handleInputChange}
                name="lon"
                value={formObject['lon'] || ''}
                placeholder="Lon (required)"
            />
            <Input
                onChange={handleInputChange}
                name="address"
                value={formObject['address'] || ''}
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
                name="insta"
                value={formObject['insta'] || ''}
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
                name="roasterServed"
                value={formObject['roasterServed'] || ''}
                placeholder="RoastedServed (required)"
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