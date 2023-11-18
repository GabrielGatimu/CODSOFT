import {Outlet} from "react-router-dom";
import {ToastContainer} from "react-toastify";

import './styles/tailwind.css'
import Nav from "./components/navbar/Nav.jsx";

function App() {
    return (
        <>
            <Nav/>
            <ToastContainer/>
            <Outlet/>
        </>

    )
}

export default App
