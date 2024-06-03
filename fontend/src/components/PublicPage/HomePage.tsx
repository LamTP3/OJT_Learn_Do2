import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router-dom";
import { FaCartArrowDown } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState,useCallback } from "react";
import { getAll } from "../../redux/apiRequest";
import Modal from "react-bootstrap/Modal";
import { addCart } from "../../redux/slice/productSlice";
import { toast } from "react-toastify";
function HomePage() {

  const shoes = useSelector((state: any) => state.product?.getAll?.shoes.products);
  const brands = useSelector((state: any) => state.product?.getAll?.shoes.brand);
  const cartItems = useSelector((state: any) => state.product.cart);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // State variables for brand selection, search input, and filtered shoes
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [searchShoeByName, setSearchShoeByName] = useState<string>("");
  const [filteredShoes, setFilteredShoes] = useState(shoes || []);

  // dùng cho modal
  const [product, setProduct] = useState<any>([]);
  const [show, setShow] = useState(false);

  useEffect(() => {
    getAll(dispatch);
  }, [dispatch]);

  // Handle changes to brand checkboxes
  const handleBrandChange = (brandId: string) => {
    // kiểm tra brand này có trong các brand đã chọn để filter hay chưa
    const index = selectedBrands.indexOf(brandId);
    // nếu chưa thì thêm nó vào để filter
    if (index === -1) {
      setSelectedBrands([...selectedBrands, brandId]);
    } else {
      // nếu có rồi thì hành động click vào bây giờ nghĩa là bỏ không chọn brand này nữa
      const newSelectedBrands = [...selectedBrands];
      newSelectedBrands.splice(index, 1);
      setSelectedBrands(newSelectedBrands);
    }
  };
  const filterShoesByBrand = useCallback((shoe: any) => {
    if (selectedBrands.length === 0) return true;
    return selectedBrands.includes(shoe.brandId.toString());
  }, [selectedBrands]);
  
  // Chuyển hàm filterShoesByName thành một callback
  const filterShoesByName = useCallback((shoe: any) => {
    if (!searchShoeByName) return true;
    return shoe.name.toLowerCase().includes(searchShoeByName.toLowerCase());
  }, [searchShoeByName]);
  
  useEffect(() => {
    if (shoes) {
      // Filter shoes based on selected brands and search input
      const filtered = shoes.filter(filterShoesByBrand).filter(filterShoesByName);
      setFilteredShoes(filtered);
    }
  }, [shoes, selectedBrands, searchShoeByName, filterShoesByBrand, filterShoesByName]);



  // Modal state and handlers
  // product add to cart 

  const handleClose = () => setShow(false);
  const handleShow = (id: any) => {

    const choseProduct = shoes.find((shoe: any) => shoe._id === id)

    setProduct(choseProduct)
    setShow(true)
  };

  // handle add to cart
  const [quantity, setQuantity] = useState(1);
  const handleAddToCart = () => {
    if (quantity <= 0) {
      toast.error("Quantity must be greater than 0");
      return;
    }
    const existingItem = cartItems.find((item: any) => item.id === product._id);
    if (existingItem) {
      const updatedQuantity = existingItem.quantity + quantity;
      dispatch(addCart({ ...existingItem, quantity: updatedQuantity }));
      navigate(`/cart`);
      setShow(false)
    } else {
      const newCart = {
        id: product._id,
        name: product.name,
        image: product.image,
        price: product.price,
        quantity: quantity,
      }
      dispatch(addCart(newCart))
      navigate(`/cart`);
      setShow(false)
    }
  };

  return (
    <>
      <Container>
        <h1 className="text-center">Home Page</h1>
        <Row>
          <Col xs={2}>
            <h2>Brand</h2>
            <Form>
              <Form.Group >
                <Form.Check
                  label="All"
                  type="checkbox"
                  checked={selectedBrands.length === 0}
                  onChange={() => setSelectedBrands([])}
                />
                {brands?.map((brand: any, index: number) => (
                  <Form.Check
                    key={`brand-${index}`}
                    label={brand.name}
                    type="checkbox"
                    className="mt-2"
                    checked={selectedBrands.includes(brand._id)}
                    onChange={() => handleBrandChange(brand._id)}
                  />
                ))}
              </Form.Group>
            </Form>
          </Col>
          <Col xs={10}>
            <div className="d-flex mb-3">
              <input
                type="text"
                className="form-control"
                value={searchShoeByName}
                onChange={(e) => setSearchShoeByName(e.target.value)}
                placeholder="Search Product by name"
              />
            </div>
            <Row className="mt-3">
              {filteredShoes?.map((shoe: any, index: number) => (
                <Col md={4} key={`shoe-${index}`}>
                  <Card style={{ width: "100%" }} className="mt-3">
                    <Card.Img variant="top" src={shoe.image} />
                    <Card.Body>
                      <Card.Title>{shoe.name}</Card.Title>
                      <Card.Text>
                        <span>Description: {shoe.description}</span>
                      </Card.Text>
                      <Card.Text>
                        Brand: {brands.find((brand: any) => brand._id === shoe.brandId)?.name}
                      </Card.Text>
                      <Button
                        variant="primary"
                        onClick={() => navigate(`/product-detail/${shoe._id}`)}
                        className="me-2"
                      >
                        Show more
                      </Button>
                      <Button variant="success" onClick={() => handleShow(shoe._id)}>
                        <FaCartArrowDown />
                        Add to cart
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </Col>
        </Row>
      </Container>

      {/* Modal Add to Cart */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{product?.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Quantity</Form.Label>
              <Form.Control type="number" value={quantity} onChange={(e) => setQuantity(Number(e.target.value))} autoFocus />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={() => handleAddToCart()}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default HomePage;
