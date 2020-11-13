import axios from "axios";

export default {

    // Cafe API calls
    getCafe: function (id) {
        return axios.get(process.env.REACT_APP_SERVER_URL + "/api/cafes/" + id);
    },
    updateCafe: function (id) {
        return axios.put(process.env.REACT_APP_SERVER_URL + "/api/cafes/" + id);
    },
    deleteCafe: function (id) {
        return axios.delete(process.env.REACT_APP_SERVER_URL + "/api/cafes/" + id);
    },
    postCafe: function (cafeData) {
        return axios.post(process.env.REACT_APP_SERVER_URL + "/api/cafes", cafeData);
    },
    // Request API calls
    getRequests: function () {
        return axios.get(process.env.REACT_APP_SERVER_URL + "/api/requests");
    },
    deleteRequest: function (id) {
        return axios.delete(process.env.REACT_APP_SERVER_URL + "/api/requests/" + id);
    },
    // Google Places API calls
    placesSearch: function (name) {
        console.log(name)
        return axios.get(process.env.REACT_APP_SERVER_URL + "/api/places/search/" + name)
    },
    // Get cafe by name (used in database search)
    cafesSearch: function (name) {
        console.log(name)
        return axios.get(process.env.REACT_APP_SERVER_URL + "/api/cafes/search/" + name)
    }
};