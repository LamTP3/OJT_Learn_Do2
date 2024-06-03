import Table from "react-bootstrap/Table";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getAll } from "../../redux/apiRequest";
import axios from "axios";
import { toast } from "react-toastify";
function ManageProduct() {

  const shoes = useSelector((state: any) => state.product?.getAll?.shoes.products);
  const brand = useSelector((state: any) => state.product?.getAll?.shoes.brand);


  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    getAll(dispatch);
  }, [dispatch]);

  // hàm để xóa product
  const handleDelete = async (id: any) => {
    try {
      await axios.delete(`/api/v1/deleteProduct/${id}`);
      getAll(dispatch);
      toast.success("Delete Successfully");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Container>
      <h1>Manage Product</h1>
      <div className="d-flex justify-content-end mb-3">
        <Button
          variant="success"
          onClick={() => navigate("/admin/add-product")}
        >
          Add Product
        </Button>
      </div>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Description</th>
            <th>Image</th>
            <th>Brand Id</th>
            <th>Quanity</th>
            <th>Price</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {shoes?.map((shoe: any, index: number) => (
            <tr key={`shoe-${index}`}>
              <td>{index + 1}</td>
              <td>{shoe.name}</td>
              <td>{shoe.description}</td>
              <td><img src={shoe.image} width={100} alt="error" /></td>
              <td>{brand.find((brand: any) => brand._id === shoe.brandId)?.name}</td>
              <td>{shoe.quantity}</td>
              <td>{shoe.price}</td>
              <td>
                <button
                  className="btn btn-primary me-2"
                  onClick={() => {
                    navigate("/admin/edit-product/" + shoe._id);
                  }}
                >
                  Edit
                </button>
                <button className="btn btn-danger" onClick={() => { handleDelete(shoe._id) }}>Delete</button>
              </td>
            </tr>
          ))}

        </tbody>
      </Table>
    </Container>
  );
}

export default ManageProduct;
