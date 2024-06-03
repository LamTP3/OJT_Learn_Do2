import axios from "axios";
import {
  loginStart,
  loginSuccess,
  loginFailed,
  registerStart,
  logOutStart,
  logOutSuccess,
  logOutFailed,
} from "./slice/authSlice";
import {
  getAllStart,
  getAllSuccess,
  getAllFailed,
  addNewProductStart,
  addNewProductSuccess,
  addNewProductFailed,
  updateProductStart,
  updateProductSuccess,
  updateProductFailed,
} from "./slice/productSlice";
import { toast } from "react-toastify";
import service from "../services/service";

// LOGIN
export const loginUser = async (user: any, dispatch: any, naviagte: any) => {
  dispatch(loginStart());
  try {
    const res = await axios.post("/api/v1/login", user);
    dispatch(loginSuccess(res.data));
    if (res.data.user.admin === 2) {
      naviagte("/admin/manage-product");
    } else {
      naviagte("/");
    }

  } catch (error: any) {
    dispatch(loginFailed());
    toast.error(error.response.data);
  }
};

// LOGOUT
export const logOut = async (
  dispatch: any,
  id: any,
  naviagte: any,
  accessToken: any,
  axiosJWT: any
) => {
  dispatch(logOutStart());
  try {
    await axiosJWT.post("/api/v1/logout", id, {
      headers: { token: `Bearer ${accessToken}` },
    });
    // await service.logOut(id, accessToken);
    dispatch(logOutSuccess());
    naviagte("/");
  } catch (error) {
    dispatch(logOutFailed());
  }
};

// REGISTER
export const registerUser = async (user: any, dispatch: any, naviagte: any) => {
  dispatch(registerStart());
  try {
    await service.registerUser(user);
    toast.success("Register Successfully!");
    dispatch(loginSuccess(user));
    naviagte("/login");
  } catch (error: any) {
    dispatch(loginFailed());
    toast.error("Email or username already exists!");
  }
};

// GET ALL PRODUCT WITH BRAND
export const getAll = async (dispatch: any) => {
  dispatch(getAllStart());
  try {
    const res = await service.getAllProduct();
    dispatch(getAllSuccess(res.data));
  } catch (error: any) {
    dispatch(getAllFailed());
  }
};


// ADD NEW PRODUCT
export const addNewProduct = async (product: any, dispatch: any, navigate: any) => {
  dispatch(addNewProductStart());
  try {
    const formData = new FormData();
    formData.append('name', product.name);
    formData.append('description', product.description);
    formData.append('image', product.image);
    formData.append('brandId', product.brandId);
    formData.append('quantity', product.quantity);
    formData.append('price', product.price);
    await service.addNewProduct(formData);
    toast.success("Added Successfully!");
    dispatch(addNewProductSuccess());
    navigate("/admin/manage-product");
  } catch (error) {
    dispatch(addNewProductFailed());
    toast.error("Failed to add product.");
  }
};


// UPDATE PRODUCT
export const updateProduct = async (product: any, id: any, dispatch: any, navigate: any) => {
  dispatch(updateProductStart());
  try {
    const formData = new FormData();
    formData.append('name', product.name);
    formData.append('description', product.description);
    formData.append('image', product.image);
    formData.append('brandId', product.brandId);
    formData.append('quantity', product.quantity);
    formData.append('price', product.price);
    await service.updateProduct(formData, id);
    dispatch(updateProductSuccess());
    toast.success("Updated Successfully!");
    navigate("/admin/manage-product");
  } catch (error) {
    toast.error("Failed to update product.");
    dispatch(updateProductFailed());
  }
}