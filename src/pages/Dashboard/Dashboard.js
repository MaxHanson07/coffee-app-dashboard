import React, { useState, useEffect } from "react";
import Header from "../../components/Header/Header";
import Search from "../../elements/Search/Search";
import PlacesSearch from "../../elements/PlacesSearch/PlacesSearch";
import API from "../../utils/API";
import Requests from "../../elements/Requests/Requests";
import CafeForm from "../../elements/Form/CafeForm";
import "./Dashboard.scss";
import Button from "../../components/Button/Button";
import RoasterForm from "../../elements/RoasterForm/RoasterForm";

function Dashboard({loggedIn, setLoggedIn}) {
  const [placesState, setPlacesState] = useState({
    placesSearchbar: "",
    searchResults: {},
  });

  const [noResults, setNoResults] = useState(false);

  // Sets cafe state to track which current cafe is selected
  const [cafeSearch, setCafeSearch] = useState("");
  const [cafes, setCafes] = useState([]);
  const [currentCafe, setCurrentCafe] = useState({
    place_id: "",
    name: "",
    lat: "",
    lng: "",
    formatted_address: "",
    website: "",
    weekday_text: [],
    photos: [],
    formatted_phone_number: "",
    is_featured: false,
  });

  async function checkAuth() {
    try {
      console.log("Checking Auth")
      let token = localStorage.getItem("token")
      if (!token) {
        
        setLoggedIn(false)
        return
      } else {
        let authenticated = await API.verifyToken(token)
        if (authenticated.ok === true) {
          console.log(authenticated.ok)
          setLoggedIn(true)
        } else {
          setLoggedIn(false)
        }
      }
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(()=>{
    checkAuth()
  })

  // Retrieves user input in places search
  function handlePlacesSearchInputChange(event) {
    let { name, value } = event.target;
    setPlacesState({ ...placesState, [name]: value });
  }

  // Makes an API call to Google Places
  async function handlePlacesSearchSubmit(event) {
    try {
      event.preventDefault();
      let { data } = await API.placesSearch(placesState.placesSearchbar);
      // Creates an object to populate the form with info retrieved from Places
      let cafes = data.map(({ result }) => {
        let cafe = {
          key: result.place_id,
          place_id: result.place_id,
          name: result.name,
          lat: result.geometry.location.lat,
          lng: result.geometry.location.lng,
          formatted_address: result.formatted_address,
          website: result.website,
          weekday_text: result.opening_hours.weekday_text,
          photos: result.photos,
          formatted_phone_number: result.formatted_phone_number,
        };
        return cafe;
      });
      setPlacesState({
        ...placesState,
        placesSearchbar: "",
      });
      setCafes(cafes);
      setCurrentCafe("");
      setNoResults(false);
    } catch (err) {
      console.error(err);
      setNoResults(true);
    }
  }

  // Makes API call to database to search for a cafe with a name similar to the name entered in searchbar
  async function handleCafesSearchSubmit(event) {
    try {
      event.preventDefault();
      let { data } = await API.cafesSearch(cafeSearch);
      setCafes(data);
      setNoResults(false);
      setCafeSearch("");
    } catch (err) {
      setCafes([]);
      setNoResults(true);
      setCafeSearch("");
    }
  }

  async function transformReferences() {
    try {
      if (!currentCafe) return;
      if (
        currentCafe.photos.length > 0 &&
        !currentCafe.photos?.[0]?.photo_url
      ) {
        let { data } = await API.addUrls(currentCafe.photos);
        setCurrentCafe({ ...currentCafe, photos: data });
      }
    } catch (err) {
      console.error(err);
    }
  }

  // Retrieves user input in the searchbar
  const handleCafeChange = (cafeForm) => {
    setCurrentCafe(cafeForm);
    setPlacesState({ ...placesState, searchResults: null });
    setCafes([]);
  };

  const logout = () => {
    localStorage.removeItem("token")
    setLoggedIn(false)
  }

  useEffect(() => {
    transformReferences();
  }, [currentCafe]);

  return (
    <div className="Dashboard">
      <Header logout={logout} loggedIn={loggedIn}/>
      {/* Displays search bar and retrieves the user input inside of the searchbar */}
      <Search
        handleInputChange={(e) => {
          const { value } = e.target;

          // Makes API call to database to retrieve potential matches
          setCafeSearch(value);
        }}
        search={cafeSearch}
        handleFormSubmit={handleCafesSearchSubmit}
      />

      {/* Displays search results as a button displaying the cafe name */}
      {/* Click the name of cafe to select that cafe and populate the form with details already stored in database */}
      <div className="SearchResults">
        {cafes.length === 0 ? (
          <div>
            Please Search Database for Results
            <div className="Response">
              {noResults === true ? <p>No cafes found</p> : null}
            </div>
          </div>
        ) : (
          cafes.map((cafe) => (
            <Button
              className="SearchResultsBtn"
              name={cafe.name}
              onClick={() => handleCafeChange(cafe)}
              key={cafe.place_id || cafe._id}
            />
          ))
        )}
      </div>

      {/* Retrieves input from Places searchbar and makes API call to Google Places */}
      <PlacesSearch
        placesState={placesState}
        handleInputChange={handlePlacesSearchInputChange}
        handleSubmit={handlePlacesSearchSubmit}
        value={placesState.placesSearchbar}
      />

      {/* Passes state from either places search or database search to populate the form with known details */}
      <CafeForm form={currentCafe} id={currentCafe._id} />

      {/* Displays requests sent in by users on client side */}
      <Requests />

      <RoasterForm />
    </div>
  );
}

export default Dashboard;
