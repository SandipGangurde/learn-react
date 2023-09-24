import React, { useEffect, useState } from "react";
import { Field, Form, Formik, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Container,
  Card,
  Row,
  Col,
  FloatingLabel,
} from "react-bootstrap";

import { toast } from "react-toastify";
import AdminNavbar from "../Adminnavbar";

function AddPlayer() {
  const navigate = useNavigate();
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("Login"));
    if (!user) {
      navigate("/");
    }
  }, []);

  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    contact: "",
    teamId: "",
  };

  const ValidationSchema = Yup.object().shape({
    firstName: Yup.string()
      .min(2, "Too Short!")
      .max(70, "Too Long!")
      .required("First name is required"),
    lastName: Yup.string().required("Last name is Required"),
    email: Yup.string().email("Enter valid email").required("Eail is Required"),
    contact: Yup.string()
      .min(10, "10 digits required")
      .max(12, "Too Big")
      .required("Contact number is Required"),
    teamId: Yup.string().required("Select team"),
  });

  const notify = (message) => {
    toast(message);
  };

  const fetchTeams = async () => {
    try {
      debugger;
      const response = await fetch("http://localhost:3001/teams");
      setTeams(await response.json());
      console.log(teams);
    } catch (error) {
      console.error("Error fetching teams:", error);
    }
  };

  const loginCheck = () => {
    const user = JSON.parse(localStorage.getItem("Login"));
    if (!user) {
      navigate("/");
    }
  };

  useEffect(() => {
    loginCheck();
    fetchTeams();
  }, []);

  const handleAddPlayer = async (values) => {
    debugger;
    try {
      await fetch("http://localhost:3001/players", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(values),
      })
        .then((res) => {
          notify("Saved successfully.");
          navigate("/admin/player");
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

      <Formik
        initialValues={initialValues}
        validationSchema={ValidationSchema}
        onSubmit={handleAddPlayer}
      >
        {() => (
          <Container>
            <Form>
              <Card className="col-md-6 mx-auto mt-5">
                <Card.Body>
                  <Card.Title>
                    <h3 className="text-center mb-3">Add Player</h3>
                  </Card.Title>

                  <Row className="mb-1">
                    <Col className="col-12">
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
                    </Col>
                  </Row>

                  <Row className="form-floating mb-1">
                    <Col className="col-12">
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
                    </Col>
                  </Row>

                  <Row className="form-floating mb-1">
                    <Col className="col-12">
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
                    </Col>
                  </Row>

                  <Row className="form-floating mb-1">
                    <Col className="col-12">
                      <FloatingLabel
                        controlId="floatingContact"
                        label="Contact"
                        className="mb-3"
                      >
                        <Field
                          name="contact"
                          id="floatingContact"
                          className="form-control"
                          placeholder="Contact"
                        />
                        <ErrorMessage
                          component="div"
                          name="contact"
                          className="error-message"
                        />
                      </FloatingLabel>
                    </Col>
                  </Row>

                  <Row className="form-floating mb-1">
                    <Col className="col-12">
                      <FloatingLabel
                        controlId="floatingTeamId"
                        label="Team"
                        className="mb-3"
                      >
                        <Field
                          as="select"
                          name="teamId"
                          className="form-control"
                        >
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
                    </Col>
                  </Row>
                </Card.Body>
                <Button
                  variant="btn btn-primary"
                  className="col-md-5 mx-auto mb-4"
                  type="submit"
                >
                  Submit
                </Button>
              </Card>
            </Form>
          </Container>
        )}
      </Formik>
    </>
  );
}

export default AddPlayer;
