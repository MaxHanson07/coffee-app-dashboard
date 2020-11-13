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

  const [cafeSearch, setCafeSearch] = useState('')
  const [cafes, setCafes] = useState([])
  const [currentCafe, setCurrentCafe] = useState({})

  function handlePlacesSearchInputChange(event) {
    let { name, value } = event.target
    setPlacesState({ ...placesState, [name]: value })
  }

  async function handlePlacesSearchSubmit(event) {
    try {
      event.preventDefault()
      let { data } = await API.placesSearch(placesState.placesSearchbar)
      let cafes = data.map(datum => datum.result)
      let formattedObject = {
        place_id: cafes[0].place_id,
        name: cafes[0].name,
        lat: cafes[0].geometry.location.lat,
        lng: cafes[0].geometry.location.lng,
        formatted_address: cafes[0].formatted_address,
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

  async function handleCafesSearchSubmit(event) {
    try {
      event.preventDefault()
      let { data } = await API.cafesSearch(cafeSearch)
      setCafes(data)
    } catch (err) {
      console.error(err)
    }
  }

  const handleCafeChange = (cafeForm) => {
    setCurrentCafe(cafeForm)
    setPlacesState({...placesState, searchResults: null})
  }

  return (
    <div className="App">
      <Header />
      <Search
        handleInputChange={(e) => {
          const { value } = e.target

          setCafeSearch(value)
        }}
        search={cafeSearch}
        handleFormSubmit={handleCafesSearchSubmit}
      />
      {cafes.map((c) => (
        <button onClick={() => handleCafeChange(c)} key={c._id}>{c.name}</button>
      ))}

      <PlacesSearch
        placesState={placesState}
        handleInputChange={handlePlacesSearchInputChange}
        handleSubmit={handlePlacesSearchSubmit}
      />
        
      <CafeForm
      form={ placesState.searchResults || currentCafe}
      id={currentCafe._id}
      />
      
      <Requests />
      {placesState.searchResults ? <Photos photos={placesState.searchResults?.photos} /> : null}
    </div>
  );
}

export default App;