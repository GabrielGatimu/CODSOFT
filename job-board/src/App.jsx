import {BrowserRouter, Route, Routes} from "react-router-dom";
// import './styles/App.css'

// import Nav from "./components/navbar/Nav.jsx";
import HomePage from "./screens/HomePage.jsx";
import NotFound from "./components/NotFound.jsx";

function App() {
    return (
        <main className="overflow-x-hidden font-poppins">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<HomePage/>}/>
                    <Route path="/jobs" element={<HomePage/>}/>
                    <Route path="/blog" element={<HomePage/>}/>
                    <Route path="/contact" element={<HomePage/>}/>

                    {/* Not Found Page */}
                    <Route path="*" element={<NotFound/>}/>
                </Routes>
            </BrowserRouter>
        </main>
    )
}

export default App
