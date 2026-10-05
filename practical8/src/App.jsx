import { lazy, Suspense, useEffect, useState } from "react";

import Home from "./pages/Home";
import "./App.css";

const Projects = lazy(() => import("./pages/Projects"));
const Contact = lazy(() => import("./pages/Contact"));

function App() {
    const [path, setPath] = useState(window.location.pathname);

    useEffect(() => {
        const handleNavigation = () => setPath(window.location.pathname);
        window.addEventListener("popstate", handleNavigation);

        return () => window.removeEventListener("popstate", handleNavigation);
    }, []);

    const navigate = (event, destination) => {
        event.preventDefault();
        window.history.pushState({}, "", destination);
        setPath(destination);
    };

    const page = path === "/projects" ? <Projects />
        : path === "/contact" ? <Contact />
            : <Home />;

    return (
        <>
            <header className="navbar">
                <div className="navbar-container">
                    <a className="brand" href="/" onClick={(event) => navigate(event, "/")}>
                        <span className="brand-mark">P</span>
                        <span>Planwise</span>
                    </a>

                    <nav className="nav-links" aria-label="Main navigation">
                        <a className={path === "/" ? "active" : ""} href="/" onClick={(event) => navigate(event, "/")}>Workspace</a>
                        <a className={path === "/projects" ? "active" : ""} href="/projects" onClick={(event) => navigate(event, "/projects")}>Projects</a>
                        <a className={path === "/contact" ? "active" : ""} href="/contact" onClick={(event) => navigate(event, "/contact")}>Contact</a>
                    </nav>
                </div>
            </header>

            <Suspense fallback={<div className="loading-page"><div className="spinner" /><p>Preparing your workspace...</p></div>}>
                {page}
            </Suspense>
        </>
    );
}

export default App;
