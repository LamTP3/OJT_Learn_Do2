import { Link } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logOut } from "../redux/apiRequest";
import { logOutSuccess } from "../redux/slice/authSlice";
import { createAxios } from "../createInstance";
import { FaCartArrowDown } from "react-icons/fa";
import { useAuth } from "../services/useAuth";
import "./Menu.css";
function Menu() {
  const { allData, user, accessToken } = useAuth()
  const userId = user?._id
  const dispatch = useDispatch();
  const navigate = useNavigate();

  let axiosJWT = createAxios(allData, dispatch, logOutSuccess);
  const handleLogout = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    logOut(dispatch, userId, navigate, accessToken, axiosJWT);
  };

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand >Shop Shoes</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto mx-auto">
            {user && user.admin === 2 ? (
              <>
                <Link to="/admin/manage-product" className="nav-link">
                  Manage Product
                </Link>
                <Link to="#" className="nav-link">
                  Manage Order
                </Link>
              </>
            ) : (
              <>
                <Link to="/" className="nav-link spaced-link">
                  Product
                </Link>
                <Link to="#" className="nav-link spaced-link">
                  Blog
                </Link>
                <Link to="#" className="nav-link spaced-link">
                  Contact
                </Link>
              </>
            )}
          </Nav>
          <Nav className="ms-auto align-items-center">

            <FaCartArrowDown className="me-3 fs-3" onClick={() => navigate("/cart")} />
            {user ? (
              <>
                <img
                  src="https://khoinguonsangtao.vn/wp-content/uploads/2022/08/hinh-anh-meo-cute-doi-mat-to-tron-den-lay-de-thuong.jpg"
                  alt="Avatar"
                  className="rounded-circle  avatar_style"
                />
                <span className="ms-2">{user?.username}</span>
                <Nav.Link className="ms-2" onClick={handleLogout}>
                  Logout
                </Nav.Link>
              </>
            ) : (
              <>
                <Button
                  variant="primary"
                  className="me-2"
                  onClick={() => navigate("/login")}
                >
                  Login
                </Button>
                <Button variant="success" onClick={() => navigate("/register")}>
                  Register
                </Button>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Menu;
