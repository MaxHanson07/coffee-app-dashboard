import axios from "axios";

export default {

    // Shop API calls
    getShop: function (id) {
        return axios.get(process.env.REACT_APP_SERVER_URL + "/api/cafes/" + id);
    },
    updateShop: function (id) {
        return axios.put(process.env.REACT_APP_SERVER_URL + "/api/cafes/" + id);
    },
    deleteShop: function (id) {
        return axios.delete(process.env.REACT_APP_SERVER_URL + "/api/cafes/" + id);
    },
    postShop: function (shopData) {
        return axios.post(process.env.REACT_APP_SERVER_URL + "/api/cafes", shopData);
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
    }
    
};