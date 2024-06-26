import {
  Box,
  Button,
  Typography,
  useMediaQuery,
  useTheme,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import WrapperForm from "../components/common/WrapperForm";
import * as Yup from "yup";
// import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { FormikValues } from "formik";
import ExperimentTypes from "../utils/types/experimentTypes/experimentsTypes";

const ExperimentFormPage = () => {
  const [experimentDirs, setExperimentDirs] = useState<string[]>([]);
  const [experiment, setExperiment] = useState("");
  const theme = useTheme();
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  // const navigate = useNavigate();

  // Mock fetching the directories from /src/components/experiments
  useEffect(() => {
    // Replace this with actual API call or file system read logic
    const fetchExperiments = async () => {
      const experiments = [];
      // Iterate over enum values
      for (const exp in ExperimentTypes) {
        experiments.push(exp);
      }
      setExperimentDirs(experiments);
    };

    fetchExperiments();
  }, []);

  const initialValues = {
    experimentName: "",
  };

  const validationSchema = Yup.object().shape({
    experimentName: Yup.string().required("Select an experiment"),
  });

  const handleSubmit = async (values: FormikValues) => {
    // Handle form submission
    console.log(values);
    console.log(experiment);
    // You can navigate or handle other logic here
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
    >
      <Box
        width={isNonMobileScreens ? "100%" : "93%"}
        p="2rem"
        borderRadius="1.5rem"
        bgcolor="#f0f0f0"
        boxShadow="0px 4px 10px rgba(0, 0, 0, 0.1)"
        textAlign="center"
      >
        <Box>
          <Typography fontWeight="bold" fontSize="32px" color="primary">
            Experiment Editor
          </Typography>
          <Typography fontWeight="500" variant="h5" sx={{ mb: "1.5rem" }}>
            Create and Alter an Experiment
          </Typography>
          <WrapperForm
            initialValues={initialValues}
            validation={validationSchema}
            targetFunction={handleSubmit}
          >
            {(formikProps) => {
              const { values, errors, touched, handleBlur, handleChange } =
                formikProps;
              return (
                <>
                  <FormControl fullWidth sx={{ mb: "1rem", width: "100%" }}>
                    <InputLabel id="experiment-select-label">
                      Choose an Experiment
                    </InputLabel>
                    <Select
                      labelId="experiment-select-label"
                      id="experiment-select"
                      value={values.experimentName}
                      label="Choose an Experiment"
                      onChange={(e) => {
                        handleChange(e);
                        setExperiment(e.target.value);
                      }}
                      onBlur={handleBlur}
                      name="experimentName"
                      error={
                        touched.experimentName && Boolean(errors.experimentName)
                      }
                      sx={{ width: "100%" }}
                    >
                      {experimentDirs.map((dir, index) => (
                        <MenuItem key={index} value={dir}>
                          {dir}
                        </MenuItem>
                      ))}
                    </Select>
                    {touched.experimentName && errors.experimentName && (
                      <Typography color="error">
                        {typeof errors.experimentName === "string"
                          ? errors.experimentName
                          : ""}
                      </Typography>
                    )}
                  </FormControl>
                  <Button
                    fullWidth
                    type="submit"
                    sx={{
                      m: "2rem 0",
                      p: "1rem",
                      bgcolor: theme.palette.primary.main,
                      color: theme.palette.background.paper,
                      "&:hover": { color: theme.palette.primary.main },
                    }}
                  >
                    Select
                  </Button>
                </>
              );
            }}
          </WrapperForm>
        </Box>
      </Box>
    </Box>
  );
};

export default ExperimentFormPage;
