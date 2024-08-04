import { Box, TextField } from "@mui/material";
import { debounce } from "lodash";
import { Dispatch, SetStateAction } from "react";

interface InnerCustomRateComposerHooks {
  setRateMax: Dispatch<SetStateAction<number>>;
  setRateMinLabel: Dispatch<SetStateAction<string>>;
  setRateMaxLabel: Dispatch<SetStateAction<string>>;
  setLockBeforeUse: Dispatch<SetStateAction<boolean>>;
  setLockAfterUse: Dispatch<SetStateAction<boolean>>;
}

interface InnerCustomRateComposerProps {
  rateMax: number;
  rateMinLabel: string;
  rateMaxLabel: string;
  lockBeforeUse: boolean;
  activateNext: () => void;
  lockAfterUse: boolean;
}

interface CustomRateComposerProps {
  customRateProps: InnerCustomRateComposerProps;
  hooks: InnerCustomRateComposerHooks;
}

const CustomRateComposer: React.FC<CustomRateComposerProps> = ({
  customRateProps,
  hooks,
}) => {
  return (
    <Box mb={2} width="100%">
      <TextField
        label="Max Rating"
        type="number"
        fullWidth
        defaultValue={customRateProps.rateMax}
        onChange={(e) =>
          debounce(() => hooks.setRateMax(Number(e.target.value)), 300)()
        }
        sx={{ mb: 2 }}
      />
      <TextField
        label="Min Label"
        type="text"
        fullWidth
        defaultValue={customRateProps.rateMinLabel}
        onChange={(e) =>
          debounce(() => hooks.setRateMinLabel(e.target.value), 300)()
        }
        sx={{ mb: 2 }}
      />
      <TextField
        label="Max Label"
        type="text"
        fullWidth
        defaultValue={customRateProps.rateMaxLabel}
        onChange={(e) =>
          debounce(() => hooks.setRateMaxLabel(e.target.value), 300)()
        }
        sx={{ mb: 2 }}
      />
    </Box>
  );
};

export default CustomRateComposer;

export type {
  CustomRateComposerProps,
  InnerCustomRateComposerProps,
  InnerCustomRateComposerHooks,
};
