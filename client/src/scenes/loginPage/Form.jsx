import { useState, useEffect } from "react";
import {
  Box,
  Button,
  TextField,
  useMediaQuery,
  Typography,
  useTheme,
} from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogin } from "state";
import axios from "axios";
import VerificationCodeForm from "./VerficiationCodeForm";

const registerSchema = yup.object().shape({
  username: yup.string().required("required"),
  email: yup.string().email("invalid email").required("required"),
  password: yup.string().required("required"),
  confirmPassword: yup
    .string()
    .required("required")
    .oneOf([yup.ref("password"), null], "Passwords must match"),
});

const loginSchema = yup.object().shape({
  email: yup.string().email("invalid email").required("required"),
  password: yup.string().required("required"),
});

// Print validation rules for password and confirmPassword fields
console.log("Validation rules for password field:");
console.log(registerSchema.fields.password.describe());

console.log("\nValidation rules for confirmPassword field:");
console.log(registerSchema.fields.confirmPassword.describe());

const initialValuesRegister = {
  platform: "Builder",
  email: "",
  role: "Researcher",
  username: "",
  password: "",
  confirmPassword: "",
};

const initialValuesLogin = {
  email: "",
  password: "",
};

const Form = () => {
  const [pageType, setPageType] = useState("login");
  const { palette } = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const isLogin = pageType === "login";
  const isRegister = pageType === "register";
  const [showVerificationOverlay, setShowVerificationOverlay] = useState(
    false
  );

// useEffect to run on every change in text fields
useEffect(() => {
  const registerSchema = yup.object().shape({
    username: yup.string().required("required"),
    email: yup.string().email("invalid email").required("required"),
    password: yup.string().required("required"),
    confirmPassword: yup
      .string()
      .required("required")
      .oneOf([yup.ref("password"), null], "Passwords must match"),
  });

  // Print validation rules for password field:
  const passwordField = document.getElementById("password");
  if (passwordField) {
    console.log("Password value:", passwordField.value);
  }

  // Print validation rules for confirmPassword field:
  const confirmPasswordField = document.getElementById("confirmPassword");
  if (confirmPasswordField) {
    console.log("Confirm Password value:", confirmPasswordField.value);
  }
}, [
  // Dependencies added here to trigger useEffect on changes in text fields
  isRegister, // Assuming isRegister determines the registration form visibility
  pageType, // If pageType changes when switching between login and registration forms
  // Add other dependencies if needed (e.g., values of text fields)
]);


  const register = async (values, onSubmitProps) => {
    const data = { ...values };
    delete data.confirmPassword; // Remove confirmPassword from data sent to server
    data.platform = "Builder";
    data.role = "Researcher";

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const savedUserResponse = await axios.post(
        "http://localhost:3000/entry/register",
        data,
        config
      );
      const savedUser = savedUserResponse.data;

      onSubmitProps.resetForm();

      if (savedUser) {
        setPageType("login");
      }
    } catch (error) {
      console.error("Error registering user:", error);
    }
  };

  const login = async (values, onSubmitProps) => {
    // Login functionality
  };

  const handleFormSubmit = async (values, onSubmitProps) => {
    if (isLogin) await login(values, onSubmitProps);
    if (isRegister) await register(values, onSubmitProps);
  };

  return (
    <Formik
      onSubmit={handleFormSubmit}
      initialValues={
        pageType === "register" ? initialValuesRegister : initialValuesLogin
      }
      validationSchema={pageType === "register" ? registerSchema : loginSchema}
    >
      {({
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
      }) => (
        <form onSubmit={handleSubmit}>
          <Box
            display="grid"
            gap="30px"
            gridTemplateColumns={`repeat(${
              isNonMobile ? 1 : 2
            }, minmax(0, 1fr))`}
          >
            {pageType === "register" && (
              <TextField
                label="Username"
                onBlur={handleBlur}
                onChange={handleChange}
                defaultValue={values.username} // Use defaultValue for auto-fill
                name="username"
                error={Boolean(touched.username) && Boolean(errors.username)}
                helperText={touched.username && errors.username}
              />
            )}
            <TextField
              label="Email"
              onBlur={handleBlur}
              onChange={handleChange}
              defaultValue={values.email} // Use defaultValue for auto-fill
              name="email"
              error={Boolean(touched.email) && Boolean(errors.email)}
              helperText={touched.email && errors.email}
            />
            <TextField
              label="Password"
              type="password"
              onBlur={handleBlur}
              onChange={handleChange}
              defaultValue={values.password} // Use defaultValue for auto-fill
              name="password"
              error={Boolean(touched.password) && Boolean(errors.password)}
              helperText={touched.password && errors.password}
            />
            {pageType === "register" && (
              <TextField
                label="Confirm Password"
                type="password"
                onBlur={handleBlur}
                onChange={handleChange}
                defaultValue={values.confirmPassword} // Use defaultValue for auto-fill
                name="confirmPassword"
                error={
                  Boolean(touched.confirmPassword) &&
                  Boolean(errors.confirmPassword)
                }
                helperText={touched.confirmPassword && errors.confirmPassword}
              />
            )}
          </Box>

          <Box>
            <Button
              fullWidth
              type="submit"
              sx={{
                m: "2rem 0",
                p: "1rem",
                backgroundColor: palette.primary.main,
                color: palette.background.alt,
                "&:hover": { color: palette.primary.main },
              }}
            >
              {pageType === "register" ? "REGISTER" : "LOGIN"}
            </Button>
            <Typography
              onClick={() =>
                setPageType(pageType === "register" ? "login" : "register")
              }
              sx={{
                textDecoration: "underline",
                color: palette.primary.main,
                "&:hover": {
                  cursor: "pointer",
                  color: palette.primary.light,
                },
              }}
            >
              {pageType === "register"
                ? "Already have an account? Login here."
                : "Don't have an account? Sign Up here."}
            </Typography>
          </Box>
          {/* <VerificationCodeForm/> */}
        </form>
      )}
    </Formik>
  );
};

export default Form;
