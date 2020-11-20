import axios from "axios";
/* eslint import/no-anonymous-default-export: [2, {"allowObject": true}] */
export default {
  // Cafe API calls
  getCafe: function (id) {
    return axios.get(process.env.REACT_APP_SERVER_URL + "/api/cafes/" + id);
  },
  updateCafe: function (id, data) {
    return axios.put(
      process.env.REACT_APP_SERVER_URL + "/api/cafes/" + id,
      data
    );
  },
  deleteCafe: function (id) {
    return axios.delete(process.env.REACT_APP_SERVER_URL + "/api/cafes/" + id);
  },
  postCafe: function (cafeData) {
    return axios.post(
      process.env.REACT_APP_SERVER_URL + "/api/cafes",
      cafeData
    );
  },
  // Request API calls
  getRequests: function () {
    return axios.get(process.env.REACT_APP_SERVER_URL + "/api/requests");
  },
  deleteRequest: function (id) {
    return axios.delete(
      process.env.REACT_APP_SERVER_URL + "/api/requests/" + id
    );
  },
  getRoaster: function (id) {
    return axios.get(process.env.REACT_APP_SERVER_URL + "/api/roasters/" + id);
  },
  postRoaster: function (id, data) {
    return axios.post(
      process.env.REACT_APP_SERVER_URL + "/api/roasters/",
      data
    );
  },
  updateRoaster: function (id, data) {
    return axios.put(
      process.env.REACT_APP_SERVER_URL + "/api/roasters/" + id,
      data
    );
  },
  deleteRoaster: function (id) {
    return axios.delete(
      process.env.REACT_APP_SERVER_URL + "/api/roasters/" + id
    );
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
  login: async function (userData) {
    try {
      const res = await fetch(
        process.env.REACT_APP_SERVER_URL + "/api/users/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        }
      );
      return await res.json();
    } catch (err) {
      return null;
    }
  },
};
