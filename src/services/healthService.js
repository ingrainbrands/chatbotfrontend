import apiClient from "./apiClient";
import API from "../config/api";

class HealthService {
  async check() {
    const response = await apiClient.get(API.HEALTH);

    return response.data;
  }

  async status() {
    const response = await apiClient.get(API.STATUS);

    return response.data;
  }
}

export default new HealthService();