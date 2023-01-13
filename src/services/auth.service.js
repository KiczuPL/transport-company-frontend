import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8080/api/auth/";

class AuthService {
  login(username, password) {
    var params = new URLSearchParams();
    params.append("username", username);
    params.append("password", password);
    return axios.post(API_URL + "signin", params).then((response) => {
      if (response.data.access_token) {
        localStorage.setItem(
          "accessToken",
          JSON.stringify(response.data.access_token)
        );
        localStorage.setItem(
          "refreshToken",
          JSON.stringify(response.data.refresh_token)
        );
      }
      return response.data;
    });
  }

  changePassword(password) {
    return axios
      .post(
        API_URL + "passwd",
        { newPassword: password },
        {
          headers: authHeader(),
        }
      )
      .then((response) => {
        return response.status;
      });
  }

  logout() {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");
  }
}

export default new AuthService();
