import {
  createSlice
  , PayloadAction
} from "@reduxjs/toolkit";
import { Cart } from "../style";
const productSlice = createSlice({
  name: "product",
  initialState: {
    getAll: {
      isFetching: false,
      error: false,
      shoes: [],
    },
    addNewProduct: {
      isFetching: false,
      error: false,
      success: false,
    },

    updateProduct: {
      isFetching: false,
      error: false,
      success: false,
    },
    cart: [] as Cart[],

  },
  reducers: {
    //
    getAllStart: (state) => {
      state.getAll.isFetching = true;
    },
    getAllSuccess: (state, action) => {
      state.getAll.isFetching = false;
      state.getAll.shoes = action.payload;
      state.getAll.error = false;
    },
    getAllFailed: (state) => {
      state.getAll.isFetching = false;
      state.getAll.error = true;
    },


    // add new product
    addNewProductStart: (state) => {
      state.addNewProduct.isFetching = true;
    },
    addNewProductSuccess: (state) => {
      state.addNewProduct.isFetching = false;
      state.addNewProduct.success = true;
    },
    addNewProductFailed: (state) => {
      state.addNewProduct.isFetching = false;
      state.addNewProduct.error = true;
    },


    // update product
    updateProductStart: (state) => {
      state.updateProduct.isFetching = true;
    },
    updateProductSuccess: (state) => {
      state.updateProduct.isFetching = false;
      state.updateProduct.success = true;
    },
    updateProductFailed: (state) => {
      state.updateProduct.isFetching = false;
      state.updateProduct.error = true;
    },

    addCart: (state, action: PayloadAction<Cart>) => {
      const newItem = action.payload;
      const existingItemIndex = state.cart.findIndex(item => item.id === newItem.id);
      if (existingItemIndex !== -1) {
        // Nếu sản phẩm đã tồn tại trong giỏ hàng, cộng thêm vào số lượng
        state.cart[existingItemIndex].quantity += newItem.quantity;
      } else {
        // Nếu sản phẩm chưa có trong giỏ hàng, thêm mới vào
        state.cart.push(newItem);
      }
    },

    removeCartItem: (state, action: PayloadAction<string>) => {
      const itemId = action.payload;
      const itemIndex = state.cart.findIndex(item => item.id === itemId);
      if (itemIndex !== -1) {
        // Xóa sản phẩm khỏi giỏ hàng nếu tồn tại
        state.cart.splice(itemIndex, 1);
      }
    },
  },
}



);

export const {
  getAllStart,
  getAllSuccess,
  getAllFailed,
  addNewProductStart,
  addNewProductSuccess,
  addNewProductFailed,
  updateProductStart,
  updateProductSuccess,
  updateProductFailed,

  addCart,
  removeCartItem

} = productSlice.actions;
export default productSlice.reducer;
