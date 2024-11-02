import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const supabaseApiUrl = process.env.EXPO_PUBLIC_SB_API_REST_URL || "";
const supabaseApiKey = process.env.EXPO_PUBLIC_SB_API_KEY || "";

axios.defaults.baseURL = supabaseApiUrl;

axios.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem("token");
    config.headers["apiKey"] = supabaseApiKey;
    if (token) {
      config.headers.Authorization = "Bearer " + token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
