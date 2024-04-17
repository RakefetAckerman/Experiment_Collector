import { useState, useRef } from "react";
import { Formik } from "formik";
import { TextField, Button, Typography, Box } from "@mui/material";
import * as yup from "yup";

const verificationSchema = yup.object().shape({
  verificationCode: yup
    .string()
    .matches(/^\d{6}$/, "Verification code must be 6 digits")
    .required("Verification code is required"),
});

const VerificationCodeForm = ({ onSubmit }) => {
  const [verificationSent, setVerificationSent] = useState(false);
  const inputRefs = useRef([]);

  const initialValues = { verificationCode: "" };

  const handleResendVerification = async () => {
    // Implement logic to resend verification code
    try {
      // Call API to resend verification code
      setVerificationSent(true); // Update state to indicate verification sent
    } catch (error) {
      console.error("Error resending verification code:", error);
    }
  };

  const focusNextInput = (index) => {
    if (inputRefs.current[index + 1]) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleSubmit = async (values, { resetForm }) => {
    try {
      // Call function passed from parent component to handle verification
      await onSubmit(values.verificationCode);
      resetForm(); // Reset form after successful verification
    } catch (error) {
      console.error("Error verifying code:", error);
    }
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      position="fixed"
      top={0}
      left={0}
      width="100%"
      height="100%"
      bgcolor="rgba(0, 0, 0, 0.5)"
      zIndex={999}
    >
      <Box
        bgcolor="#fff"
        borderRadius={4}
        padding={3}
        boxShadow={4}
      >
        <Formik
          initialValues={initialValues}
          validationSchema={verificationSchema}
          onSubmit={handleSubmit}
        >
          {({ values, errors, touched, handleChange, handleBlur }) => (
            <form onSubmit={(e) => e.preventDefault()}>
                Enter the code you have recieved
              <div style={{ display: "flex" }}>
                {Array.from({ length: 6 }).map((_, index) => (
                  <TextField
                    key={index}
                    variant="outlined"
                    size="small"
                    margin="dense"
                    type="text"
                    name={`digit${index + 1}`}
                    value={values[`digit${index + 1}`]}
                    onChange={(e) => {
                      handleChange(e);
                      if (e.target.value.length === 1) {
                        focusNextInput(index);
                      }
                    }}
                    onBlur={handleBlur}
                    error={touched[`digit${index + 1}`] && Boolean(errors[`digit${index + 1}`])}
                    helperText={touched[`digit${index + 1}`] && errors[`digit${index + 1}`]}
                    inputProps={{
                      maxLength: 1,
                      style: { width: "2em", textAlign: "center" },
                      ref: (input) => (inputRefs.current[index] = input),
                    }}
                  />
                ))}
              </div>
              {verificationSent && (
                <Typography variant="body2" sx={{ mt: 1 }}>
                  Verification code resent
                </Typography>
              )}
              <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
                Verify
              </Button>
              <Button
                type="button"
                onClick={handleResendVerification}
                variant="text"
                sx={{ mt: 1 }}
              >
                Resend Verification Code
              </Button>
            </form>
          )}
        </Formik>
      </Box>
    </Box>
  );
};

export default VerificationCodeForm;
