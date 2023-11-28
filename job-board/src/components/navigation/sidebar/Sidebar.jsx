import useAuth from "../../../hooks/useAuth.js";
import { Navigate } from "react-router-dom";
import SidebarMenu from "./SidebarMenu.jsx";
import SidebarItem from "./SidebarItem.jsx";
import useActiveLink from "../../../hooks/useActiveLink.js";
import { useState } from "react";

const sidebarConfig = {
    admin: [
        { href: "/dashboard", label: "Dashboard" },
        { href: "/my-jobs", label: "Posted Jobs" },
        { href: "/notifications", label: "Notifications" },
        { href: "/profile", label: "Profile" },
    ],
    USER: [
        { href: "/dashboard", label: "Dashboard" },
        { href: "/applications", label: "Applications" },
        { href: "/notifications", label: "Notifications" },
        { href: "/profile", label: "Profile" },
    ],
};

export default function Sidebar() {
    const { userInfo, signOut } = useAuth();
    const parentLink = useActiveLink();
    const [activeLink, setActiveLink] = useState(parentLink);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleMenuItemClick = (href) => {
        setActiveLink(href);
        if (isMenuOpen) {
            toggleMenu();
        }
    };

    const getSidebarItems = () => {
        if (userInfo && sidebarConfig[userInfo.userRole]) {
            return sidebarConfig[userInfo.userRole].map((item) => (
                <SidebarItem
                    key={item.href}
                    href={item.href}
                    onClick={() => handleMenuItemClick(item.href)}
                >
                    {item.label}
                </SidebarItem>
            ));
        }
        return null;
    };

    if (userInfo && sidebarConfig[userInfo.userRole]) {
        return (
            <div className={`h-${isMenuOpen ? "full" : "[calc(100vh-0rem)]"}`}>
                <SidebarMenu isMenuOpen={isMenuOpen}>{getSidebarItems()}</SidebarMenu>
            </div>
        );
    } else {
        return <Navigate to={"/signin"} />;
    }
}
