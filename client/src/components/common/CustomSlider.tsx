import React, { useState } from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";

interface CustomSliderProps {
  min: number;
  max: number;
  lockBeforeUse: boolean; // true - locked before use, false - not blocked before use
  activateNext: () => void; // Activates the next component
  lockAfterUse?: boolean; // true - locked after use, false - not blocked after use
  defaultPosition?: number;
  minLabel?: string;
  maxLabel?: string;
}

const CustomSlider: React.FC<CustomSliderProps> = ({
  min = 0,
  max = 100,
  lockBeforeUse = false,
  activateNext,
  lockAfterUse = false,
  defaultPosition = Math.round((max - min) / 2),
  minLabel = `${min}`,
  maxLabel = `${max}`,
}) => {
  const marks = [
    {
      value: min,
      label: minLabel,
    },
    {
      value: max,
      label: maxLabel,
    },
  ];

  const [value, setValue] = useState<number>(defaultPosition);
  const [isLockedAfterUse, setIsLockedAfterUse] = useState(false);

  const handleSliderChange = (_event: Event, newValue: number | number[]) => {
    if (!isLockedAfterUse) {
      setValue(newValue as number);
      if (lockAfterUse) {
        setIsLockedAfterUse(true); // Disabling the component
        activateNext(); // Activates the next component when the current one is locked
      }
    }
  };

  const isDisabled = lockBeforeUse || isLockedAfterUse;

  return (
    <Box sx={{ width: "100%" }}>
      <Slider
        defaultValue={defaultPosition}
        value={value}
        onChange={handleSliderChange}
        min={min}
        max={max}
        aria-label="Always visible"
        marks={marks}
        disabled={isDisabled}
        valueLabelDisplay="on"
      />
    </Box>
  );
};

export default CustomSlider;
export type { CustomSliderProps };
