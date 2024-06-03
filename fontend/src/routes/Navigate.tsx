
import { Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import PrivateRoute from "./PrivateRoute";

const LoginPage = lazy(() => import("../components/PublicPage/LoginPage"));
const RegisterPage = lazy(
  () => import("../components/PublicPage/RegisterPage")
);
const HomePage = lazy(() => import("../components/PublicPage/HomePage"));
const ProductDetail = lazy(
  () => import("../components/PublicPage/ProductDetail")
);
const CartPage = lazy(() => import("../components/PublicPage/CartPage"));
const ManageProduct = lazy(() => import("../components/Admin/ManageProduct"));
const AddProduct = lazy(() => import("../components/Admin/AddProduct"));
const EditProduct = lazy(() => import("../components/Admin/EditProduct"));

function Navigate() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/product-detail/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<CartPage />} />

        {/* For Admin - Method 1*/}
        <Route
          path="/admin/*"
          element={
            <PrivateRoute path="/admin">
              <>
                <Route path="manage-product" element={<ManageProduct />} />
                <Route path="add-product" element={<AddProduct />} />
                <Route path="edit-product/:id" element={<EditProduct />} />
              </>
            </PrivateRoute>
          }
        />


        {/* For Admin - Method 2*/}

        {/* <Route path="/admin/manage-product" element={
         <PrivateRoute >
             <ManageProduct />
           </PrivateRoute>
        } />
        <Route path="/admin/add-product" element={
          <PrivateRoute >
            <AddProduct />
          </PrivateRoute>
        } />
        <Route path="/admin/edit-product/:id" element={
          <PrivateRoute >
             <EditProduct />
          </PrivateRoute>
         } /> */}
      </Routes>
    </Suspense>
  );
}

export default Navigate;



