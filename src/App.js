import React, { useState } from 'react';
import Header from './components/Header/Header'
import Search from './elements/Search/Search';
import PlacesSearch from './elements/PlacesSearch';
import API from './utils/API'
import Requests from './elements/Requests';
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
      setPlacesState({ ...placesState, searchResults: cafes })
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

      <CafeForm
        form={currentCafe}
        id={currentCafe._id}
      />
      <PlacesSearch
        placesState={placesState}
        handleInputChange={handlePlacesSearchInputChange}
        handleSubmit={handlePlacesSearchSubmit}
      />
      <Requests />
    </div>
  );
}

export default App;