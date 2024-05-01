import React from "react";
import UserTypes from "../utils/UserTypes";
import * as yup from "yup";
import { FormikValues } from "formik";
import createValidationSchema from "../utils/FormValidation";
import SignupPage from "../scenes/signupPage/SignupPage";

const SignupPrep: React.FC = () => {
  let fields: string[] = [];
  let validation: yup.ObjectShape = {};
  let onSubmit: (values: FormikValues) => void | Promise<void> = () => {
    throw new Error("Function not implemented.");
  };

  fields = ["Email", "Username", "Password", "Confirm Password"]; // Example fields for Student user

  onSubmit = (values) => {
    console.log("onSubmit has been activated with these values: ", values);
    console.log("I've signed up a Researcher");
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
