import React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import { ListItemIcon, useTheme } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ManageHistoryIcon from "@mui/icons-material/ManageHistory";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import SettingsIcon from "@mui/icons-material/Settings";
import {
  AdditionalSettings,
  MetaSettingsValues,
} from "../../utils/types/metaSettingsValues";

interface SettingsDrawerProps {
  settingsValues: MetaSettingsValues;
  setSettingsValues: React.Dispatch<React.SetStateAction<MetaSettingsValues>>;
}

export default function SettingsDrawer({
  settingsValues,
  setSettingsValues,
}: SettingsDrawerProps) {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const handleChange =
    (setting: keyof MetaSettingsValues, subSetting?: string) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      if (subSetting) {
        setSettingsValues({
          ...settingsValues,
          [setting]: {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            ...(settingsValues[setting] as Record<string, any>),
            [subSetting]: event.target.value,
          },
        });
      } else {
        setSettingsValues({
          ...settingsValues,
          [setting]: event.target.value,
        });
      }
    };

  const handleCheckboxChange =
    (setting: keyof MetaSettingsValues) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setSettingsValues({
        ...settingsValues,
        [setting]: {
          ...(settingsValues[setting] as AdditionalSettings),
          [event.target.name]: event.target.checked,
        },
      });
    };

  const handleClearSettings = () => {
    setSettingsValues({
      time: {
        displayAlert: false,
        seconds: "",
        idleMessage: "",
      },
      response: "",
      additionalSettings: {
        shuffledQuestion: false,
        trackFocus: false,
      },
    });
  };

  const settings = [
    { name: "Time", icon: <ManageHistoryIcon /> },
    { name: "Response", icon: <BorderColorIcon /> },
    { name: "Additional Settings", icon: <SettingsIcon /> },
  ];

  const DrawerList = (
    <Box
      sx={{ width: 350, display: "flex", flexDirection: "column" }}
      role="presentation"
      onClick={(e) => {
        // Prevent closing when clicking inside the drawer
        e.stopPropagation();
      }}
    >
      <List sx={{ flexGrow: 1 }}>
        {settings.map(({ name, icon }, index) => (
          <React.Fragment key={name}>
            <ListItem disablePadding onClick={(e) => e.stopPropagation()}>
              <ListItemButton>
                <ListItemIcon>{icon}</ListItemIcon>
                <ListItemText primary={name} />
              </ListItemButton>
            </ListItem>
            <Box
              sx={{ padding: "0 16px" }}
              onClick={(e) => e.stopPropagation()}
            >
              {(() => {
                switch (name) {
                  case "Time":
                    return (
                      <>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={settingsValues.time.displayAlert}
                              onChange={handleCheckboxChange("time")}
                              name="displayAlert"
                            />
                          }
                          label="Display Alert"
                        />
                        <TextField
                          label="Seconds"
                          type="number"
                          value={settingsValues.time.seconds}
                          onChange={handleChange("time", "seconds")}
                          fullWidth
                          margin="normal"
                        />
                        <TextField
                          label="Idle Message"
                          value={settingsValues.time.idleMessage}
                          onChange={handleChange("time", "idleMessage")}
                          fullWidth
                          margin="normal"
                        />
                      </>
                    );
                  case "Response":
                    return (
                      <TextField
                        label="Correct Answer"
                        value={settingsValues.response}
                        onChange={handleChange("response")}
                        fullWidth
                        margin="normal"
                      />
                    );
                  case "Additional Settings":
                    return (
                      <>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={
                                settingsValues.additionalSettings
                                  .shuffledQuestion
                              }
                              onChange={handleCheckboxChange(
                                "additionalSettings"
                              )}
                              name="shuffledQuestion"
                            />
                          }
                          label="Shuffled Question"
                        />
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={
                                settingsValues.additionalSettings.trackFocus
                              }
                              onChange={handleCheckboxChange(
                                "additionalSettings"
                              )}
                              name="trackFocus"
                            />
                          }
                          label="Track Focus"
                        />
                      </>
                    );
                  default:
                    return null;
                }
              })()}
            </Box>
            {index < settings.length - 1 && <Divider />}
          </React.Fragment>
        ))}
      </List>
      <Button
        fullWidth
        variant="contained"
        onClick={handleClearSettings}
        sx={{
          margin: "2rem 0",
          padding: "1rem",
          bgcolor: theme.palette.primary.main,
          color: theme.palette.background.paper,
          "&:hover": { color: theme.palette.primary.main },
        }}
        startIcon={<DeleteIcon />}
      >
        Clear Settings
      </Button>
    </Box>
  );

  return (
    <>
      <Button
        fullWidth
        style={{
          display: "flex",
          justifyContent: "center",
          width: "100%",
        }}
        onClick={toggleDrawer(true)}
      >
        Open settings
      </Button>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </>
  );
}
