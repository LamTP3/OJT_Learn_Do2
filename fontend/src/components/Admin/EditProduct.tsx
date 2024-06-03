import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Shoe } from "../../redux/style";
import { useSelector, useDispatch } from "react-redux";
import { updateProduct } from "../../redux/apiRequest";

function EditProduct() {

  const { id } = useParams();
  const shoes = useSelector((state: any) => state.product?.getAll?.shoes?.products);
  const brands = useSelector((state: any) => state.product?.getAll?.shoes?.brand);
  const editShoe = shoes.find((shoe: any) => shoe._id === id);

  const navaigte = useNavigate();
  const dispatch = useDispatch();

  // trả về tên của tệp đang lưu trong database
  const getFileNameFromPath = (path: any) => {
    return path.split('/').pop();
  };

  const formik = useFormik<Shoe>({
    initialValues: {
      name: editShoe?.name,
      description: editShoe?.description,
      image: getFileNameFromPath(editShoe?.image || ''),
      brandId: editShoe?.brandId,
      quantity: editShoe?.quantity,
      price: editShoe?.price,
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
    }),
    onSubmit: (values) => {
      console.log("Check value:", values.image);
      updateProduct(values, id, dispatch, navaigte);

    },
  });

  return (
    <div className="container">
      <h1 className="text-center">Edit Product</h1>
      <Link to="/admin/manage-product" className="text-decoration-none">
        Product List
      </Link>
      <Form encType="multipart/form-data" onSubmit={formik.handleSubmit} className="mt-4">
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
            value={formik.values.quantity}
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
            value={formik.values.price}
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
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          defaultValue={formik.values.brandId}
        >
          {brands.map((brand: any, index: number) => (
            <option key={index} value={brand._id}  >
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

export default EditProduct;
