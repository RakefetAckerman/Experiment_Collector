import {BrowserRouter, Routes, Route} from "react-router-dom";
import HomePage from "./pages/HomePage.tsx";
import AppLayout from "./pages/AppLayout.tsx";
import "./index.css"
import EditorPage from "./pages/EditorPage.tsx";
import ExperimentsDashboard from "./pages/ExperimentsDashboard.tsx";
import ExperimentPage from "./pages/ExperimentPage.tsx";
import SignupPage from "./components/register/SignupPage.tsx";
import SignupPageResearcher from "./components/register/SignupPageResearcher.tsx";
import Login from "./components/login/login.tsx";

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
                <Route element={<AppLayout/>}>
                    <Route path="/" element={<HomePage/>}/>
                    <Route path="/editor" element={<EditorPage/>}/>
                    <Route path="/experiment" element={<ExperimentsDashboard/>}/>
                    <Route path="/experiment/:experiment_name" element={<ExperimentPage/>}/>
                </Route>

                <Route path="/signup" element={<SignupPage/>}/>
                <Route path="/signup/researcher" element={<SignupPageResearcher/>}/>

                <Route path="/login" element={<Login/>}/>
                <Route path="/login/researcher" element={<SignupPageResearcher/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default App;
