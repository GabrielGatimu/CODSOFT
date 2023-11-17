import Menu from "./Menu.jsx";
import MenuItem from "./MenuItem.jsx";

export default function Nav() {
    return (
        <>
            <nav
                className="bg-blue-500 shadow p-5 pl-8 md:px-16 md:flex md:items-center md:justify-between  z-[-1] md:z-auto">

                {/* search button */}
                <div className="flex items-center text-white space-x-1 md:space-x-3">
                    <form className="relative w-auto md:w-max mx-auto">
                        <input type="search" id="search"
                               className="relative peer z-10 bg-transparent w-12 h-12 rounded-full border cursor-pointer pl-12 pr-4 focus:w-full focus:border-lime-300 focus:cursor-text focus:pl-20 focus:pr-4"></input>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                             stroke="currentColor"
                             className="absolute bg-green-500 rounded-full h-12 inset-y-6 my-auto w-16 px-3.5 border-r border-transparent peer-focus:bg-transparent peer-focus:rounded peer-focus:border-lime-300 peer-focus:stroke-lime-300">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"/>
                        </svg>
                    </form>
                    <div>
                        <h1 className="text-xl md:text-2xl md:font-extrabold ">Job Board</h1>
                        <h6 className="text-slate-200 text-sm">find your dream job</h6>
                    </div>
                </div>

                {/* page links */}
                <Menu>
                    <MenuItem href="/" isActive>Home</MenuItem>
                    <MenuItem href="/jobs">Browse Jobs</MenuItem>
                    <MenuItem href="/blog">Blog</MenuItem>
                    <MenuItem href="/contact">Contact</MenuItem>
                </Menu>

                {/* action links (login & post buttons) */}
                <div className="hidden md:flex text-white items-center">
                    <a href="/login">Login</a>
                    <a href="/jobs/post" className="flex px-3 py-2 m-4 rounded-md bg-slate-100 text-black">Post A
                        Job</a>
                </div>

            </nav>
        </>
    );
}


