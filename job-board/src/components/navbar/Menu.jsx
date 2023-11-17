export default function Menu({ children, isMenuOpen }) {
    return (
        <nav className={`text-xl ${isMenuOpen ? 'block' : 'hidden'} md:flex transition-all ease-in duration-500`}>
            <ul className="md:flex md:items-center md:space-x-3">
                {children}
            </ul>
        </nav>
    );
}
