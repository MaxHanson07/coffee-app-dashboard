import axios from "axios";

export default {
  // Cafe API calls
  getCafe: function (id) {
    return axios.get(process.env.REACT_APP_SERVER_URL + "/api/cafes/" + id);
  },
  updateCafe: function (id, data, token) {
    return fetch(
      process.env.REACT_APP_SERVER_URL + "/api/cafes/" + id,
      {
        method: "PUT",
        headers: {
          "authorization": `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      }
    );
  },
  deleteCafe: function (id, token) {
    return fetch(process.env.REACT_APP_SERVER_URL + "/api/cafes/" + id, 
    {
      method: "DELETE",
      headers: {
        "authorization": `Bearer ${token}`,
      }
    });
  },
  postCafe: function (cafeData, token) {
    return fetch(
      process.env.REACT_APP_SERVER_URL + "/api/cafes",
      {
        method: "POST",
        headers: {
          "authorization": `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(cafeData)
      }
    );
  },
  // Request API calls
  getRequests: function () {
    return axios.get(process.env.REACT_APP_SERVER_URL + "/api/requests");
  },
  deleteRequest: function (id, token) {
    return fetch(`${process.env.REACT_APP_SERVER_URL}/api/requests/${id}`, {
      method: "DELETE",
      headers: {
        "authorization": `Bearer ${token}`
      }
    })
  },
  getRoaster: function (id) {
    return axios.get(process.env.REACT_APP_SERVER_URL + "/api/roasters/" + id);
  },
  postRoaster: function (id, data, token) {
    return fetch(
      process.env.REACT_APP_SERVER_URL + "/api/roasters/", 
      {
        method: "POST",
        headers: {
          "authorization": `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      }
    );
  },
  updateRoaster: function (id, data, token) {
    return fetch(
      process.env.REACT_APP_SERVER_URL + "/api/roasters/" + id, 
      {
        method: "PUT",
        headers: {
          "authorization": `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      }
    );
  },
  deleteRoaster: function (id, token) {
    return fetch(`${process.env.REACT_APP_SERVER_URL}/api/roasters/${id}`, {
      method: "DELETE",
      headers: {
        "authorization": `Bearer ${token}`
      }
    })
  },
  roastersSearch: function (name) {
    return axios.get(
      process.env.REACT_APP_SERVER_URL + "/api/roasters/search/" + name
    );
  },
  // Google Places API calls
  placesSearch: function (name) {
    return axios.get(
      process.env.REACT_APP_SERVER_URL + "/api/places/search/" + name
    );
  },
  addUrls: function (photoArray) {
    return axios.post(process.env.REACT_APP_SERVER_URL + "/api/photos", {
      photos: photoArray,
    });
  },
  // Get cafe by name (used in database search)
  cafesSearch: function (name) {
    return axios.get(
      process.env.REACT_APP_SERVER_URL + "/api/cafes/search/" + name
    );
  },
  login: function (userData) {
    console.log(userData)
    return fetch(
      process.env.REACT_APP_SERVER_URL + "/api/users/login", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    }).then(res => res.json()).catch(err => null)
  },
  verifyToken: function (token) {
    console.log(token)
    return fetch(`${process.env.REACT_APP_SERVER_URL}/api/users/checkAuth`, {
      headers: {
        "authorization": `Bearer ${token}`
      }
    })
  }
};
