import {BrowserRouter, Route, Routes} from "react-router-dom";
// import './styles/App.css'

import Nav from "./components/navbar/Nav.jsx";
import HomePage from "./screens/HomePage.jsx";
import NotFound from "./components/NotFound.jsx";
import JobListing from "./screens/JobListing.jsx";
import Contact from "./screens/Contact.jsx";
import Blog from "./screens/Blog.jsx";
import Dashboard from "./screens/dashboards/Dashboard.jsx";
import Profile from "./screens/Profile.jsx";

function App() {
    return (
        <main className="overflow-x-hidden font-poppins">
            <Nav />
            <BrowserRouter>
                <Routes>
                    {/* public pages */}
                    <Route path="/" element={<HomePage/>}/>
                    <Route path="/jobs" element={<JobListing/>}/>
                    <Route path="/blog" element={<Blog/>}/>
                    <Route path="/contact" element={<Contact/>}/>

                    {/* Dashboard */}
                    <Route path="/dashboard" element={<Dashboard/>}/>

                    {/* Profile Page */}
                    <Route path="/profile" element={<Profile />}/>



                    {/* Not Found Page */}
                    <Route path="*" element={<NotFound/>}/>
                </Routes>
            </BrowserRouter>
        </main>
    )
}

export default App
