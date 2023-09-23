// src/components/AddPlayerForm.js
import React, { useState } from "react";
import axios from "axios";
import { Field, Form, Formik, ErrorMessage } from "formik";
import * as Yup from "yup";

const AddPlayerForm = () => {
  const [player, setPlayer] = useState({
    firstName: "",
    lastName: "",
    email: "",
    contact: "",
    teamId: 1, // You can change this as needed
  });

  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    contact: "",
    teamId: 1,
  };

  const ValidationSchema = Yup.object().shape({
    firstName: Yup.string().required("firstName is required"),
    lastName: Yup.string().required("lastName is required"),
    email: Yup.string().required("email is required"),
    contact: Yup.string().required("contact is required"),
  });

  const handleSubmit = async (player) => {
    try {
      const response = await axios.post(
        "http://localhost:3001/players",
        player
      );
      console.log("Player added:", response.data);
      // Clear the form
      setPlayer({
        firstName: "",
        lastName: "",
        email: "",
        contact: "",
        teamId: 1,
      });
    } catch (error) {
      console.error("Error adding player:", error);
    }
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={ValidationSchema}
        onSubmit={handleSubmit}
      >
        {() => (
          <div className="container">
            <Form>
              <div>
                <Field
                  type="text"
                  name="firstName"
                  placeholder="Enter firstname"
                />
                <ErrorMessage component="div" name="firstName" />
              </div>

              <div>
                <Field
                  type="text"
                  name="lastName"
                  placeholder="Enter lastname"
                />
                <ErrorMessage component="div" name="lastName" />
              </div>

              <div>
                <Field type="email" name="email" placeholder="Enter email" />
                <ErrorMessage component="div" name="email" />
              </div>

              <div>
                <Field type="text" name="contact" placeholder="Enter contact" />
                <ErrorMessage component="div" name="contact" />
              </div>

              <button type="submit">Submit</button>
            </Form>
          </div>
        )}
      </Formik>
    </>
  );
};

export default AddPlayerForm;
