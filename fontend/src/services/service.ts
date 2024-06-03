import axios from "axios";

export const getAllProduct = () => {
  return axios.get("/api/v1/getAllProduct");
};

export const loginUser = (user: any) => {
  return axios.post("/api/v1/login", user);
};

export const logOut = (id: any, accessToken: any) => {
  return axios.post("/api/v1/logout", id, {
    headers: { token: `Bearer ${accessToken}` },
  });
};

export const registerUser = (user: any) => {
  return axios.post("/api/v1/register", user);
};

export const addNewProduct = (product: any) => {
  return axios.post("/api/v1/addNewProduct", product, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const updateProduct = (product: any, id: any) => {
  return axios.put(`/api/v1/updateProduct/${id}`, product, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

const service = {
  getAllProduct,
  loginUser,
  logOut,
  registerUser,
  addNewProduct,
  updateProduct,
};
export default service;
