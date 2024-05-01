import React from "react";
import { useParams } from "react-router-dom";
import LoginPage from "../scenes/loginPage/LoginPage";
import UserTypes from "../utils/UserTypes";
import * as yup from "yup";
import { FormikValues } from "formik";
import createValidationSchema from "../utils/FormValidation";

const LoginClassifier: React.FC = () => {
  const { userType } = useParams();

  let fields: string[] = [];
  let validation: yup.ObjectShape = {};
  let onSubmit: (values: FormikValues) => void | Promise<void> = () => {
    throw new Error("Function not implemented.");
  };
  let enumValUser: UserTypes = UserTypes.Researcher;

  // Match userType using switch statement
  switch (userType) {
    case UserTypes.Prolific:
      fields = ["Prolific Email"]; // fields for Prolific user
      onSubmit = () => {
        console.log("I've registerd a Prolific user");
      }; // Define onSubmit function for Prolific user
      break;
    case UserTypes.Student:
      fields = ["University", "Faculty", "Email", "Password"]; // fields for Student user

      onSubmit = (values) => {
        console.log("onSubmit has been activated with these values: ", values);
        console.log("I've registerd a student");
      }; // Define onSubmit function for Student user
      enumValUser = UserTypes.Student;
      break;
    case UserTypes.Researcher:
      fields = ["Email", "Password"]; // Example fields for Student user
      onSubmit = (values) => {
        console.log("onSubmit has been activated with these values: ", values);
        console.log("I've registerd a Researcher");
      }; // Define onSubmit function for Student use
      break;
    default:
      // Handle default case if userType doesn't match any enum value, Need to implement 404 page
      break;
  }
  // Defining a validation schema based on the list of fields
  validation = createValidationSchema(fields);

  return (
    <>
      {/* This module will be the responsible for redirecting each user to its specific tailored login page that will be reused as well */}
      <LoginPage
        typeOfUser={enumValUser}
        fields={fields}
        validation={yup.object().shape(validation)}
        onSubmit={onSubmit}
      />
    </>
  );
};

export default LoginClassifier;
