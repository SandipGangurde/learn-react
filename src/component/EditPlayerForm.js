// src/components/EditPlayerForm.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Field, Form, Formik, ErrorMessage } from "formik";
import * as Yup from "yup";

const EditPlayerForm = ({ playerId, onCancel, onPlayerUpdated }) => {
  const [player, setPlayer] = useState({
    firstName: "",
    lastName: "",
    email: "",
    contact: "",
    teamId: 1,
  });

  useEffect(() => {
    const fetchPlayer = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/players/${playerId}`
        );
        setPlayer(response.data);
      } catch (error) {
        console.error("Error fetching player:", error);
      }
    };

    fetchPlayer();
  }, [playerId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPlayer({
      ...player,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(
        `http://localhost:5000/players/${playerId}`,
        player
      );
      console.log("Player updated:", response.data);
      onPlayerUpdated(response.data); // Notify the parent component
    } catch (error) {
      console.error("Error updating player:", error);
    }
  };

  const ValidationSchema = Yup.object().shape({
    firstName: Yup.string().required("firstName is required"),
    lastName: Yup.string().required("lastName is required"),
    email: Yup.string().required("email is required"),
    contact: Yup.string().required("contact is required"),
  });

  return (
    <>
      <Formik
        initialValues={player}
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
export default EditPlayerForm;
