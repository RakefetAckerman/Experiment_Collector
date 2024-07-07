// CustomSlider.tsx
import React from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";

interface CustomSliderProps {
  min: number;
  max: number;
  defaultPosition?: number;
  disabled?: boolean;
  minLabel?: string;
  maxLabel?: string;
}

const CustomSlider: React.FC<CustomSliderProps> = ({
  min = 0,
  max = 100,
  defaultPosition = Math.round((max - min) / 2),
  disabled = false,
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

  return (
    <Box sx={{ width: "100%" }}>
      <Slider
        defaultValue={defaultPosition}
        min={min}
        max={max}
        aria-label="Always visible"
        marks={marks}
        disabled={disabled}
        valueLabelDisplay="on"
      />
    </Box>
  );
};

export default CustomSlider;

export type { CustomSliderProps };
