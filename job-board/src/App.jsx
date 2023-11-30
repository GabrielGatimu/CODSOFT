import {Outlet} from "react-router-dom";
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import './styles/tailwind.css'
import Nav from "./components/navigation/navbar/Nav.jsx";
import Footer from "./components/navigation/Footer.jsx";

function App() {
    return (
        <main className="min-h-screen w-full font-poppins">
            <Nav/>
            <ToastContainer/>
            <section className="h-full">
                <Outlet/>
            </section>
            <footer>
                <Footer/>
            </footer>
        </main>
    )
}

export default App
