import {BrowserRouter, Routes, Route} from "react-router-dom";
import HomePage from "./pages/HomePage.tsx";
import AppLayout from "./pages/AppLayout.tsx";
import "./index.css"
import EditorPage from "./pages/EditorPage.tsx";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<AppLayout/>}>
                    <Route path="/" element={<HomePage/>}/>
                    <Route path="/editor" element={<EditorPage/>}/>
                </Route>
            </Routes>


        </BrowserRouter>
    )
}

export default App;
