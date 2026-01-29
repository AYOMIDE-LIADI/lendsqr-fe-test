import type { ReactNode } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { X } from "lucide-react"; 

import brief from "../../assets/images/briefcase 1.svg";
import home from "../../assets/images/home 1.svg";
import userp from "../../assets/images/user-friends 1.svg";
import users1 from "../../assets/images/users 1.svg";
import sack from "../../assets/images/sack 1.svg";
import shake from "../../assets/images/handshake-regular 1.svg";
import piggy from "../../assets/images/piggy-bank 1.svg";
import group from "../../assets/images/Group 104.svg";
import check from "../../assets/images/user-check 1.svg";
import times from "../../assets/images/user-times 1.svg";
import bank from "../../assets/images/np_bank_148501_000000 1.svg";
import coin from "../../assets/images/coins-solid 1.svg";
import trans from "../../assets/images/iconx.svg";
import galaxy from "../../assets/images/galaxy 1.svg";
import cog from "../../assets/images/user-cog 1.svg";
import scroll from "../../assets/images/scroll 1.svg";
import bar from "../../assets/images/chart-bar 2.svg";
import slide from "../../assets/images/sliders-h 1.svg";
import badge from "../../assets/images/badge-percent 1.svg";
import clip from "../../assets/images/clipboard-list 1.svg";
import tire from "../../assets/images/tire 1.svg";
import img from "../../assets/images/np_next_2236826_000000 2.svg";
import out from "../../assets/images/sign-out 1.svg";

import "./Sidebar.scss";

interface SidebarItem {
  name: string;
  icon: string | ReactNode;
  path?: string;
}


interface SidebarProps {
  onLogout: () => void;
  onClose?: () => void; 
}

const Sidebar = ({ onLogout, onClose }: SidebarProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  const customers: SidebarItem[] = [
    { name: "Users", icon: userp, path: "/users" },
    { name: "Guarantors", icon: users1 },
    { name: "Loans", icon: sack },
    { name: "Decision Models", icon: shake },
    { name: "Savings", icon: piggy },
    { name: "Loan Requests", icon: group },
    { name: "Whitelist", icon: check },
    { name: "Karma", icon: times },
  ];

  const businesses: SidebarItem[] = [
    { name: "Organization", icon: brief },
    { name: "Loan Products", icon: group },
    { name: "Savings Products", icon: bank },
    { name: "Fees and Charges", icon: coin },
    { name: "Transaction", icon: trans },
    { name: "Services", icon: galaxy },
    { name: "Service Account", icon: cog },
    { name: "Settlements", icon: scroll },
    { name: "Reports", icon: bar },
  ];

  const settings: SidebarItem[] = [
    { name: "Preferences", icon: slide },
    { name: "Fees and Pricing", icon: badge },
    { name: "Audit Logs", icon: clip },
    { name: "System Messages", icon: tire },
  ];

  const logout: SidebarItem[] = [{ name: "Logout", icon: out }];

  const isActive = (path?: string): boolean =>
    path ? location.pathname === path : false;

  const renderSidebarItems = (items: SidebarItem[]) =>
    items.map((item) => (
      <div
        key={item.name}
        className={`sidebar__item ${isActive(item.path) ? "active" : ""}`}
        onClick={() => {
          if (item.name === "Logout") {
            onLogout();
            return;
          }

          if (item.path) {
            navigate(item.path);
            onClose?.(); 
          }
        }}
        style={{
          cursor: item.path || item.name === "Logout" ? "pointer" : "default",
        }}
      >
        {typeof item.icon === "string" ? (
          <img src={item.icon} alt={item.name} className="sidebar__icon" />
        ) : (
          item.icon
        )}
        <span>{item.name}</span>
      </div>
    ));

  return (
    <aside className="sidebar">
      <button
        type="button"
        className="sidebar__close"
        onClick={onClose}
        aria-label="Close sidebar"
      >
        <X size={20} />
      </button>

      <div className="sidebar__switch">
        <img src={brief} alt="" />
        <span>Switch Organization</span>
        <img src={img} alt="switch icon" />
      </div>

      <div
        className="sidebar__item"
        onClick={() => {
          navigate("/dashboard");
          onClose?.();
        }}
        style={{ cursor: "pointer" }}
      >
        <img src={home} alt="" />
        <span>Dashboard</span>
      </div>

      <p className="sidebar__section">CUSTOMERS</p>
      {renderSidebarItems(customers)}

      <p className="sidebar__section">BUSINESSES</p>
      {renderSidebarItems(businesses)}

      <p className="sidebar__section">SETTINGS</p>
      {renderSidebarItems(settings)}

      <div className="last">{renderSidebarItems(logout)}</div>
    </aside>
  );
};

export default Sidebar;
