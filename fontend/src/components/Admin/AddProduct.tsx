import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { Shoe } from "../../redux/style";
import { addNewProduct } from "../../redux/apiRequest";
import { useSelector, useDispatch } from "react-redux";
function AddProduct() {

  const brand = useSelector((state: any) => state.product?.getAll?.shoes.brand);

  const dispatch = useDispatch();
  const navaigte = useNavigate();

  const formik = useFormik<Shoe>({
    initialValues: {
      name: "",
      description: "",
      image: "",
      brandId: "",
      quantity: 0,
      price: 0,
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Required"),
      description: Yup.string().required("Required"),
      quantity: Yup.number()
        .required("Required")
        .positive("Quantity must be greater than 0")
        .integer("Quantity must be an integer"),
      price: Yup.number()
        .required("Required")
        .positive("Price must be greater than 0")
        .integer("Price must be an integer"),
      image: Yup.string().required("Required"),
    }),
    onSubmit: (values) => {
      console.log('Check value:', values);
      addNewProduct(values, dispatch, navaigte);
      formik.resetForm();
    },
  });

  return (
    <div className="container">
      <h1 className="text-center">Add New Product</h1>
      <Link to="/admin/manage-product" className="text-decoration-none">
        Product List
      </Link>
      <Form encType="multipart/form-data" onSubmit={formik.handleSubmit} className="mt-4" >
        <Form.Group className="mb-3">
          <Form.Label>Product Name</Form.Label>
          <Form.Control
            type="text"
            id="name"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="Enter Product Name"
          />
          {formik.touched.name && formik.errors.name ? (
            <div className="text-danger">{formik.errors.name}</div>
          ) : null}
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Image</Form.Label>
          <Form.Control
            type="file"
            id="image"
            name="image"
            onChange={(event: any) => {
              formik.setFieldValue("image", event.currentTarget.files[0]);
            }}
            onBlur={formik.handleBlur}
          />
          {formik.touched.image && formik.errors.image ? (
            <div className="text-danger">{formik.errors.image}</div>
          ) : null}
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control
            type="text"
            id="description"
            name="description"
            value={formik.values.description}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            placeholder="Enter Description"
          />
          {formik.touched.description && formik.errors.description ? (
            <div className="text-danger">{formik.errors.description}</div>
          ) : null}
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Quantity</Form.Label>
          <Form.Control
            type="number"
            id="quantity"
            name="quantity"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="Enter Product Quantity"
          />
          {formik.touched.quantity && formik.errors.quantity ? (
            <div className="text-danger">{formik.errors.quantity}</div>
          ) : null}
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Price</Form.Label>
          <Form.Control
            type="number"
            id="price"
            name="price"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            placeholder="Enter Product Price"
          />
          {formik.touched.price && formik.errors.price ? (
            <div className="text-danger">{formik.errors.price}</div>
          ) : null}
        </Form.Group>
        <Form.Label>Choose Brand</Form.Label>
        <Form.Select
          id="brandId"
          name="brandId"
          value={formik.values.brandId}
          onChange={formik.handleChange}>
          {brand?.map((brand: any) => (
            <option key={brand._id} value={brand._id}>
              {brand.name}
            </option>
          ))}
        </Form.Select>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default AddProduct;
