import React, { useEffect } from "react";
import { Field, Form, Formik, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { Container, Card, FloatingLabel } from "react-bootstrap";
import { toast } from "react-toastify";
import AdminNavbar from "../Adminnavbar";

const AddTeam = () => {
  const navigate = useNavigate();

  /**
   * checks user is login or not
   */
  const loginCheck = () => {
    const user = JSON.parse(localStorage.getItem("Login"));
    if (!user) {
      navigate("/");
    }
  };

  /**
   * first checks user is login or not
   */
  useEffect(() => {
    loginCheck();
  }, []);

  /**
   * initially sets value empty for form
   */
  const initialValues = {
    name: "",
    description: "",
  };

  /**
   * validation schema for Add Team form
   */
  const ValidationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    description: Yup.string().required("Description is required"),
  });

  /**
   * navigates to team list
   */
  const teamList = () => {
    navigate("/admin/team");
  };

  /**
   * It adds team into json server
   * @param {*} values : add team form submitted values
   */
  const handleAddTeam = async (values) => {
    try {
      await fetch("http://localhost:3001/teams", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(values),
      })
        .then(() => {
          toast.success("Saved successfully.");
          navigate("/admin/team");
        })
        .catch((error) => {
          toast.error("Error:", error.message);
        });
    } catch (error) {
      toast.error("Error:", error.message);
    }
  };

  return (
    <>
      <AdminNavbar />

      {/* formik for form processing and building */}
      <Formik
        initialValues={initialValues}
        validationSchema={ValidationSchema}
        onSubmit={handleAddTeam}
      >
        {() => (
          <Container>
            <Form>
              <Card className="col-md-6 mx-auto mt-5">
                <Card.Body>
                  <Card.Title>
                    <h3 className="text-center mb-3">Add Team</h3>
                  </Card.Title>
                  <FloatingLabel controlId="name" label="Name" className="mb-3">
                    <Field
                      name="name"
                      id="name"
                      className="form-control"
                      placeholder="Name"
                    />
                    <ErrorMessage
                      component="div"
                      name="name"
                      className="error-message"
                    />
                  </FloatingLabel>
                  <FloatingLabel
                    controlId="floatingDescription"
                    label="Description"
                    className="mb-3"
                  >
                    <Field
                      name="description"
                      id="floatingDescription"
                      className="form-control"
                      placeholder="Description"
                    />
                    <ErrorMessage
                      component="div"
                      name="description"
                      className="text-danger"
                    />
                  </FloatingLabel>
                </Card.Body>
                <div className="text-center m-2">
                  <a className="btn btn-outline-secondary" onClick={teamList}>
                    Cancel
                  </a>
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

export default AddTeam;
