import {Outlet} from "react-router-dom";
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import './styles/tailwind.css'
import Nav from "./components/navigation/Nav.jsx";
import Footer from "./components/navigation/Footer.jsx";

function App() {
    return (
        <main className="font-poppins">
            <Nav/>
            <ToastContainer/>
            <div className="h-[calc(100vh-0rem)]">
            <Outlet/>
            </div>
            <Footer/>
        </main>
    )
}

export default App
