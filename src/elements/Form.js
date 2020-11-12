import React, { useState, useEffect } from "react";
import { Input, TextArea, FormBtn } from "../components/Form/index.js";
​
function ShopForm({id}) {
​
    // Initial state of user inputted value
    const [formObject, setFormObject] = useState({})
​
    // Handles updating component state when the user types into the input field
    function handleInputChange(event) {
        const { name, value } = event.target;
        setFormObject({ ...formObject, [name]: value })
    };
​
      function handleFormSubmit(e) {
          e.preventDefault()
        console.log(formObject)
​
        // TODO - Replace with actual API call
        if(id) {
            console.log('UPDATE')
        } else {
            console.log('CREATE')
        }
​
​
      }
​
      // TODO - Replace with actual API call
      function handleDelete(e) {
        e.preventDefault()
        console.log('DELETE', id)
    }
​
    function getCoffeeShopById(id) {
        // TODO - Replace with actual API call
        return new Promise(resolve => setTimeout(() => resolve({
            name: 'Zumba Coffee Roasters'
        }), 800))
    }
​
      useEffect(() => {
          if(id) {
              getCoffeeShopById(id).then((shopForm) => {
                  setFormObject(shopForm)
              })
          
            } 
​
      }, [])
​
    return (
​
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
​
    );
}
​
export default ShopForm;