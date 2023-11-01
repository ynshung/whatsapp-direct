import { useEffect, useState } from "react";

export default function ThemeToggle() {
    const [theme, setTheme] = useState(
        localStorage.getItem("theme") ?? "light"
    );

    const handleClick = () => {
        setTheme(theme === "light" ? "dark" : "light");
    };

    useEffect(() => {
        // set html "data-theme" 
        if (theme === "dark") {
            document.documentElement.setAttribute("data-theme", "dark");
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.setAttribute("data-theme", "light");
            document.documentElement.classList.remove("dark");
        }
        localStorage.setItem("theme", theme);
    }, [theme]);

    return (
        <div>
            <button
                onClick={handleClick}
                className="fixed bottom-6 right-6 bg-slate-800 dark:bg-slate-600 text-3xl p-2 rounded-full w-14 h-14 shadow-xl"
            >
                {theme === "light" ? "🌙" : "☀️"}
            </button>
        </div>
    );
}
