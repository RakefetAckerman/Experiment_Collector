import {BrowserRouter, Routes, Route} from "react-router-dom";
import HomePage from "./pages/HomePage.tsx";
import AppLayout from "./pages/AppLayout.tsx";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<AppLayout/>}>
                    <Route path="/" element={<HomePage/>}/>
                </Route>
            </Routes>


        </BrowserRouter>)
    // const mode = useSelector((state: State) => state.mode);
    // const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
    // const isAuth = Boolean(useSelector((state: State) => state.token));
    //
    // return (
    //   <>
    //     <BrowserRouter>
    //       <ThemeProvider theme={theme}>
    //         <CssBaseline />
    //         <CustomAlert />
    //         <Routes>
    //           <Route
    //             path="/"
    //             element={
    //               isAuth ? <DashboardPage /> : <Navigate to="/login/Researcher" />
    //             }
    //           />
    //           <Route
    //             path="/editor"
    //             element={
    //               isAuth ? <EditorPage /> : <Navigate to="/login/Researcher" />
    //             }
    //           />
    //           <Route
    //             path="/export-data"
    //             element={
    //               isAuth ? (
    //                 <ExportDataPage />
    //               ) : (
    //                 <Navigate to="/login/Researcher" />
    //               )
    //             }
    //           />
    //           <Route
    //             path="/experiment"
    //             element={
    //               isAuth ? (
    //                 <ExperimentPage />
    //               ) : (
    //                 <Navigate to="/login/Researcher" />
    //               )
    //             }
    //           />
    //           <Route
    //             path="/profile"
    //             element={
    //               isAuth ? <ProfilePage /> : <Navigate to="/login/Researcher" />
    //             }
    //           />
    //           <Route path="/login/:userType" element={<LoginClassifier />} />
    //           <Route path="/signup" element={<SignupPrep />} />
    //           <Route path="/reuseable" element={<EditorComponent />} />
    //         </Routes>
    //       </ThemeProvider>
    //     </BrowserRouter>
    //   </>
    // );
}

export default App;
