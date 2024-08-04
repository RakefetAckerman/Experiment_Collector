import React, { useState } from "react";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import Typography from "@mui/material/Typography";

interface CustomRateProps {
  max: number;
  minLabel: string;
  maxLabel: string;
  lockBeforeUse: boolean; // true - locked before use, false - not blocked before use
  activateNext: () => void; // Activates the next component
  lockAfterUse?: boolean; // true - locked after use, false - not blocked after use
}

const CustomRate: React.FC<CustomRateProps> = ({
  max = 5,
  minLabel = "",
  maxLabel = "",
  lockBeforeUse = false,
  activateNext,
  lockAfterUse = false,
}) => {
  const [value, setValue] = useState<number | null>(null);
  const [isLockedAfterUse, setIsLockedAfterUse] = useState(false);

  const handleRatingChange = (
    _event: React.ChangeEvent<object>,
    newValue: number | null
  ) => {
    if (!isLockedAfterUse) {
      setValue(newValue);
      if (lockAfterUse) {
        setIsLockedAfterUse(true); // turning disabling the component
        activateNext(); // Only when the current component needs to be locked then it activates the next component, othwerise there is no use to call activateNext because the next component will be enabled before use
      }
    }
  };

  const isDisabled = lockBeforeUse || isLockedAfterUse;

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography variant="body1" gutterBottom>
        {minLabel}
      </Typography>
      <Rating
        name="custom-rate"
        defaultValue={1}
        value={value}
        onChange={handleRatingChange}
        max={max}
        icon={<FavoriteIcon fontSize="inherit" />}
        emptyIcon={<FavoriteBorderIcon fontSize="inherit" />}
        disabled={isDisabled}
      />
      <Typography variant="body1" gutterBottom>
        {maxLabel}
      </Typography>
    </Box>
  );
};

export default CustomRate;

export type { CustomRateProps };
