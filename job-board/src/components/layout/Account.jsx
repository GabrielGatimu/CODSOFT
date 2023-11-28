import {Outlet} from "react-router-dom";
import Sidebar from "../navigation/sidebar/Sidebar.jsx";

export default function Account() {
    return (
        <div className="flex h-[calc(100vh-0rem)]">
            <div className="bg-stone-300 py-8 w-56 ">
            <Sidebar/>
            </div>
            <div className="flex-1 p-8 overflow-x-hidden overflow-y-scroll">
            <Outlet/>
            </div>
        </div>
    );
}
