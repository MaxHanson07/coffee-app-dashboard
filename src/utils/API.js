import axios from "axios";

export default {

    // Shop API calls
    getShop: function (id) {
        return axios.get("/api/cafes/" + id);
    },
    updateShop: function (id) {
        return axios.put("/api/cafes/" + id);
    },
    deleteShop: function (id) {
        return axios.delete("/api/cafes/" + id);
    },
    postShop: function (shopData) {
        return axios.post("/api/cafes", shopData);
    },
    getRequests: function {
        return axios.get("/api/requests");
    },
    deleteRequest: function (id) {
        return axios.delete("/api/requests/" + id);
    },
    placesSearch: function (name) {
        console.log(name)
        return axios.get(process.env.REACT_APP_SERVER_URL + "/api/places/search/" + name)
    }

    // Request API calls
};