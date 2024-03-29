import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8080/api/";

class OrderService {
  async getCompanyOrdersByStatus(
    addressFrom,
    addressTo,
    pickUpDateFrom,
    pickUpDateTo,
    status,
    pageNumber
  ) {
    return axios
      .get(
        API_URL +
          "order" +
          "?status=" +
          status +
          "&addressFrom=" +
          addressFrom +
          "&addressTo=" +
          addressTo +
          "&pickUpDateFrom=" +
          pickUpDateFrom +
          "&pickUpDateTo=" +
          pickUpDateTo +
          "&page=" +
          pageNumber,
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
    status,
    pageNumber
  ) {
    //console.log("POBIERAŃSKO");
    //console.log(authHeader());
    const payload = {
      companyName: companyName,
      addressFrom: addressFrom,
      addressTo: addressTo,
      pickUpDateFrom: pickUpDateFrom,
      pickUpDateTo: pickUpDateTo,
      status: status,
      pageNumber: pageNumber,
    };
    //(payload);
    return axios
      .post(API_URL + "order/all", payload, {
        headers: authHeader(),
      })
      .then((response) => {
        //console.log(response.data)
        // console.log(response);
        return response.data;
      });
  }
  async saveOrder(createOrderFormData) {
    //console.log(createOrderFormData);
    return axios
      .post(API_URL + "order/save", createOrderFormData, {
        headers: authHeader(),
      })
      .then((response) => {
        //console.log(response.data)
        return response.data;
      });
  }

  async updateOrder(order) {
    //console.log(order);
    return axios
      .put(API_URL + "order/update", order, {
        headers: authHeader(),
      })
      .then((response) => {
        //console.log(response.data)
        return response.data;
      });
  }

  async deleteOrder(id) {
    return axios
      .delete(API_URL + "order/" + id, {
        headers: authHeader(),
      })
      .then((response) => {
        //console.log(response.data)
        return response.data;
      });
  }

  async assignVehicle(orderId, vehicleId) {
    const body = { orderId: orderId, vehicleId: vehicleId };
    //console.log(body);
    return axios
      .post(API_URL + "order/assignvehicle", body, {
        headers: authHeader(),
      })
      .then((response) => {
        //console.log(response.data)
        return response.data;
      });
  }
}

export default new OrderService();
