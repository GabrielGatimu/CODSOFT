import {Link} from "react-router-dom";
import useActiveLink from "../../../hooks/useActiveLink.js";

export default function SidebarItem({href,onClick, children}) {
    const activeLink = useActiveLink()
    return (
        <li className="p-2 rounded " >
            <Link to={href} href={href}
                  onClick={onClick}
                  className={`flex flex-col gap-y-3 items-center ${(activeLink === href) ? 'underline text-blue-800 text-xl' : 'text-stone-950'} hover:text-blue-800 duration-500` }>
                {children}
            </Link>
        </li>
    );
}
