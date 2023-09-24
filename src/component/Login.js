import React, { useEffect } from "react";
import { Field, Form, Formik, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import {
  Card,
  Row,
  Col,
  Button,
  Container,
  FloatingLabel,
} from "react-bootstrap";
import { toast } from "react-toastify";

function Login() {
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("Login"));
    if (user) {
      navigate("/admin/dashboard");
    }
  }, []);

  const initialValues = {
    username: "",
    password: "",
  };

  const ValidationSchema = Yup.object().shape({
    username: Yup.string().required("Username is required"),
    password: Yup.string().required("Password is required"),
  });

  const handleLogin = async (inpuUserData) => {
    try {
      const response = await fetch("http://localhost:3001/users");
      const users = await response.json();
      const user = users.find(
        (u) =>
          u.username === inpuUserData.username &&
          u.password === inpuUserData.password
      );

      if (user) {
        localStorage.setItem("Login", JSON.stringify(inpuUserData));
        toast.success("Login successfully");
        navigate("/admin/dashboard");
      } else {
        toast.error("Invalid username or password");
      }
    } catch (error) {
      toast.error("Error logging in:", error);
    }
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={ValidationSchema}
        onSubmit={handleLogin}
      >
        {() => (
          <Container>
            <Form>
              <Card className="col-md-6 mx-auto mt-5">
                <Card.Body>
                  <Card.Title>
                    <h3 className="text-center mb-3">Login</h3>
                  </Card.Title>

                  <FloatingLabel
                    controlId="floatingUsername"
                    label="Username"
                    className="mb-3"
                  >
                    <Field
                      name="username"
                      id="floatingUsername"
                      className="form-control"
                      placeholder="First Name"
                    />
                    <ErrorMessage
                      component="div"
                      name="username"
                      className="error-message"
                    />
                  </FloatingLabel>

                  <FloatingLabel
                    controlId="floatingPassword"
                    label="Password"
                    className="mb-3"
                  >
                    <Field
                      type="password"
                      name="password"
                      id="floatingPassword"
                      className="form-control"
                      placeholder="Password"
                    />
                    <ErrorMessage
                      component="div"
                      name="password"
                      className="error-message"
                    />
                  </FloatingLabel>
                </Card.Body>
                <Button
                  variant="outline-primary"
                  type="submit"
                  className="col-md-5 mx-auto mb-4"
                >
                  Login
                </Button>
              </Card>
            </Form>
          </Container>
        )}
      </Formik>
    </>
  );
}

export default Login;
