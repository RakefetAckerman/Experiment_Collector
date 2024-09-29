import {BrowserRouter, Routes, Route} from "react-router-dom";
import HomePage from "./pages/HomePage.tsx";
import AppLayout from "./pages/AppLayout.tsx";
import "./index.css"
import EditorPage from "./pages/EditorPage.tsx";
import ExperimentsDashboard from "./pages/ExperimentsDashboard.tsx";
import ExperimentPage from "./pages/ExperimentPage.tsx";

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
            </Routes>
        </BrowserRouter>
    )
}

export default App;
