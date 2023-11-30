import {Outlet} from "react-router-dom";
import Sidebar from "../navigation/sidebar/Sidebar.jsx";

export default function Account() {
    return (
        <div className="flex h-screen">
            <Sidebar/>
            <div className="flex-1 p-8 overflow-x-hidden overflow-y-scroll">
                <Outlet/>
            </div>
        </div>
    );
}
