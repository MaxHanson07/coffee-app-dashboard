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
        return axios.get("/api/requests")
    }

    // Request API calls
};