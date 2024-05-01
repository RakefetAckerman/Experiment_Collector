import React from "react";
import UserTypes from "../utils/UserTypes";
import * as yup from "yup";
import { FormikValues } from "formik";
import createValidationSchema from "../utils/FormValidation";
import SignupPage from "../scenes/signupPage/SignupPage";
import axios from "axios";
import UserRoles from "../utils/UserRoles";

const SignupPrep: React.FC = () => {
  const role = UserRoles.Participant;
  const platform = "Builder";
  let fields: string[] = [];
  let validation: yup.ObjectShape = {};
  let onSubmit: (values: FormikValues) => void | Promise<void> = () => {
    throw new Error("Function not implemented.");
  };

  const backendUrl = import.meta.env.VITE_REACT_APP_BACKEND_DEV_URL;

  fields = ["Email", "Username", "Password", "Confirm Password"]; // Example fields for Student user

  onSubmit = async (values) => {
    // this allows us to send form info with image
    const formData = new FormData();
    console.log(values);
    for (const value in values) {
      if (value.toLowerCase().includes("password")) continue;
      console.log(values[value]);
      formData.append(value, values[value]);
    }
    formData.append("role", role);
    formData.append("platform", platform);
    formData.append(
      "userDetails",
      JSON.stringify({ password: values.Password })
    );

    console.log(formData.entries.length);

    try {
      const savedUserResponse = await axios.post(
        `${backendUrl}/entry/register`,
        formData
      );

      const savedUser = await savedUserResponse.data;

      if (savedUser) {
        console.log(
          `The user ${savedUser.Email} has been registered successfully!`
        );
      }
      // Additional logic
    } catch (error) {
      console.error("Error:", error); // Handle errors
    }
  }; // Define onSubmit function for Student use

  // Defining a validation schema based on the list of fields
  validation = createValidationSchema(fields);

  return (
    <>
      {/* This module will be the responsible for redirecting each user to its specific tailored login page that will be reused as well */}
      <SignupPage
        fields={fields}
        validation={yup.object().shape(validation)}
        onSubmit={onSubmit}
        typeOfUser={UserTypes.Prolific}
      />
    </>
  );
};

export default SignupPrep;
