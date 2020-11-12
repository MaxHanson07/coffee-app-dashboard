import React, { useEffect, useState } from 'react'

export default function PlacesSearch(props) {
   
    return (
        <form onSubmit={props.handleSubmit}>
            <input type="text" name="placesSearchbar" placeholder="Search Google Places" value={props.searchBar} onChange={props.handleInputChange}></input>
            <button>Search</button>
        </form>
    )
  
}