import React, { useEffect } from "react";
import { Field, Form, Formik, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";

import { toast } from "react-toastify";
import AdminNavbar from "../Adminnavbar";

function AddTeam() {
  const navigate = useNavigate();

  const loginCheck = () => {
    const user = JSON.parse(localStorage.getItem("Login"));
    if (!user) {
      navigate("/");
    }
  };

  useEffect(() => {
    loginCheck();
  }, []);

  const initialValues = {
    name: "",
    description: "",
  };

  const ValidationSchema = Yup.object().shape({
    name: Yup.string().required("name is required"),
    description: Yup.string().required("description is required"),
  });

  const notify = (message) => {
    toast(message);
  };

  const backDashboard = () => {
    navigate("/admin/dashboard");
  };

  const teamList = () => {
    navigate("/admin/team");
  };

  const handleAddTeam = async (values) => {
    debugger;
    try {
      await fetch("http://localhost:3001/teams", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(values),
      })
        .then((res) => {
          notify("Saved successfully.");
          navigate("/admin/team");
        })
        .catch((err) => {
          notify("Error:", err.message);
          console.log(err.message);
        });
    } catch (error) {
      notify("Error logging in:", error);
    }
  };

  return (
    <>
      <AdminNavbar />
      <div className="container m-4">
        <h3 className="text-center">Add Player</h3>
      </div>

      <Formik
        initialValues={initialValues}
        validationSchema={ValidationSchema}
        onSubmit={handleAddTeam}
      >
        {() => (
          <div className="container">
            <Form>
              <div>
                <Field type="text" name="name" placeholder="Enter name" />
                <ErrorMessage component="div" name="name" />
              </div>

              <div>
                <Field
                  type="text"
                  name="description"
                  placeholder="Enter description"
                />
                <ErrorMessage component="div" name="description" />
              </div>

              <button type="submit">Submit</button>
            </Form>
          </div>
        )}
      </Formik>
    </>
  );
}

export default AddTeam;
