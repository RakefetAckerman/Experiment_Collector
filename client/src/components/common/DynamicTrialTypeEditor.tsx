/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, Suspense, lazy, useCallback } from "react";
import { debounce } from "lodash";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import TextField from "@mui/material/TextField"; // Import TextField component
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

  // State to store form inputs for CustomSlider
  const [sliderMin, setSliderMin] = useState<number>(0);
  const [sliderMax, setSliderMax] = useState<number>(100);
  const [sliderDefaultPosition, setSliderDefaultPosition] =
    useState<number>(50);
  const [sliderDisabled, setSliderDisabled] = useState<boolean>(false);
  const [sliderMinLabel, setSliderMinLabel] = useState<string>("Min");
  const [sliderMaxLabel, setSliderMaxLabel] = useState<string>("Max");

  // State to store form inputs for CustomRate
  const [rateMax, setRateMax] = useState<number>(5);
  const [rateMinLabel, setRateMinLabel] = useState<string>("");
  const [rateMaxLabel, setRateMaxLabel] = useState<string>("");

  // State to store form inputs for CustomParagraph
  const [paragraphHeadline, setParagraphHeadline] = useState<string>("");
  const [paragraphHeadlineFontSize, setParagraphHeadlineFontSize] = useState<
    string | number
  >("1.5rem");
  const [paragraphText, setParagraphText] = useState<string>("");
  const [paragraphTextFontSize, setParagraphTextFontSize] = useState<
    string | number
  >("1rem");
  const [paragraphDirection, setParagraphDirection] = useState<"ltr" | "rtl">(
    "ltr"
  );

  const debouncedSetSliderMin = useCallback(debounce(setSliderMin, 300), []);
  const debouncedSetSliderMax = useCallback(debounce(setSliderMax, 300), []);
  const debouncedSetSliderDefaultPosition = useCallback(
    debounce(setSliderDefaultPosition, 300),
    []
  );
  const debouncedSetSliderMinLabel = useCallback(
    debounce(setSliderMinLabel, 300),
    []
  );
  const debouncedSetSliderMaxLabel = useCallback(
    debounce(setSliderMaxLabel, 300),
    []
  );
  const debouncedSetRateMax = useCallback(debounce(setRateMax, 300), []);
  const debouncedSetRateMinLabel = useCallback(
    debounce(setRateMinLabel, 300),
    []
  );
  const debouncedSetRateMaxLabel = useCallback(
    debounce(setRateMaxLabel, 300),
    []
  );
  const debouncedSetParagraphHeadline = useCallback(
    debounce(setParagraphHeadline, 300),
    []
  );
  const debouncedSetParagraphHeadlineFontSize = useCallback(
    debounce(setParagraphHeadlineFontSize, 300),
    []
  );
  const debouncedSetParagraphText = useCallback(
    debounce(setParagraphText, 300),
    []
  );
  const debouncedSetParagraphTextFontSize = useCallback(
    debounce(setParagraphTextFontSize, 300),
    []
  );

  const toggleDropdown = () => {
    setShowDropdown(true);
  };

  const addComponent = async (component: string) => {
    let path = "";
    let props: any = {}; // Initialize props variable

    switch (component) {
      case "CustomParagraph":
        path = "./CustomParagraph"; // Update path accordingly
        props = {
          headline: paragraphHeadline,
          headlineFontSize: paragraphHeadlineFontSize,
          text: paragraphText,
          textFontSize: paragraphTextFontSize,
          direction: paragraphDirection,
        };
        break;
      case "CustomRate":
        path = "./CustomRate"; // Update path accordingly
        props = {
          max: rateMax,
          minLabel: rateMinLabel,
          maxLabel: rateMaxLabel,
        };
        break;
      case "CustomSlider":
        path = "./CustomSlider"; // Update path accordingly
        props = {
          min: sliderMin,
          max: sliderMax,
          defaultPosition: sliderDefaultPosition,
          disabled: sliderDisabled,
          minLabel: sliderMinLabel,
          maxLabel: sliderMaxLabel,
        };
        break;
      default:
        return;
    }

    const newComponent: ComponentInfo = { path, props }; // Pass specific props here
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

  const updateComponentProps = (index: number, updatedProps: any) => {
    const updatedComponents = [...components];
    updatedComponents[index].props = {
      ...updatedComponents[index].props,
      ...updatedProps,
    };
    setComponents(updatedComponents);
    setAlert({
      message: "Component props updated successfully!",
      severity: "success",
    });
  };

  const renderSelectedComponent = () => {
    switch (selectedComponent) {
      case "CustomSlider":
        return (
          <Box mb={2} width="100%">
            <TextField
              label="Min Value"
              type="number"
              fullWidth
              defaultValue={sliderMin}
              onChange={(e) => debouncedSetSliderMin(Number(e.target.value))}
              sx={{ mb: 2 }}
            />
            <TextField
              label="Max Value"
              type="number"
              fullWidth
              defaultValue={sliderMax}
              onChange={(e) => debouncedSetSliderMax(Number(e.target.value))}
              sx={{ mb: 2 }}
            />
            <TextField
              label="Default Position"
              type="number"
              fullWidth
              defaultValue={sliderDefaultPosition}
              onChange={(e) =>
                debouncedSetSliderDefaultPosition(Number(e.target.value))
              }
              sx={{ mb: 2 }}
            />
            <TextField
              label="Min Label"
              type="text"
              fullWidth
              defaultValue={sliderMinLabel}
              onChange={(e) => debouncedSetSliderMinLabel(e.target.value)}
              sx={{ mb: 2 }}
            />
            <TextField
              label="Max Label"
              type="text"
              fullWidth
              defaultValue={sliderMaxLabel}
              onChange={(e) => debouncedSetSliderMaxLabel(e.target.value)}
              sx={{ mb: 2 }}
            />
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Disabled</InputLabel>
              <Select
                value={sliderDisabled ? "true" : "false"}
                onChange={(e) => setSliderDisabled(e.target.value === "true")}
                variant="outlined"
              >
                <MenuItem value="true">True</MenuItem>
                <MenuItem value="false">False</MenuItem>
              </Select>
            </FormControl>
          </Box>
        );
      case "CustomRate":
        return (
          <Box mb={2} width="100%">
            <TextField
              label="Max Rating"
              type="number"
              fullWidth
              defaultValue={rateMax}
              onChange={(e) => debouncedSetRateMax(Number(e.target.value))}
              sx={{ mb: 2 }}
            />
            <TextField
              label="Min Label"
              type="text"
              fullWidth
              defaultValue={rateMinLabel}
              onChange={(e) => debouncedSetRateMinLabel(e.target.value)}
              sx={{ mb: 2 }}
            />
            <TextField
              label="Max Label"
              type="text"
              fullWidth
              defaultValue={rateMaxLabel}
              onChange={(e) => debouncedSetRateMaxLabel(e.target.value)}
              sx={{ mb: 2 }}
            />
          </Box>
        );
      case "CustomParagraph":
        return (
          <Box mb={2} width="100%">
            <TextField
              label="Headline"
              type="text"
              fullWidth
              defaultValue={paragraphHeadline}
              onChange={(e) => debouncedSetParagraphHeadline(e.target.value)}
              sx={{ mb: 2 }}
            />
            <TextField
              label="Headline Font Size"
              type="text"
              fullWidth
              defaultValue={paragraphHeadlineFontSize}
              onChange={(e) =>
                debouncedSetParagraphHeadlineFontSize(e.target.value)
              }
              sx={{ mb: 2 }}
            />
            <TextField
              label="Paragraph Text"
              type="text"
              fullWidth
              defaultValue={paragraphText}
              onChange={(e) => debouncedSetParagraphText(e.target.value)}
              sx={{ mb: 2 }}
            />
            <TextField
              label="Text Font Size"
              type="text"
              fullWidth
              defaultValue={paragraphTextFontSize}
              onChange={(e) =>
                debouncedSetParagraphTextFontSize(e.target.value)
              }
              sx={{ mb: 2 }}
            />
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Direction</InputLabel>
              <Select
                value={paragraphDirection}
                onChange={(e) =>
                  setParagraphDirection(e.target.value as "ltr" | "rtl")
                }
                variant="outlined"
              >
                <MenuItem value="ltr">Left to Right</MenuItem>
                <MenuItem value="rtl">Right to Left</MenuItem>
              </Select>
            </FormControl>
          </Box>
        );
      default:
        return null;
    }
  };

  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
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
                      <LazyComponent
                        {...component.props}
                        updateProps={(updatedProps: any) =>
                          updateComponentProps(index, updatedProps)
                        }
                      />
                    </Box>
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => removeComponent(index)}
                      sx={{ ml: 5 }}
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
          {renderSelectedComponent()}
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
