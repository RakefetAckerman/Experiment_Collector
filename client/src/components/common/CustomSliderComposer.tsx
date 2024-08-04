import React from "react";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { debounce } from "lodash";
import { Dispatch, SetStateAction } from "react";

interface InnerCustomSliderComposerHooks {
  setSliderMin: Dispatch<SetStateAction<number>>;
  setSliderMax: Dispatch<SetStateAction<number>>;
  setSliderDefaultPosition: Dispatch<SetStateAction<number>>;
  setSliderMinLabel: Dispatch<SetStateAction<string>>;
  setSliderMaxLabel: Dispatch<SetStateAction<string>>;
  setSliderDisabled: Dispatch<SetStateAction<boolean>>;
  setLockBeforeUse: Dispatch<SetStateAction<boolean>>;
  setLockAfterUse: Dispatch<SetStateAction<boolean>>;
}

interface InnerCustomSliderComposerProps {
  sliderMin: number;
  sliderMax: number;
  sliderDefaultPosition: number;
  sliderMinLabel: string;
  sliderMaxLabel: string;
  sliderDisabled: boolean;
  lockBeforeUse: boolean;
  activateNext: () => void;
  lockAfterUse: boolean;
}

interface CustomSliderComposerProps {
  customSliderProps: InnerCustomSliderComposerProps;
  hooks: InnerCustomSliderComposerHooks;
}

const CustomSliderComposer: React.FC<CustomSliderComposerProps> = ({
  customSliderProps,
  hooks,
}) => {
  const debouncedSetSliderMin = debounce(
    (value: number) => hooks.setSliderMin(value),
    300
  );
  const debouncedSetSliderMax = debounce(
    (value: number) => hooks.setSliderMax(value),
    300
  );
  const debouncedSetSliderDefaultPosition = debounce(
    (value: number) => hooks.setSliderDefaultPosition(value),
    300
  );
  const debouncedSetSliderMinLabel = debounce(
    (value: string) => hooks.setSliderMinLabel(value),
    300
  );
  const debouncedSetSliderMaxLabel = debounce(
    (value: string) => hooks.setSliderMaxLabel(value),
    300
  );

  return (
    <Box mb={2} width="100%">
      <TextField
        label="Min Value"
        type="number"
        fullWidth
        defaultValue={customSliderProps.sliderMin}
        onChange={(e) => debouncedSetSliderMin(Number(e.target.value))}
        sx={{ mb: 2 }}
      />
      <TextField
        label="Max Value"
        type="number"
        fullWidth
        defaultValue={customSliderProps.sliderMax}
        onChange={(e) => debouncedSetSliderMax(Number(e.target.value))}
        sx={{ mb: 2 }}
      />
      <TextField
        label="Default Position"
        type="number"
        fullWidth
        defaultValue={customSliderProps.sliderDefaultPosition}
        onChange={(e) =>
          debouncedSetSliderDefaultPosition(Number(e.target.value))
        }
        sx={{ mb: 2 }}
      />
      <TextField
        label="Min Label"
        type="text"
        fullWidth
        defaultValue={customSliderProps.sliderMinLabel}
        onChange={(e) => debouncedSetSliderMinLabel(e.target.value)}
        sx={{ mb: 2 }}
      />
      <TextField
        label="Max Label"
        type="text"
        fullWidth
        defaultValue={customSliderProps.sliderMaxLabel}
        onChange={(e) => debouncedSetSliderMaxLabel(e.target.value)}
        sx={{ mb: 2 }}
      />
      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel>Disabled</InputLabel>
        <Select
          value={customSliderProps.sliderDisabled ? "true" : "false"}
          onChange={(e) => hooks.setSliderDisabled(e.target.value === "true")}
          variant="outlined"
        >
          <MenuItem value="true">True</MenuItem>
          <MenuItem value="false">False</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

export default CustomSliderComposer;

export type {
  CustomSliderComposerProps,
  InnerCustomSliderComposerProps,
  InnerCustomSliderComposerHooks,
};
