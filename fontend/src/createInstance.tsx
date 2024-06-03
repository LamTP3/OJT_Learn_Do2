import axios from "axios";
import { jwtDecode } from "jwt-decode";

// REFRESH TOKEN
const refreshToken = async () => {
  try {
    const res = await axios.post("/api/v1/refresh", {
      withCredentials: true,
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

// CREATE AXIOS: là một middleware được dùng để kiểm tra xem token còn hạn hay không
export const createAxios = (user: any, dispatch: any, stateSuccess: any) => {
  const newInstance = axios.create();
  newInstance.interceptors.request.use(
    async (config) => {
      let date = new Date();
      const decodedToken: any = jwtDecode(user?.accessToken);
      if (decodedToken.exp < date.getTime() / 1000) {
        const data = await refreshToken();
        const refreshUser = {
          ...user,
          accessToken: data.accessToken,
        };
        dispatch(stateSuccess(refreshUser));
        config.headers["token"] = "Bearer " + data.accessToken;
      }
      return config;
    },
    (err) => {
      return Promise.reject(err);
    }
  );
  return newInstance;
};
