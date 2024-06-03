import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";

import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../redux/apiRequest";
import { useFormik } from "formik";
import * as Yup from "yup";
function RegisterPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      username: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .required("Required")
        .min(10, "Email at least 10 chars")
        .max(50, "Email at most 30 chars"),
      username: Yup.string()
        .required("Required")
        .min(6, "Username at least 6 chars")
        .max(20, "Username at most 20 chars"),
      password: Yup.string()
        .required("Required")

        .min(6, "Password at least 6 chars"),
      confirmPassword: Yup.string()
        .required("Required")
        .oneOf([Yup.ref("password")], "Passwords must match"),
    }),
    onSubmit: (values) => {
      const { confirmPassword, ...user } = values;
      registerUser(user, dispatch, navigate);
    },
  });

  return (
    <div>
      <Container>
        <h1 className="text-center">Register Page</h1>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group className="mb-3 mt-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              autoComplete="off"
            />
            {formik.touched.email && formik.errors.email ? (
              <div className="text-danger">{formik.errors.email}</div>
            ) : null}
          </Form.Group>
          <Form.Group className="mb-3">
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
          <Form.Group className="mb-3">
            <Form.Label> Confirm Password</Form.Label>
            <Form.Control
              type="password"
              name="confirmPassword"
              placeholder="Enter confirm password"
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              autoComplete="off"
            />
            {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
              <div className="text-danger">{formik.errors.confirmPassword}</div>
            ) : null}
          </Form.Group>
          <button type="submit" className="btn btn-primary">
            Register
          </button>
        </Form>
      </Container>
    </div>
  );
}

export default RegisterPage;
