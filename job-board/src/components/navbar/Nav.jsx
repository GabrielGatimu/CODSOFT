import Menu from "./Menu.jsx";
import MenuItem from "./MenuItem.jsx";

export default function Nav() {
    return (
        <>
            {/*<nav className="bg-blue-200 hidden items-center md:block lg:flex lg:justify-evenly py-2 border-b-2 border-b-slate-400">*/}
            <nav className="bg-red-500 shadow p-5 md:flex md:items-center md:justify-between">

            {/* search button */}
                <div>
                    <form className="relative w-max mx-auto">
                        <input type="search" id="search"
                               className="relative peer z-10 bg-transparent w-12 h-12 rounded-full border cursor-pointer pl-12 pr-4 focus:w-full focus:border-lime-300 focus:cursor-text focus:pl-20 focus:pr-4"></input>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                             stroke="currentColor"
                             className="absolute bg-green-500 rounded-full h-12 inset-y-6 my-auto w-16 px-3.5 border-r border-transparent peer-focus:bg-transparent peer-focus:rounded peer-focus:border-lime-300 peer-focus:stroke-lime-300">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"/>
                        </svg>
                    </form>
                </div>

                {/* page links */}
                <Menu>
                    <MenuItem href="/" isActive>Home</MenuItem>
                    <MenuItem href="/jobs">Browse Jobs</MenuItem>
                    <MenuItem href="/blog">Blog</MenuItem>
                    <MenuItem href="/contact">Contact</MenuItem>
                </Menu>

                {/* action links (login & post buttons) */}
                <div className="flex text-white items-center">
                    <a href="/login">Login</a>
                    <a href="/jobs/post" className="flex px-3 py-2 m-4 rounded-md bg-slate-100 text-black">Post A
                        Job</a>
                </div>
            </nav>
        </>
    );
}


