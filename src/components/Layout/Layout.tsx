import { ReactNode, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";
import Navbar from "../Navbar/Navbar";
import "./Layout.scss";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const navigate = useNavigate();

  const [isLogoutOpen, setIsLogoutOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen((v) => !v);
  const closeSidebar = () => setIsSidebarOpen(false);

  const openLogoutModal = () => {
    setIsLogoutOpen(true);
  };

  const closeLogoutModal = () => {
    setIsLogoutOpen(false);
  };

  const handleConfirmLogout = () => {
    setIsLogoutOpen(false);
    navigate("/");
  };

  return (
    <div className="layout-container">
      <Navbar onToggleSidebar={toggleSidebar} />

      <div className="layout-body">
        {isSidebarOpen && (
          <div className="sidebar-overlay" onClick={closeSidebar} />
        )}

        <aside className={`sidebar-wrapper ${isSidebarOpen ? "open" : ""}`}>
          <Sidebar onLogout={openLogoutModal} onClose={closeSidebar} />
        </aside>

        <div className="layout-content" onClick={closeSidebar}>
          {children}
        </div>
      </div>

      {isLogoutOpen && (
        <div className="logout-modal-backdrop">
          <div className="logout-modal">
            <p className="logout-modal__text">Are you sure you want to logout?</p>
            <div className="logout-modal__actions">
              <button
                type="button"
                className="logout-modal__btn logout-modal__btn--cancel"
                onClick={closeLogoutModal}
              >
                No
              </button>

              <button
                type="button"
                className="logout-modal__btn logout-modal__btn--confirm"
                onClick={handleConfirmLogout}
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Layout;
