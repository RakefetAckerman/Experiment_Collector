import React from "react";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import Typography from "@mui/material/Typography";

interface CustomRateProps {
  max: number;
  minLabel: string;
  maxLabel: string;
}

const CustomRate: React.FC<CustomRateProps> = ({
  max = 5,
  minLabel = "",
  maxLabel = "",
}) => {
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
        max={max}
        icon={<FavoriteIcon fontSize="inherit" />}
        emptyIcon={<FavoriteBorderIcon fontSize="inherit" />}
      />
      <Typography variant="body1" gutterBottom>
        {maxLabel}
      </Typography>
    </Box>
  );
};

export default CustomRate;
