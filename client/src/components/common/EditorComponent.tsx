/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, Suspense, lazy } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";

interface ComponentInfo {
  path: string;
  props?: any;
}

const DynamicComponentEditor: React.FC = () => {
  const [components, setComponents] = useState<ComponentInfo[]>([]);
  const [selectedComponent, setSelectedComponent] = useState<string>("");
  const [showDropdown, setShowDropdown] = useState<boolean>(false);

  const toggleDropdown = () => {
    setShowDropdown((prev) => !prev);
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

    const { default: Component } = await import(`${path}`);
    const newComponent: ComponentInfo = { path, props: {} }; // You can pass props here if needed
    const newComponents = [...components, newComponent]; // Add new component at the end
    setComponents(newComponents);
    setSelectedComponent(""); // Clear selected component
    setShowDropdown(false); // Hide dropdown after adding component
  };

  const removeComponent = (index: number) => {
    const updatedComponents = components.filter((_, i) => i !== index);
    setComponents(updatedComponents);
  };

  const saveComponents = () => {
    localStorage.setItem("savedComponents", JSON.stringify(components));
    alert("Components saved successfully!");
  };

  const loadComponents = () => {
    const savedComponents = localStorage.getItem("savedComponents");
    if (savedComponents) {
      setComponents(JSON.parse(savedComponents));
      alert("Components loaded successfully!");
    } else {
      alert("No saved components found.");
    }
  };

  const finishEditing = () => {
    // Handle finishing the editor, e.g., navigate away or close editor
    alert("Finish editing");
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
    >
      <Box
        width="50%"
        p="2rem"
        borderRadius="1.5rem"
        bgcolor="#f0f0f0"
        boxShadow="0px 4px 10px rgba(0, 0, 0, 0.1)"
        textAlign="center"
      >
        <Typography variant="h4" color="primary" mb="1.5rem">
          Dynamic Trial Type Editor
        </Typography>
        <Box mt={2} mb={2}>
          {components.map((component, index) => {
            const LazyComponent = lazy(() => import(`${component.path}`));
            return (
              <Suspense key={index} fallback={<div>Loading...</div>}>
                <Box my={2} textAlign="left">
                  <LazyComponent {...component.props} />
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => removeComponent(index)}
                    sx={{ mt: 1 }}
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
          >
            Add Component
          </Button>
        )}
        <Button variant="contained" onClick={saveComponents} sx={{ ml: 2 }}>
          Save
        </Button>
        <Button variant="contained" onClick={loadComponents} sx={{ ml: 2 }}>
          Load
        </Button>
        <Button variant="contained" onClick={finishEditing} sx={{ ml: 2 }}>
          Finish
        </Button>
      </Box>
    </Box>
  );
};

export default DynamicComponentEditor;
