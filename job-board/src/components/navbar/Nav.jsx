import Menu from "./Menu.jsx";
import MenuItem from "./MenuItem.jsx";

export default function Nav() {
    return (
        <>
            <nav className="flex items-center px-10 mb-2 w-full border-b-2 border-b-slate-50">
                {/* search button */}
                <form className="bg-transparent">
                    <input type="search" placeholder="search a job" className="bg-transparent focus:bg-slate-50 py-2 px-4 border-0 focus:border-none rounded"/>
                </form>


                {/* site links */}
                <Menu>
                    <MenuItem href="/" isActive>Home</MenuItem>
                    <MenuItem href="/jobs">Browse Jobs</MenuItem>
                    <MenuItem href="/blog">Blog</MenuItem>
                    <MenuItem href="/contact">Contact</MenuItem>
                </Menu>
                {/* action links (login) & (add button) */}

            </nav>
        </>
);
}


