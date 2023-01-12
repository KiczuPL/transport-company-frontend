import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8080/api/";

class UserService {
  getLoggedUserInfo() {
    return axios
      .get(API_URL + "user/me", { headers: authHeader() })
      .then((response) => {
        //console.log(response.data);
        if (response.data) {
          localStorage.setItem("user", JSON.stringify(response.data));
          //console.log(response.data);
        }
        return response.data;
      });
  }

  getUsers(username, firstName, lastName, email, companyName, page) {
    return axios
      .get(
        API_URL +
          "user?" +
          "username=" +
          username +
          "&firstName=" +
          firstName +
          "&lastName=" +
          lastName +
          "&email=" +
          email +
          "&companyName=" +
          companyName +
          "&page=" +
          page,
        { headers: authHeader() }
      )
      .then((response) => {
        //console.log(response.data.users);
        return response.data;
      });
  }

  deleteUser(id) {
    return axios
      .delete(API_URL + "user/" + id, { headers: authHeader() })
      .then((response) => {
        return response.data;
      });
  }

  updateUser(user) {
    return axios
      .put(API_URL + "user", user, {
        headers: authHeader(),
      })
      .then((response) => {
        return response.data;
      });
  }

  async updateUser(user) {
    return axios
      .put(API_URL + "user", user, {
        headers: authHeader(),
      })
      .then((response) => {
        return response.data;
      });
  }

  async saveUser(user) {
    //console.log(user);
    return axios
      .post(API_URL + "user/save", user, { headers: authHeader() })
      .then((response) => {
        return response.data;
      });
  }
}

export default new UserService();
