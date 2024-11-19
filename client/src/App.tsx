import {BrowserRouter, Routes, Route} from "react-router-dom";
import HomePage from "./pages/HomePage.tsx";
import AppLayout from "./pages/AppLayout.tsx";
import "./index.css"
import ExperimentsDashboard from "./pages/ExperimentsDashboard.tsx";
import ExperimentPage from "./pages/ExperimentPage.tsx";
import SignupPage from "./features/Register/SignupPage.tsx";
import SignupPageResearcher from "./features/Register/SignupPageResearcher.tsx";
import LoginResearcher from "./features/login/LoginResearcher.tsx";
import ProtectedRoutes from "./features/utils/ProtectedRoutes.tsx";
import ProtectedResearcher from "./features/utils/ProtectedResearcher.tsx";

/**
 * Features to add to page:
 * TODO add Login page
 * TODO add Error handling - page not found
 * TODO add protected routing for relevant pages
 * @constructor
 */
function App() {
    return (
        <BrowserRouter>
            <Routes>
                {/*Protecting against users that aren't in the database */}
                <Route element={<ProtectedRoutes/>}>
                    <Route element={<AppLayout/>}>
                        <Route path="/experiment/:experiment_name" element={<ExperimentPage/>}/>
                        {/*Protecting against users that don't have a researcher role */}
                        <Route element={<ProtectedResearcher/>}>
                            <Route path="/" element={<HomePage/>}/>
                            <Route path="/editor" element={<></>}/>
                            <Route path="/experiment" element={<ExperimentsDashboard/>}/>
                        </Route>
                    </Route>
                </Route>

                <Route path="/signup" element={<SignupPage/>}/>
                <Route path="/signup/researcher" element={<SignupPageResearcher/>}/>

                <Route path="/login/researcher" element={<LoginResearcher/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default App;
