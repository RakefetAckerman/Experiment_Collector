import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CssBaseline, ThemeProvider } from "@mui/material";
import HomePage from "./scenes/homePage/HomePage";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "./theme";
import { AuthState } from "./states";
import ParticipantsLoginClassifier from "./components/LoginClassifier";
import SignupPrep from "./components/SignupPrep";

function App() {
  const mode = useSelector((state: AuthState) => state.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  return (
    <>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route path="/home" element={<HomePage />} />
            <Route
              path="/login/:userType"
              element={<ParticipantsLoginClassifier />}
            />
            <Route path="/signup" element={<SignupPrep />} />
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
