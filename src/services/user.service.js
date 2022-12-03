import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/api/';

class UserService {

    getLoggedUserInfo() {
        return axios
            .get(API_URL + "user", { headers: authHeader() })
            .then(response => {
                console.log(response.data)
                if (response.data) {

                    localStorage.setItem("user", JSON.stringify(response.data));
                    console.log(response.data)
                }
                return response.data;
            });
    }

    getAllUsers() {
        return axios.get(API_URL + 'users');
    }
}

export default new UserService();