export default function Menu({ children }) {
    return (
        <nav className="text-sm">
            <ul className="md:flex md:items-center md:space-x-3">
                {children}
            </ul>
        </nav>
    );
}
