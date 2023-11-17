export default function MenuItem({href, isActive, children}) {
    return (
        <li>
            <a href={href}
               className={`flex px-3 py-2 rounded-md ${isActive ? 'bg-slate-100 text-black' : 'text-white'}`}>
                {children}
            </a>
        </li>
    );
}
