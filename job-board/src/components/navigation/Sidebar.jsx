import useAuth from "../../hooks/useAuth.js";
import {Navigate} from "react-router-dom";

export default function Sidebar() {
    const {userInfo} = useAuth()

    if (userInfo) {
        switch (userInfo.userRole) {
            case "admin":
                return (
                    <div className="bg-stone-200 w-20 md:w-60 overflow-x-hidden pl-8 h-[calc(100vh-0rem)]">
                        <ul>
                            <li>Dashboard</li>
                            <li>posted jobs</li>
                            <li>notifications</li>
                            <li>statistics</li>
                            <li>profile</li>
                        </ul>
                    </div>
                )
            case "candidate":
                return (<>
                        <ul>
                            <li>Dashboard</li>
                            <li>applications</li>
                            <li>statistics</li>
                            <li>notifications</li>
                            <li>profile</li>
                        </ul>
                    </>
                )
            default:
                return (<>
                        <ul>
                            <li>applications</li>
                            <li>statistics</li>
                            <li>notifications</li>
                            <li>profile</li>
                        </ul>
                    </>
                )
        }
    } else {
        return <Navigate to={"/signin"}/>
    }
}

