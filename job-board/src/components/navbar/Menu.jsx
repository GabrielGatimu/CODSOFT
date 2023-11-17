export default function Menu({ children }) {
    return (
        <nav className="text-xl hidden md:flex">
            <ul className="md:flex md:items-center md:space-x-3">
                {children}
            </ul>
        </nav>
    );
}
