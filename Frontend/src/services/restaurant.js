import http from "../http-common";

//make all fxns that make API calls and return info from API calls
class RestaurantDataService {
    getAll(page = 0) {
        return http.get(`/tables?page=${page}`);
    }

    getWithNumGuests(num = 0){
        return http.get(`/tables?numGuests=${num}`);
    }
    
    get(id) {
        return http.get(`/id/${id}`);
    }
    
    find(query, by = "name", page = 0) {
        return http.get(`?${by}=${query}&page=${page}`);
    } 
    
    createReview(data) {
        return http.post("/review", data);
    }

    createReservation(data) {
        return http.post("/reservations", data);
    }

    createUser(data) {
        return http.post("/register", data);
    }
    
    updateReview(data) {
        return http.put("/review", data);
    }
    
    deleteReview(id, userId) {
        return http.delete(`/review?id=${id}`, {data:{user_id: userId}});
    }
    
    getCuisines(id) {
        return http.get(`/cuisines`);
    }

}
    
export default new RestaurantDataService();