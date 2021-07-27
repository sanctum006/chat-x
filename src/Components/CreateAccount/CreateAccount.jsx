import React, { useState } from "react";
import useFormValidator from "use-form-input-validator";
import uniqueRandom from "unique-random";
import { useHistory } from "react-router";
import "./CreateAccount.css";
import { auth, db } from "./../../firebase";
import { Link } from "react-router-dom";

const random = uniqueRandom(1111, 9999);

function CreateAccount() {
  const [info, setInfo] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const history = useHistory();

  const { values, errors, updateField, isAllFieldsValid } = useFormValidator({
    username: {
      value: "", // defuallt changes
      checks: "required|min:5", // checks to run on the field on change
      validate: (value) => {
        if (value.includes("kepler")) {
          return 'The word "kepler" cannot be included in your username';
        }
      },
    },
    email: {
      value: "",
      checks: "required|email",
    },
    password: {
      value: "", // defualt changes
      checks: "required|min:5",
    },
    confirmPassword: {
      value: "", // defualt changes
      checks: "required|min:5",
      validate: (value, values) => {
        if (value !== values.password) {
          return "Confirm password and password field doesn't match";
        }
      },
    },
  });

  const handleChange = (e) => {
    setInfo((data) => ({ ...data, [e.target.name]: e.target.value }));
    console.log(info);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    var uid;
    if (isAllFieldsValid()) {
      auth
        .createUserWithEmailAndPassword(values.email, values.password)
        .then((authUser) => {
          db.collection("users").add({
            username: values.username,
            avatarUrl:
              "https://cdn.discordapp.com/attachments/817706647274651659/865591208742223892/logo.png",
            bio: "Hey There!!",
            usernameid: random(),
            uid: authUser.user.uid,
          });
          setTimeout(() => {
            history.push("/login");
          }, 1000);
        })
        .catch((error) => alert(error));
    }
  };
  return (
    <div className="createAccountScreen">
      <div className="createAccount">
        <img
          src="https://cdn.discordapp.com/attachments/817706647274651659/865591208742223892/logo.png"
          alt=""
          className="createAccount__logo"
        />
        <div className="form">
          <input
            name="username"
            placeholder="Enter Username"
            onChange={updateField}
          />
          <small>{errors.username}</small>

          <input
            name="email"
            placeholder="Enter Email"
            onChange={updateField}
          />
          <small>{errors.email}</small>

          <input
            type="password"
            name="password"
            placeholder="Enter Password"
            onChange={updateField}
          />
          <small>{errors.password}</small>

          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            onChange={updateField}
          />
          <small>{errors.confirmPassword}</small>

          <button onClick={handleSubmit}>Submit</button>
        </div>
        <p>
          Already have an account?{" "}
          <Link
            to="/login"
            style={{ textDecoration: "none", color: "#7289da" }}
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default CreateAccount;
