import {Link} from "react-router-dom";
import {PlusIcon} from "lucide-react";
import useAuth from "../hooks/useAuth.js";

function Dashboard() {
    const {userInfo} = useAuth()
    return (
        <div className="h-[calc(100vh-10rem)] border border-red-500 flex flex-col md:flex-row items-center justify-center ">
            {userInfo.role === 'employer' ?
                    <Link to={'/create-job'}
                          className="hover:border-none hover:bg-gradient-to-r hover:from-indigo-600 hover:to-indigo-400 hover:text-indigo-50 group w-fit flex flex-col items-center justify-center rounded-md border-2 border-dashed border-stone-400 leading-6 text-stone-900 font-medium p-10">
                        <PlusIcon/>
                        New job
                    </Link>
                :

                <>
                    dashboard
                </>
            }
        </div>
    );
}

export default Dashboard;
