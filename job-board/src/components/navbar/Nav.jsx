import Menu from "./Menu.jsx";
import MenuItem from "./MenuItem.jsx";

export default function Nav() {
    return (
        <>
        <nav className="mb-2 w-full border-b-2 border-b-slate-400">
            {/* search button */}

            {/* site links */}
            <Menu>
                <MenuItem href="/" isActive>Home</MenuItem>
                <MenuItem href="/jobs">Browse Jobs</MenuItem>
                <MenuItem href="/blog">Blog</MenuItem>
                <MenuItem href="/contact">Contact</MenuItem>
            </Menu>
            {/* action links */}
        </nav>
        </>
    );
}


