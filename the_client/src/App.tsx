import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { CssBaseline, ThemeProvider } from "@mui/material";
import HomePage from "./scenes/homePage/HomePage";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "./theme";
import LoginClassifier from "./components/LoginClassifier";
import SignupPrep from "./components/SignupPrep";
import { State } from "./states/reducer";
import DashboardPage from "./scenes/dashboardPage/DashboardPage";

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
                isAuth ? <HomePage /> : <Navigate to="/login/Researcher" />
              }
            />
            <Route
              path="/Dashboard"
              element={
                isAuth ? <DashboardPage /> : <Navigate to="/login/Researcher" />
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
