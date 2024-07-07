// CustomParagraph.tsx
import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

interface CustomParagraphProps {
  headline?: string;
  headlineFontSize?: string | number;
  text?: string;
  textFontSize?: string | number;
  direction?: "ltr" | "rtl";
}

const CustomParagraph: React.FC<CustomParagraphProps> = ({
  headline = "",
  headlineFontSize = "1.5rem",
  text = "",
  textFontSize = "1rem",
  direction = "ltr",
}) => {
  const alignment = direction === "rtl" ? "right" : "left";

  return (
    <Box sx={{ width: "100%", textAlign: alignment, direction }}>
      {headline && (
        <Typography variant="h4" sx={{ fontSize: headlineFontSize }}>
          {headline}
        </Typography>
      )}
      {text && (
        <Typography variant="body1" sx={{ fontSize: textFontSize }}>
          {text}
        </Typography>
      )}
    </Box>
  );
};

export default CustomParagraph;
