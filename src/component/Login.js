import React, { useState, useEffect } from "react";
import { Field, Form, Formik, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Navigate, Outlet, useNavigate, Link } from "react-router-dom";

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
      // Perform a fetch request to check the credentials against the JSON server
      const response = await fetch("http://localhost:3001/users");
      const users = await response.json();
      const user = users.find(
        (u) =>
          u.username === inpuUserData.username &&
          u.password === inpuUserData.password
      );

      if (user) {
        localStorage.setItem("Login", JSON.stringify(inpuUserData));
        navigate("/admin/dashboard");
        alert("Login successfully");
      } else {
        alert("Invalid username or password");
      }
    } catch (error) {
      console.error("Error logging in:", error);
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
          <div className="container">
            <Form>
              <div>
                <Field
                  type="text"
                  name="username"
                  placeholder="Enter username"
                />
                <ErrorMessage component="div" name="username" />
              </div>

              <div>
                <Field
                  type="password"
                  name="password"
                  placeholder="Enter password"
                />
                <ErrorMessage component="div" name="password" />
              </div>

              <button type="submit">Submit</button>
            </Form>
          </div>
        )}
      </Formik>
    </>
  );
}

export default Login;
