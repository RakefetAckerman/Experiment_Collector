import { Box } from "@mui/material";
import Navbar from "../components/common/Navbar";
import SettingsDrawer from "../components/common/SettingsDrawer";
// import ExperimentFormPage from "./ExperimentFormPage";
import { useState } from "react";
import DynamicTrialTypeEditor from "../components/common/DynamicTrialTypeEditor";

const EditorPage = () => {
  const [settingsValues, setSettingsValues] = useState({
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

  return (
    <>
      <Navbar />
      <Box sx={{ display: "flex", height: "calc(100vh - 64px)" }}>
        <Box
          sx={{
            width: "100px",
            backgroundColor: "#f0f0f0",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            pt: 2,
            pb: 2,
            borderRight: "1px solid #ddd",
          }}
        >
          <SettingsDrawer
            settingsValues={settingsValues}
            setSettingsValues={setSettingsValues}
          />
        </Box>
        <Box
          sx={{
            flexGrow: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            p: 3,
            backgroundColor: "#fafafa",
          }}
        >
          {/* <ExperimentFormPage /> */}
          <DynamicTrialTypeEditor />
        </Box>
      </Box>
    </>
  );
};

export default EditorPage;
