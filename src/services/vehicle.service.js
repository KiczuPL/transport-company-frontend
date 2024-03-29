import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8080/api/";

class VehicleService {
  getVehicles(registrationNumber, vehicleIdentifier, type, page) {
    return axios
      .get(
        API_URL +
          "vehicle?" +
          "registrationNumber=" +
          registrationNumber +
          "&vehicleIdentifier=" +
          vehicleIdentifier +
          "&type=" +
          type +
          "&page=" +
          page,
        {
          headers: authHeader(),
        }
      )
      .then((response) => {
        return response.data;
      });
  }
  saveVehicle(vehicle) {
    return axios
      .post(API_URL + "vehicle/save", vehicle, {
        headers: authHeader(),
      })
      .then((response) => {
        return response.data;
      });
  }

  updateVehicle(vehicle) {
    return axios
      .put(API_URL + "vehicle", vehicle, {
        headers: authHeader(),
      })
      .then((response) => {
        return response.data;
      });
  }
  deleteVehicle(id) {
    return axios
      .delete(API_URL + "vehicle/" + id, {
        headers: authHeader(),
      })
      .then((response) => {
        return response.data;
      });
  }
}
export default new VehicleService();
