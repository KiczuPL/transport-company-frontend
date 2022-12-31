import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8080/api/";

class CompanyService {
  async getCompanies(name, taxId, address, pageNumber) {
    return axios
      .get(
        API_URL +
          "company" +
          "?" +
          "name=" +
          name +
          "&taxId=" +
          taxId +
          "&address=" +
          address +
          "&page=0" +
          pageNumber,
        {
          headers: authHeader(),
        }
      )
      .then((response) => {
        //console.log(response.data)
        console.log(response.data.companies);
        return response.data;
      });
  }
  async updateCompany(company) {
    return axios
      .put(API_URL + "company", company, {
        headers: authHeader(),
      })
      .then((response) => {
        return response.data;
      });
  }
  async saveCompany(company) {
    return axios
      .post(API_URL + "company/save", company, {
        headers: authHeader(),
      })
      .then((response) => {
        return response.data;
      });
  }
  async deleteCompany(id) {
    return axios
      .delete(API_URL + "company/" + id, {
        headers: authHeader(),
      })
      .then((response) => {
        return response.data;
      });
  }
}

export default new CompanyService();
