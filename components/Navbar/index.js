import Link from "next/link";
import { useRouter } from "next/router";
import Burger from "../Burger-Menu-Button";
import NavDrawer from "../Nav-Drawer";
import styles from "./navbar.module.css";

function NavLink({ linkText, path, isScrollLink }) {
    const router = useRouter();

    const isActive = (pathname) => (router ? router.pathname === pathname : false);

    const linkStyles = {
        borderBottom: isActive(path) ? "2px solid #000" : "none",
        cursor: "pointer",
    };

    const handleNavigation = (e, destination) => {
        e.preventDefault();

        if (router.pathname === "/" && destination.startsWith("#")) {
            history.pushState(null, null, destination);

            const id = destination.substring(1);
            const element = document.getElementById(id);
            if (element) {
                element.scrollIntoView({ behavior: "smooth" });
            }
        } else {
            router.push("/").then(() => {
                window.location.hash = destination;
            });
        }
    };

    return isScrollLink ? (
        <li style={linkStyles} onClick={(e) => handleNavigation(e, path)}>
            {linkText}
        </li>
    ) : (
        <li style={linkStyles}>
            <Link href={path}>{linkText}</Link>
        </li>
    );
}

export default function Navbar({
    isSmallScreen,
    setIsSmallScreen,
    isSmallerScreen,
    setIsSmallerScreen,
    setNavOpen,
    navOpen,
}) {
    return (
        <nav className={styles.navbar}>
            <h1>
                <Link href="/">The Wright Fence Co</Link>
            </h1>
            {isSmallScreen || isSmallerScreen ? (
                <Burger navOpen={navOpen} setNavOpen={setNavOpen} />
            ) : (
                <ul>
                    <NavLink linkText="About Us" path="/about" isScrollLink={false} />
                    <NavLink linkText="Fence Types" path="/fence-types" isScrollLink={false} />
                    <NavLink linkText="Contact" path="#contact" isScrollLink={true} />
                    <NavLink linkText="Services" path="#services" isScrollLink={true} />
                </ul>
            )}
            {navOpen && (
                <NavDrawer
                    isSmallScreen={isSmallScreen}
                    setIsSmallScreen={setIsSmallScreen}
                    setNavOpen={setNavOpen}
                    navOpen={navOpen}
                />
            )}
        </nav>
    );
}
