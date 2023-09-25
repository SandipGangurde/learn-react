import React, { useEffect, useState } from "react";
import { Field, Form, Formik, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { Button, Container, Card, FloatingLabel } from "react-bootstrap";
import { toast } from "react-toastify";
import AdminNavbar from "../Adminnavbar";

const AddPlayer = () => {
  const navigate = useNavigate();
  const [teams, setTeams] = useState([]);

  /**
   * Define initial form field values
   */
  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    contact: "",
    teamId: "",
  };

  // Regular expressions for validation
  const charactersRegex = /^[A-Za-z]+$/;
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const phoneNumberRegex = /^\d{10}$/;

  /**
   * Define validation schema using Yup
   */
  const ValidationSchema = Yup.object().shape({
    firstName: Yup.string()
      .min(2, "First name should be at least 2 characters.")
      .max(50, "First name should not exceed 50 characters.")
      .matches(charactersRegex, "Only characters are allowed.")
      .required("First name is required."),
    lastName: Yup.string()
      .min(2, "Last name should be at least 2 characters.")
      .max(50, "Last name should not exceed 50 characters.")
      .matches(charactersRegex, "Only characters are allowed.")
      .required("Last name is required."),
    email: Yup.string()
      .matches(emailRegex, "Enter a valid email address")
      .required("Email is required"),
    contact: Yup.string()
      .matches(phoneNumberRegex, "Enter valid mobile number.")
      .required("Mobile number is Required"),
    teamId: Yup.string().required("Select team"),
  });

  /**
   * Function to fetch teams from the server
   */
  const fetchTeams = async () => {
    try {
      const response = await fetch("http://localhost:3001/teams");
      setTeams(await response.json());
    } catch (error) {
      toast.error("Error:", error.message);
    }
  };

  useEffect(() => {
    // Check if the user is logged in, if not, redirect to the login page
    const user = JSON.parse(localStorage.getItem("Login"));
    if (!user) {
      navigate("/");
    } else {
      fetchTeams();
    }
  }, [navigate]);

  /**
   * Function handle form submission
   * @param {*} values : form data
   */
  const handleAddPlayer = async (values) => {
    try {
      const response = await fetch("http://localhost:3001/players", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        toast.success("Saved successfully.");
        navigate("/admin/player");
      } else {
        toast.error("Failed to save.");
      }
    } catch (error) {
      toast.error("Error:", error.message);
    }
  };

  /**
   *  Function navigate to the player list page
   */
  const playerList = () => {
    navigate("/admin/player");
  };

  return (
    <>
      <AdminNavbar />

      <Formik
        initialValues={initialValues}
        validationSchema={ValidationSchema}
        onSubmit={handleAddPlayer}
      >
        {() => (
          <Container>
            <Form>
              <Card className="col-md-6 mx-auto mt-2">
                <Card.Body>
                  <Card.Title>
                    <h3 className="text-center mb-3">Add Player</h3>
                  </Card.Title>

                  <FloatingLabel
                    controlId="firstName"
                    label="First Name"
                    className="mb-3"
                  >
                    <Field
                      name="firstName"
                      id="floatingFirstName"
                      className="form-control"
                      placeholder="First Name"
                    />
                    <ErrorMessage
                      component="div"
                      name="firstName"
                      className="error-message"
                    />
                  </FloatingLabel>

                  <FloatingLabel
                    controlId="floatingLastName"
                    label="Last Name"
                    className="mb-3"
                  >
                    <Field
                      name="lastName"
                      id="floatingLastName"
                      className="form-control"
                      placeholder="Last Name"
                    />
                    <ErrorMessage
                      component="div"
                      name="lastName"
                      className="text-danger"
                    />
                  </FloatingLabel>

                  <FloatingLabel
                    controlId="floatingEmail"
                    label="Email"
                    className="mb-3"
                  >
                    <Field
                      name="email"
                      id="floatingEmail"
                      type="email"
                      className="form-control"
                      placeholder="Email"
                    />
                    <ErrorMessage
                      component="div"
                      name="email"
                      className="text-danger"
                    />
                  </FloatingLabel>

                  <FloatingLabel
                    controlId="floatingContact"
                    label="Mobile Number"
                    className="mb-3"
                  >
                    <Field
                      name="contact"
                      id="floatingContact"
                      className="form-control"
                      placeholder="Mobile Number"
                    />
                    <ErrorMessage
                      component="div"
                      name="contact"
                      className="error-message"
                    />
                  </FloatingLabel>

                  <FloatingLabel
                    controlId="floatingTeamId"
                    label="Team"
                    className="mb-3"
                  >
                    <Field as="select" name="teamId" className="form-control">
                      <option value="">Select Team</option>
                      {teams &&
                        teams.map((team) => (
                          <option key={team.id} value={team.id}>
                            {team.name}
                          </option>
                        ))}
                    </Field>
                    <ErrorMessage
                      component="div"
                      name="teamId"
                      className="error-message"
                    />
                  </FloatingLabel>
                </Card.Body>
                <div className="text-center m-2">
                  <Button
                    variant="btn btn-outline-secondary"
                    onClick={playerList}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="btn btn-outline-success"
                    type="submit"
                    className="ms-2"
                  >
                    Add
                  </Button>
                </div>
              </Card>
            </Form>
          </Container>
        )}
      </Formik>
    </>
  );
};

export default AddPlayer;
