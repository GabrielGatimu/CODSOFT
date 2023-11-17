export default function MenuItem({href, isActive, children}) {
    return (
        <li>
            <a href={href}
               className={`flex px-3 py-2 my-2 rounded-md ${isActive ? 'w-fit bg-slate-100 text-black' : 'text-white'} hover:text-green-500 duration-500` }>
                {children}
            </a>
        </li>
    );
}
