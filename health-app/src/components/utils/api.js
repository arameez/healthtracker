import axios, { AxiosError } from "axios";
import { apiUrl } from '../../config';

const apiClient = axios.create({
    baseURL: apiUrl,
    timeout: 5000,
    headers: {
      "Content-Type": "application/json",
    },
  });

  export default apiClient;