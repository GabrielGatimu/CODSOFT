import {Outlet} from "react-router-dom";
import Sidebar from "../components/navigation/Sidebar.jsx";

export default function Dashboard() {
    return (
        <div>
            <Sidebar/>
            <Outlet/>
        </div>
    );
}
