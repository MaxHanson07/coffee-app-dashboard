import React, { useState } from 'react';
import Header from './components/Header/Header'
import Search from './elements/Search/Search';
import PlacesSearch from './elements/PlacesSearch';
import API from './utils/API'
import Requests from './elements/Requests';
import Photos from './elements/Photos'
import CafeForm from './elements/Form';

function App() {
  const [placesState, setPlacesState] = useState({
    placesSearchbar: "",
    searchResults: {}
  })

  // Sets cafe state to track which current cafe is selected
  const [cafeSearch, setCafeSearch] = useState('')
  const [cafes, setCafes] = useState([])
  const [currentCafe, setCurrentCafe] = useState({})

  // Retrieves user input in places search
  function handlePlacesSearchInputChange(event) {
    let { name, value } = event.target
    setPlacesState({ ...placesState, [name]: value })
  }

  // Makes an API call to Google Places
  async function handlePlacesSearchSubmit(event) {
    try {
      event.preventDefault()
      let { data } = await API.placesSearch(placesState.placesSearchbar)
      let cafes = data.map(datum => datum.result)
      // Creates an object to populate the form with info retrieved from Places
      let formattedObject = {
        place_id: cafes[0].place_id,
        name: cafes[0].name,
        lat: cafes[0].geometry.location.lat,
        lng: cafes[0].geometry.location.lng,
        formatted_address: cafes[0].formatted_address,
        formatted_phone_number: cafes[0].formatted_phone_number,
        website: cafes[0].website,
        weekday_text: cafes[0].weekday_text,
        photos: cafes[0].photos,
      }
      setPlacesState({ ...placesState, searchResults: formattedObject })
      setCurrentCafe('')
    } catch (err) {
      console.error(err)
    }
  }

  // Makes API call to database to search for a cafe with a name similar to the name entered in searchbar
  async function handleCafesSearchSubmit(event) {
    try {
      event.preventDefault()
      let { data } = await API.cafesSearch(cafeSearch)
      setCafes(data)
    } catch (err) {
      console.error(err)
    }
  }

  // Retrieves user input in the searchbar
  const handleCafeChange = (cafeForm) => {
    setCurrentCafe(cafeForm)
    setPlacesState({...placesState, searchResults: null})
  }

  return (
    <div className="App">
      <Header />
      {/* Displays search bar and retrieves the user input inside of the searchbar */}
      <Search
        handleInputChange={(e) => {
          const { value } = e.target

          // Makes API call to database to retrieve potential matches
          setCafeSearch(value)
        }}
        search={cafeSearch}
        handleFormSubmit={handleCafesSearchSubmit}
      />
      {/* Displays search results as a button displaying the cafe name */}
      {/* Click the name of cafe to select that cafe and populate the form with details already stored in database */}
      {cafes.map((c) => (
        <button onClick={() => handleCafeChange(c)} key={c._id}>{c.name}</button>
      ))}

      {/* Retrieves input from Places searchbar and makes API call to Google Places */}
      <PlacesSearch
        placesState={placesState}
        handleInputChange={handlePlacesSearchInputChange}
        handleSubmit={handlePlacesSearchSubmit}
      />
      
      {/* Passes state from either places search or database search to populate the form with known details */}
      <CafeForm
      form={ placesState.searchResults || currentCafe}
      id={currentCafe._id}
      />
      
      {/* Displays requests sent in by users on client side */}
      <Requests />
      {/* Displays photos from Google Places */}
      {placesState.searchResults ? <Photos photos={placesState.searchResults?.photos} /> : null}
    </div>
  );
}

export default App;