import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8080/api/";

class OrderService {
  async getCompanyOrdersByStatus(status, pageNumber) {
    console.log("POBIERAŃSKO");
    return axios
      .get(
        API_URL + "order" + "?" + "status=" + status + "&page=" + pageNumber,
        { headers: authHeader() }
      )
      .then((response) => {
        //console.log(response.data)
        return response.data;
      });
  }
  async getOrders(
    companyName,
    addressFrom,
    addressTo,
    pickUpDateFrom,
    pickUpDateTo,
    vehicleType,
    status,
    pageNumber
  ) {
    console.log("POBIERAŃSKO");
    console.log(authHeader());
    const payload = {
      companyName: companyName,
      addressFrom: addressFrom,
      addressTo: addressTo,
      pickUpDateFrom: pickUpDateFrom,
      pickUpDateTo: pickUpDateTo,
      vehicleType: vehicleType,
      status: status,
      pageNumber: pageNumber,
    };
    console.log(payload);
    return axios
      .post(API_URL + "order/all", payload, {
        headers: authHeader(),
      })
      .then((response) => {
        //console.log(response.data)
        console.log(response);
        return response.data;
      });
  }
  async saveOrder(createOrderFormData) {
    console.log(createOrderFormData);
    return axios
      .post(API_URL + "order/save", createOrderFormData, {
        headers: authHeader(),
      })
      .then((response) => {
        //console.log(response.data)
        return response.data;
      });
  }
}

export default new OrderService();
