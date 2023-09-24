import React, { useEffect, useState } from "react";
import { Field, Form, Formik, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";

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
    teamId: 0,
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
      <div className="container m-4">
        <h3 className="text-center">Add Player</h3>
      </div>

      <Formik
        initialValues={initialValues}
        validationSchema={ValidationSchema}
        onSubmit={handleAddPlayer}
      >
        {() => (
          <div className="container">
            <Form>
              <div className="form-group">
                <Field
                  name="firstName"
                  className="form-control"
                  placeholder="First Name"
                />
                <ErrorMessage name="firstName" />
              </div>
              <div className="form-group">
                <Field
                  name="lastName"
                  type="lastName"
                  className="form-control"
                  placeholder="Last Name"
                />
                <ErrorMessage name="lastName" />
              </div>
              <div className="form-group">
                <Field
                  name="email"
                  type="email"
                  placeholder="Email"
                  className="form-control"
                />
                <ErrorMessage name="email" />
              </div>
              <div className="form-group">
                <Field
                  name="contact"
                  type="contact"
                  placeholder="contact"
                  className="form-control"
                />
                <ErrorMessage name="contact" />
                <div className="form-group">
                  <Field as="select" name="teamId" className="form-control">
                    <option value="">Select Team</option>
                    {teams &&
                      teams.map((team) => (
                        <option key={team.id} value={team.id}>
                          {team.name}
                        </option>
                      ))}
                  </Field>
                  <ErrorMessage name="teamId" />
                </div>
              </div>
              <button type="submit">Submit</button>
            </Form>
          </div>
        )}
      </Formik>
    </>
  );
}

export default AddPlayer;
