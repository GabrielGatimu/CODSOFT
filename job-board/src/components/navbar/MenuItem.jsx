import useActiveLink from "../../hooks/useActiveLink.js";

export default function MenuItem({href,onClick, children}) {
 const activeLink = useActiveLink()
    return (
        <li className="text-sm">
            <a href={href}
               onClick={onClick}
               className={`flex px-3 py-2 my-2 md:my-0 rounded-md ${(activeLink === href) ? 'w-fit underline text-xl text-black' : 'text-white'} hover:text-black duration-500` }>
                {children}
            </a>
        </li>
    );
}
