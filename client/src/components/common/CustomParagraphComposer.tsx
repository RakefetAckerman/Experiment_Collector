import { useState, useEffect, forwardRef, useImperativeHandle } from "react";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { Dispatch, SetStateAction } from "react";

interface InnerCustomParagraphComposerHooks {
  setParagraphHeadline: Dispatch<SetStateAction<string>>;
  setParagraphHeadlineFontSize: Dispatch<SetStateAction<string | number>>;
  setParagraphText: Dispatch<SetStateAction<string>>;
  setParagraphTextFontSize: Dispatch<SetStateAction<string | number>>;
  setParagraphDirection: Dispatch<SetStateAction<"ltr" | "rtl">>;
}

interface InnerCustomParagraphComposerProps {
  paragraphHeadline: string;
  paragraphHeadlineFontSize: string | number;
  paragraphText: string;
  paragraphTextFontSize: string | number;
  paragraphDirection: "ltr" | "rtl";
}

interface CustomParagraphComposerProps {
  customParagraphProps: InnerCustomParagraphComposerProps;
  hooks: InnerCustomParagraphComposerHooks;
}

const CustomParagraphComposer = forwardRef(
  ({ customParagraphProps, hooks }: CustomParagraphComposerProps, ref) => {
    // Local state for temporary input handling
    const [headline, setHeadline] = useState(
      customParagraphProps.paragraphHeadline
    );
    const [headlineFontSize, setHeadlineFontSize] = useState(
      customParagraphProps.paragraphHeadlineFontSize
    );
    const [text, setText] = useState(customParagraphProps.paragraphText);
    const [textFontSize, setTextFontSize] = useState(
      customParagraphProps.paragraphTextFontSize
    );
    const [direction, setDirection] = useState(
      customParagraphProps.paragraphDirection
    );

    // Update local state on prop change (if needed)
    useEffect(() => {
      console.log("Props updated: ", {
        headline: customParagraphProps.paragraphHeadline,
        headlineFontSize: customParagraphProps.paragraphHeadlineFontSize,
        text: customParagraphProps.paragraphText,
        textFontSize: customParagraphProps.paragraphTextFontSize,
        direction: customParagraphProps.paragraphDirection,
      });
    }, [customParagraphProps]);

    // Expose saveChanges method to parent
    useImperativeHandle(ref, () => ({
      saveChanges: () => {
        console.log("Saving changes...");
        hooks.setParagraphHeadline(headline);
        hooks.setParagraphHeadlineFontSize(headlineFontSize);
        hooks.setParagraphText(text);
        hooks.setParagraphTextFontSize(textFontSize);
        hooks.setParagraphDirection(direction);
      },
      clear: () => {
        console.log("Clearing fields...");
        setHeadline("");
        setHeadlineFontSize("");
        setText("");
        setTextFontSize("");
        setDirection("ltr");
      },
    }));

    return (
      <Box mb={2} width="100%">
        <TextField
          label="Headline"
          type="text"
          fullWidth
          value={headline}
          onChange={(e) => setHeadline(e.target.value)}
          sx={{ mb: 2 }}
        />
        <TextField
          label="Headline Font Size"
          type="text"
          fullWidth
          value={headlineFontSize}
          onChange={(e) => setHeadlineFontSize(e.target.value)}
          sx={{ mb: 2 }}
        />
        <TextField
          label="Paragraph Text"
          type="text"
          fullWidth
          value={text}
          onChange={(e) => setText(e.target.value)}
          sx={{ mb: 2 }}
        />
        <TextField
          label="Text Font Size"
          type="text"
          fullWidth
          value={textFontSize}
          onChange={(e) => setTextFontSize(e.target.value)}
          sx={{ mb: 2 }}
        />
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel>Direction</InputLabel>
          <Select
            value={direction}
            onChange={(e) => setDirection(e.target.value as "ltr" | "rtl")}
            variant="outlined"
          >
            <MenuItem value="ltr">Left to Right</MenuItem>
            <MenuItem value="rtl">Right to Left</MenuItem>
          </Select>
        </FormControl>
      </Box>
    );
  }
);

export default CustomParagraphComposer;

export type {
  CustomParagraphComposerProps,
  InnerCustomParagraphComposerProps,
  InnerCustomParagraphComposerHooks,
};
