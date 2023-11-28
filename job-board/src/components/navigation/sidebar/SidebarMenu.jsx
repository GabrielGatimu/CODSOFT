export default function SidebarMenu({children, isMenuOpen}) {
    return (
        <ul className={`flex flex-col items-center gap-y-4 text-stone-950 transition-all ease-in-out duration-500`}>
            {children}
        </ul>
    );
}
