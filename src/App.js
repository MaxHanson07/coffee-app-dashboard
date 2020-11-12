import React, { useState } from 'react';
import Header from './components/Header/Header'
import Search from './elements/Search/Search';
import PlacesSearch from './elements/PlacesSearch';
import API from './utils/API'
import Requests from './elements/Requests';


function App() {
  const [placesState, setPlacesState] = useState({
    placesSearchbar: "",
    searchResults: {}
  })

  function handlePlacesSearchInputChange(event) {
      let {name, value} = event.target
      setPlacesState({...placesState, [name]: value})
  }

  async function handlePlacesSearchSubmit(event) {
      try {
          event.preventDefault()
          let {data} = await API.placesSearch(placesState.placesSearchbar)
          let cafes = data.map(datum=>datum.result)
          setPlacesState({...placesState, searchResults:cafes})
      } catch (err) {
          console.error(err)
      }
  }
  return ( 
    <div className="App">
      <Header />
      <Search />
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