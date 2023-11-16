import {BrowserRouter, Route, Routes} from "react-router-dom";
import './styles/App.css'

import Nav from "./components/navbar/Nav.jsx";
import HomePage from "./screens/HomePage.jsx";
import NotFound from "./components/NotFound.jsx";

function App() {
    return (
        <>
            <Nav/>

            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<HomePage/>}/>

                    {/* Not Found Page */}
                    <Route path="*" element={<NotFound/>}/>
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default App
