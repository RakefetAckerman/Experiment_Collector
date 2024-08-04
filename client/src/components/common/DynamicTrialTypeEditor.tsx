/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, Suspense, lazy, useRef, useEffect } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import CustomAlert from "./CustomAlert"; // Import CustomAlert component
import useAlert from "../../hooks/useAlert"; // Import useAlert hook
import { ComponentSettings } from "../../utils/types/trialTypeobjectDetails";
import CustomRateComposer, {
  InnerCustomRateComposerHooks,
  InnerCustomRateComposerProps,
} from "./CustomRateComposer";
import CustomSliderComposer, {
  InnerCustomSliderComposerHooks,
  InnerCustomSliderComposerProps,
} from "./CustomSliderComposer";
import CustomParagraphComposer, {
  InnerCustomParagraphComposerHooks,
  InnerCustomParagraphComposerProps,
} from "./CustomParagraphComposer";

const DynamicTrialTypeEditor: React.FC = () => {
  const [components, setComponents] = useState<ComponentSettings[]>([]);
  useEffect(() => {
    console.log("Components updated: ", components);
  }, [components]);

  const [selectedComponent, setSelectedComponent] = useState<string>("");
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const { setAlert } = useAlert(); // Access alert state and setAlert function
  const [lockBeforeUseArr, setLockBeforeUserArr] = useState<boolean[]>([]);

  //States and functions for all types of componenets
  const [activeIndex, setActiveIndex] = useState(0);
  const [isLockbeforeUse, setIsLockBeforeUse] = useState(false);
  const [isLockAfterUse, setIsLockAfterUse] = useState(false);

  const activateNext = () => {
    while (activeIndex < components.length) {
      // if (lockBeforeUseArr[activeIndex]) {
      // }
    }
    setActiveIndex((prevIndex) =>
      Math.min(prevIndex + 1, components.length - 1)
    );
  };

  //// Props and hooks declaration of CustomSlider ////////////
  const [sliderMin, setSliderMin] = useState<number>(0);
  const [sliderMax, setSliderMax] = useState<number>(100);
  const [sliderDefaultPosition, setSliderDefaultPosition] =
    useState<number>(50);
  const [sliderDisabled, setSliderDisabled] = useState<boolean>(false);
  const [sliderMinLabel, setSliderMinLabel] = useState<string>("Min");
  const [sliderMaxLabel, setSliderMaxLabel] = useState<string>("Max");

  const innerSliderComposerProps: InnerCustomSliderComposerProps = {
    sliderMin,
    sliderMax,
    sliderDefaultPosition,
    sliderMinLabel,
    sliderMaxLabel,
    sliderDisabled,
    lockBeforeUse: isLockbeforeUse,
    activateNext,
    lockAfterUse: isLockAfterUse,
  };

  const innerSliderComposerHooks: InnerCustomSliderComposerHooks = {
    setSliderMin,
    setSliderMax,
    setSliderDefaultPosition,
    setSliderMinLabel,
    setSliderMaxLabel,
    setSliderDisabled,
    setLockBeforeUse: setIsLockBeforeUse,
    setLockAfterUse: setIsLockAfterUse,
  };

  /////////////////////////////////////////////////////////////

  //// Props and hooks declaration of CustomRateComposer //////
  const [rateMax, setRateMax] = useState<number>(5);
  const [rateMinLabel, setRateMinLabel] = useState<string>("");
  const [rateMaxLabel, setRateMaxLabel] = useState<string>("");
  const innerRateComposerProps: InnerCustomRateComposerProps = {
    rateMax,
    rateMinLabel,
    rateMaxLabel,
    lockBeforeUse: isLockbeforeUse,
    activateNext,
    lockAfterUse: isLockAfterUse,
  };

  const innerRateComposerHooks: InnerCustomRateComposerHooks = {
    setRateMax,
    setRateMinLabel,
    setRateMaxLabel,
    setLockBeforeUse: setIsLockBeforeUse,
    setLockAfterUse: setIsLockAfterUse,
  };
  ///////////////////////////////////////////////////////

  //// Props and hooks declaration of CustomParagraphComposer //////
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
  const innerParagraphComposerProps: InnerCustomParagraphComposerProps = {
    paragraphHeadline,
    paragraphHeadlineFontSize,
    paragraphText,
    paragraphTextFontSize,
    paragraphDirection,
  };

  const innerParagraphComposerHooks: InnerCustomParagraphComposerHooks = {
    setParagraphHeadline,
    setParagraphHeadlineFontSize,
    setParagraphText,
    setParagraphTextFontSize,
    setParagraphDirection,
  };

  ////////////////////////////////////////////////////////////////

  // Mapping component names to their refs
  const paragraphComposerRef = useRef<any>(null); // Create a ref for CustomParagraphComposer

  // Mapping component names to their refs
  const componentRefs: { [key: string]: React.RefObject<any> } = {
    CustomParagraph: paragraphComposerRef,
    // Add other refs here if needed
  };
  const toggleDropdown = () => {
    setShowDropdown(true);
  };

  const addComponent = async (component: string) => {
    let path = "";
    let props: any = {}; // Initialize props variable

    // Save changes if there's a ref for the selected component
    const componentRef = componentRefs[component];
    if (componentRef?.current) {
      componentRef.current.saveChanges(); // Save changes before adding
      componentRef.current.clear();
    }

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
    const newComponent: ComponentSettings = { path, props }; // Pass specific props here
    const newComponents = [...components, newComponent]; // Add new component at the end
    setComponents(newComponents);

    const newLockBeforeUseArr = [...lockBeforeUseArr, isLockbeforeUse];
    setLockBeforeUserArr(newLockBeforeUseArr);

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
    setComponents((prevComponents) => {
      const updatedComponents = [...prevComponents];
      updatedComponents[index].props = {
        ...updatedComponents[index].props,
        ...updatedProps,
      };
      return updatedComponents;
    });
    setAlert({
      message: "Component props updated successfully!",
      severity: "success",
    });
  };

  const renderSelectedComponent = () => {
    switch (selectedComponent) {
      case "CustomSlider":
        return (
          <CustomSliderComposer
            customSliderProps={innerSliderComposerProps}
            hooks={innerSliderComposerHooks}
          />
        );
      case "CustomRate":
        return (
          <CustomRateComposer
            customRateProps={innerRateComposerProps}
            hooks={innerRateComposerHooks}
          />
        );
      case "CustomParagraph":
        return (
          <CustomParagraphComposer
            ref={paragraphComposerRef} // Attach the ref here
            customParagraphProps={innerParagraphComposerProps}
            hooks={innerParagraphComposerHooks}
          />
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
                <Suspense
                  key={index}
                  fallback={<div>Loading Component...</div>}
                >
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
