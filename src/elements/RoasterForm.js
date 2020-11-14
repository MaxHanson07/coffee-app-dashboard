import React, { useState } from "react";
import { Input, FormBtn } from "../components/Form/index.js";
import API from "../utils/API";


function RoasterForm() {

    const [roasterFormObject, setRoasterFormObject] = useState({
        name: "",
        instagram_url: "",
        photos: [],
        website: ""
    })

    // Sets roaster state to track which current cafe is selected
    const [roasterSearch, setRoasterSearch] = useState('')
    const [roasters, setRoasters] = useState([])
    // const [currentRoaster, setCurrentRoaster] = useState({})

    // Adds/Updates a roaster to/in the database
    function handleRoasterFormSubmit(event) {
        event.preventDefault();
        let method;
        if (roasterFormObject._id) {
            method = "updateRoaster"
        } else {
            method = "postRoaster"
        }
        API[method](roasterFormObject._id, roasterFormObject)
            .catch(err => console.error(err))
        setRoasterFormObject({
            name: "",
            instagram_url: "",
            photos: [],
            website: ""
        })
    }


    // Retrieves user input in the searchbar
    const handleRoasterSelection = (roaster) => {
        setRoasterFormObject(roaster)
        setRoasters([])
    }

    // Form control for roaster form
    function handleRoasterInputChange(event) {
        const { name, value } = event.target;
        setRoasterFormObject({ ...roasterFormObject, [name]: value })
    };


    function handleRoasterSearchChange(event) {
        let { value } = event.target;
        setRoasterSearch(value)
    }

    async function handleRoasterSearchSubmit(event) {
        try {
            event.preventDefault()
            let { data } = await API.roastersSearch(roasterSearch)
            setRoasters(data)
            setRoasterSearch("")
        } catch (err) {
            console.error(err)
        }
    }

    return (
        <div>
            <h2>Add/Edit a roaster:</h2>
            <form onSubmit={handleRoasterSearchSubmit}>
                <input type="text" onChange={handleRoasterSearchChange} name="roaster" placeholder="Search for a roaster to edit" value={roasterSearch} />
                <button>Search</button>
            </form>
            {roasters.map((roaster) => (
                <button onClick={() => handleRoasterSelection(roaster)} key={roaster._id}>{roaster.name}</button>
            ))}
            <form onSubmit={handleRoasterFormSubmit}>
                <Input name="name" placeholder="name" onChange={handleRoasterInputChange} value={roasterFormObject.name} />
                <Input name="instagram_url" placeholder="instagram url" onChange={handleRoasterInputChange} value={roasterFormObject.instagram_url} />
                <Input name="website" placeholder="website" onChange={handleRoasterInputChange} value={roasterFormObject.website} />
                <FormBtn disabled={!roasterFormObject._id}>Update</FormBtn>
                <FormBtn disabled={roasterFormObject._id}>Add</FormBtn>
            </form>
        </div>
    )
}

export default RoasterForm;
