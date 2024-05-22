import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "./theme";
import LoginClassifier from "./components/LoginClassifier";
import SignupPrep from "./components/SignupPrep";
import { State } from "./states/reducer";
import DashboardPage from "./scenes/DashboardPage";
import EditorPage from "./scenes/EditorPage";
import ExperimentPage from "./scenes/ExperimentPage";
import ExportDataPage from "./scenes/ExportDataPage";
import ProfilePage from "./scenes/ProfilePage";

function App() {
  const mode = useSelector((state: State) => state.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  const isAuth = Boolean(useSelector((state: State) => state.token));

  return (
    <>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route
              path="/"
              element={
                isAuth ? <DashboardPage /> : <Navigate to="/login/Researcher" />
              }
            />
            <Route
              path="/editor"
              element={
                isAuth ? <EditorPage /> : <Navigate to="/login/Researcher" />
              }
            />
            <Route
              path="/export-data"
              element={
                isAuth ? (
                  <ExportDataPage />
                ) : (
                  <Navigate to="/login/Researcher" />
                )
              }
            />
            <Route
              path="/experiment"
              element={
                isAuth ? (
                  <ExperimentPage />
                ) : (
                  <Navigate to="/login/Researcher" />
                )
              }
            />
            <Route
              path="/profile"
              element={
                isAuth ? <ProfilePage /> : <Navigate to="/login/Researcher" />
              }
            />
            <Route path="/login/:userType" element={<LoginClassifier />} />
            <Route path="/signup" element={<SignupPrep />} />
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
