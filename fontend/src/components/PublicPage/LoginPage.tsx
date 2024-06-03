import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginUser } from "../../redux/apiRequest";
import { useFormik } from "formik";
import * as Yup from "yup";

function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: Yup.object({
      username: Yup.string().required("Required"),
      password: Yup.string().required("Required"),
    }),
    onSubmit: (values) => {
      loginUser(values, dispatch, navigate);
    },
  });

  return (
    <div>
      <Container>
        <h1 className="text-center">Login Page</h1>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group className="mb-3 mt-3">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              name="username"
              placeholder="Enter your username"
              value={formik.values.username}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              autoComplete="off"
            />
            {formik.touched.username && formik.errors.username ? (
              <div className="text-danger">{formik.errors.username}</div>
            ) : null}
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              autoComplete="off"
            />
            {formik.touched.password && formik.errors.password ? (
              <div className="text-danger">{formik.errors.password}</div>
            ) : null}
          </Form.Group>
          <button type="submit" className="btn btn-primary">
            Login
          </button>
        </Form>
      </Container>
    </div>
  );
}

export default LoginPage;
