/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, Suspense, lazy } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import SettingsDrawer from "./SettingsDrawer";
import CustomAlert from "./CustomAlert"; // Import CustomAlert component
import useAlert from "../../hooks/useAlert"; // Import useAlert hook

interface ComponentInfo {
  path: string;
  props?: any;
}

const DynamicTrialTypeEditor: React.FC = () => {
  const [components, setComponents] = useState<ComponentInfo[]>([]);
  const [selectedComponent, setSelectedComponent] = useState<string>("");
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const { setAlert } = useAlert(); // Access alert state and setAlert function

  const toggleDropdown = () => {
    setShowDropdown(true);
  };

  const addComponent = async (component: string) => {
    let path = "";
    switch (component) {
      case "CustomParagraph":
        path = "./CustomParagraph"; // Update path accordingly
        break;
      case "CustomRate":
        path = "./CustomRate"; // Update path accordingly
        break;
      case "CustomSlider":
        path = "./CustomSlider"; // Update path accordingly
        break;
      default:
        return;
    }

    /* @vite-ignore */
    const { default: Component } = await import(/* @vite-ignore */ `${path}`);
    const newComponent: ComponentInfo = { path, props: {} }; // You can pass props here if needed
    const newComponents = [...components, newComponent]; // Add new component at the end
    setComponents(newComponents);
    setSelectedComponent(""); // Clear selected component
    setShowDropdown(false); // Hide dropdown after adding component

    // Show success alert
    setAlert({
      message: `Component ${component} added successfully!`,
      severity: "success",
    });
  };

  const removeComponent = (index: number) => {
    const updatedComponents = components.filter((_, i) => i !== index);
    setComponents(updatedComponents);

    // Show alert for component removal
    setAlert({
      message: `Component removed successfully!`,
      severity: "info",
    });
  };

  const saveComponents = () => {
    localStorage.setItem("savedComponents", JSON.stringify(components));
    setAlert({
      message: "Components saved successfully!",
      severity: "success",
    });
  };

  const loadComponents = () => {
    const savedComponents = localStorage.getItem("savedComponents");
    if (savedComponents) {
      setComponents(JSON.parse(savedComponents));
      setAlert({
        message: "Components loaded successfully!",
        severity: "success",
      });
    } else {
      setAlert({
        message: "No saved components found.",
        severity: "info",
      });
    }
  };

  const finishEditing = () => {
    // Handle finishing the editor, e.g., navigate away or close editor
    setAlert({
      message: "Finished editing!",
      severity: "info",
    });
  };

  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      <Box
        sx={{
          width: "100px",
          backgroundColor: "#f0f0f0",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          pt: 2,
          pb: 2,
          borderRight: "1px solid #ddd",
        }}
      >
        <SettingsDrawer />
      </Box>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        width={"1000px"}
        minHeight="100vh" // Set minimum height to cover the entire viewport
      >
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          flex="1"
          maxWidth="800px" // Adjust max width as per your requirement
          width="100%" // Ensure it takes full width of the container
          p="1rem"
          borderRadius="1.5rem"
          bgcolor="#f0f0f0"
          boxShadow="0px 4px 10px rgba(0, 0, 0, 0.1)"
          textAlign="center"
          ml="300px"
          mb="100px"
        >
          <Typography variant="h4" color="primary" mb="1.5rem">
            Dynamic Trial Type Editor
          </Typography>
          <CustomAlert /> {/* Display CustomAlert for notifications */}
          <Box mb={2} width="100%">
            {components.map((component, index) => {
              const LazyComponent = lazy(
                () => import(/* @vite-ignore */ `${component.path}`)
              );
              return (
                <Suspense key={index} fallback={<div>Loading...</div>}>
                  <Box my={2} display="flex" alignItems="center">
                    <Box flex="1" textAlign="left">
                      <LazyComponent {...component.props} />
                    </Box>
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => removeComponent(index)}
                      sx={{ ml: 1 }}
                    >
                      Remove
                    </Button>
                  </Box>
                </Suspense>
              );
            })}
          </Box>
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Select Component</InputLabel>
            <Select
              value={selectedComponent}
              onChange={(e) => setSelectedComponent(e.target.value as string)}
              onClick={toggleDropdown}
              variant="outlined"
            >
              <MenuItem value="CustomParagraph">CustomParagraph</MenuItem>
              <MenuItem value="CustomRate">CustomRate</MenuItem>
              <MenuItem value="CustomSlider">CustomSlider</MenuItem>
            </Select>
          </FormControl>
          {showDropdown && (
            <Button
              variant="contained"
              onClick={() => addComponent(selectedComponent)}
              sx={{ mt: 1 }}
            >
              Add Component
            </Button>
          )}
          <Box mt={2} display="flex" justifyContent="center">
            {showDropdown && (
              <Button
                variant="contained"
                onClick={() => {
                  setSelectedComponent("");
                  setShowDropdown(false);
                }}
                sx={{ mr: 1 }}
              >
                Clear Selection
              </Button>
            )}
            <Button variant="contained" onClick={saveComponents} sx={{ mr: 1 }}>
              Save
            </Button>
            <Button variant="contained" onClick={loadComponents} sx={{ mr: 1 }}>
              Load
            </Button>
            <Button
              variant="contained"
              onClick={() => {
                setAlert({
                  message: "This need to be implemented!",
                  severity: "error",
                });
              }}
              sx={{ mr: 1 }}
            >
              Next Question
            </Button>
            <Button variant="contained" onClick={finishEditing}>
              Finish Editing
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default DynamicTrialTypeEditor;
