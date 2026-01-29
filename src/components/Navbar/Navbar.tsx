import { useEffect, useState } from "react";
import "./Navbar.scss";

import logo from "../../assets/images/Group.svg";
import avatar from "../../assets/images/avatar.svg";
import vector from "../../assets/images/Vector.svg";
import noti from "../../assets/images/np_notification_2425223_000000 1.svg";
import { Search, Moon, Sun, Menu } from "lucide-react";

type Theme = "light" | "dark";

type NavbarProps = {
  onToggleSidebar: () => void;
};

const Navbar: React.FC<NavbarProps> = ({ onToggleSidebar }) => {
  const [theme, setTheme] = useState<Theme>("light");

  const applyTheme = (mode: Theme) => {
    document.documentElement.setAttribute("data-theme", mode);
    localStorage.setItem("theme", mode);
  };

  const toggleTheme = () => {
    const nextTheme: Theme = theme === "light" ? "dark" : "light";
    setTheme(nextTheme);
    applyTheme(nextTheme);
  };

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme") as Theme | null;

    if (storedTheme) {
      setTheme(storedTheme);
      applyTheme(storedTheme);
      return;
    }

    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const systemTheme: Theme = prefersDark ? "dark" : "light";
    setTheme(systemTheme);
    applyTheme(systemTheme);
  }, []);

  return (
    <header className="navbar">
      <img src={logo} alt="Logo" className="navbar__logo" />

      {/* ✅ Mobile/Tablet: only logo + burger */}
      <button
        type="button"
        className="burger"
        onClick={onToggleSidebar}
        aria-label="Toggle sidebar"
      >
        <Menu size={22} />
      </button>

      {/* ✅ Desktop only */}
      <div className="arrange">
        <div className="search-container">
          <input
            className="search-input"
            type="text"
            placeholder="Search for anything"
          />
          <button className="search-holder" type="button">
            <Search className="search-icon" size={16} />
          </button>
        </div>

        <div className="icon-holder">
          <p className="doc">Docs</p>
          <img src={noti} alt="Notifications" />

          <div className="avatar-holder">
            <img src={avatar} alt="User avatar" />
            <p className="name-holder">Adedeji</p>
            <img src={vector} alt="Dropdown" />
          </div>

          <button
            type="button"
            onClick={toggleTheme}
            className="theme-toggle"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
