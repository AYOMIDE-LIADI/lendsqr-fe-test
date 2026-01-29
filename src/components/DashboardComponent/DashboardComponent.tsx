import type { FC } from "react";
import { useState, useEffect, useMemo, useRef } from "react";
import { useNavigate } from "react-router-dom";
import icon from "../../assets/images/icon.svg";
import icon1 from "../../assets/images/icon (1).svg";
import icon2 from "../../assets/images/icon (2).svg";
import icon3 from "../../assets/images/icon (3).svg";
import dot from "../../assets/images/ic-more-vert-18px.svg";
import filter from "../../assets/images/filter-results-button.svg";
import eye from "../../assets/images/np_view_1214519_000000 1.svg";
import dele from "../../assets/images/np_delete-friend_3248001_000000 1.svg";
import activate from "../../assets/images/np_user_2995993_000000 1.svg";
import LoadingSpinner from "../Loader/Loader";
import type {User, UserStatus} from "../../types"
import Pagination from "../Pagination/Pagination";
import "./DashboardComponent.scss";


interface DashboardHeaderProps {
  users: User[];
  loading: boolean;
  usersCount: number;
  activeUsersCount: number;
  loansCount: number;
  savingsCount: number;
  pageSize?: number;
  showUserDiv?: boolean;
}


interface UsersFilterValues {
  organization: string;
  username: string;
  email: string;
  date: string;
  phone: string;
  status: "" | UserStatus;
}

const DashboardHeader: FC<DashboardHeaderProps> = ({
  users,
  loading,
  usersCount,
  activeUsersCount,
  loansCount,
  savingsCount,
  pageSize = 10,
  showUserDiv = false,
}) => {

  const navigate = useNavigate();
  const menuRef = useRef<HTMLDivElement | null>(null);
  const filterRef = useRef<HTMLDivElement | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);

  const [animatedUsers, setAnimatedUsers] = useState(0);
  const [animatedActiveUsers, setAnimatedActiveUsers] = useState(0);
  const [animatedLoans, setAnimatedLoans] = useState(0);
  const [animatedSavings, setAnimatedSavings] = useState(0);

  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const [filters, setFilters] = useState<UsersFilterValues>({
    organization: "",
    username: "",
    email: "",
    date: "",
    phone: "",
    status: "",
  });

  const [draftFilters, setDraftFilters] = useState<UsersFilterValues>({
    organization: "",
    username: "",
    email: "",
    date: "",
    phone: "",
    status: "",
  });

const isEmpty = !loading && users.length === 0;

  useEffect(() => {
    const duration = 1500;
    let start: number | null = null;

    const step = (timestamp: number) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);

      setAnimatedUsers(Math.floor(progress * usersCount));
      setAnimatedActiveUsers(Math.floor(progress * activeUsersCount));
      setAnimatedLoans(Math.floor(progress * loansCount));
      setAnimatedSavings(Math.floor(progress * savingsCount));

      if (progress < 1) requestAnimationFrame(step);
    };

    requestAnimationFrame(step);
  }, [usersCount, activeUsersCount, loansCount, savingsCount]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;

      if (menuRef.current && !menuRef.current.contains(target)) {
        setActiveMenuId(null);
      }

      if (filterRef.current && !filterRef.current.contains(target)) {
        setIsFilterOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const organizations = useMemo(() => {
    const set = new Set<string>();
    users.forEach((u) => {
      if (u.organization) set.add(u.organization);
    });
    return Array.from(set).sort((a, b) => a.localeCompare(b));
  }, [users]);

  const filteredUsers = useMemo(() => {
    if (!showUserDiv) return users;

    const org = filters.organization.trim().toLowerCase();
    const uname = filters.username.trim().toLowerCase();
    const mail = filters.email.trim().toLowerCase();
    const phone = filters.phone.trim().toLowerCase();
    const date = filters.date.trim();
    const status = filters.status;

    return users.filter((u) => {
      const matchOrg = !org || (u.organization ?? "").toLowerCase().includes(org);
      const matchUname = !uname || (u.username ?? "").toLowerCase().includes(uname);
      const matchMail = !mail || (u.email ?? "").toLowerCase().includes(mail);
      const matchPhone = !phone || (u.phone ?? "").toLowerCase().includes(phone);
      const matchStatus = !status || u.status === status;

      const matchDate =
        !date ||
        (() => {
          const apiDate = String(u.dateJoined ?? "");
          if (!apiDate) return false;
          const parsed = new Date(apiDate);
          if (Number.isNaN(parsed.getTime())) return apiDate.includes(date);
          const yyyy = parsed.getFullYear();
          const mm = String(parsed.getMonth() + 1).padStart(2, "0");
          const dd = String(parsed.getDate()).padStart(2, "0");
          return `${yyyy}-${mm}-${dd}` === date;
        })();

      return matchOrg && matchUname && matchMail && matchPhone && matchDate && matchStatus;
    });
  }, [users, filters, showUserDiv]);

  useEffect(() => {
    setCurrentPage(1);
  }, [filters]);

  const totalPages = Math.max(1, Math.ceil(filteredUsers.length / pageSize));
  const startIndex = (currentPage - 1) * pageSize;
  const paginatedUsers = filteredUsers.slice(startIndex, startIndex + pageSize);
  useEffect(() => {
  if (currentPage > totalPages) {
    setCurrentPage(totalPages);
  }
  }, [currentPage, totalPages]);

  const handleMenuAction = (action: string, user: User) => {
    if (action === "view") {
      localStorage.setItem("selectedUser", JSON.stringify(user));
      navigate(`/users/${user.id}`);
    }
    setActiveMenuId(null);
  };

  const openFilter = () => {
    if (!showUserDiv) return;
    setDraftFilters(filters);
    setIsFilterOpen((v) => !v);
  };

  const updateDraft =
    (key: keyof UsersFilterValues) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      setDraftFilters((prev) => ({ ...prev, [key]: e.target.value }));
    };

  const applyFilters = (e: React.FormEvent) => {
    e.preventDefault();
    setFilters(draftFilters);
    setIsFilterOpen(false);
  };

  const resetFilters = () => {
    const cleared: UsersFilterValues = {
      organization: "",
      username: "",
      email: "",
      date: "",
      phone: "",
      status: "",
    };
    setDraftFilters(cleared);
    setFilters(cleared);
    setIsFilterOpen(false);
  };

  

  return (
    <div className="dashboard">
      <h4>Users</h4>

      <div className="box-holders">
        <div className="box">
          <img src={icon} alt="" />
          <p className="text">USERS</p>
          <h4>{animatedUsers.toLocaleString()}</h4>
        </div>

        <div className="box">
          <img src={icon1} alt="" />
          <p className="text">ACTIVE USERS</p>
          <h4>{animatedActiveUsers.toLocaleString()}</h4>
        </div>

        <div className="box">
          <img src={icon2} alt="" />
          <p className="text">USERS WITH LOANS</p>
          <h4>{animatedLoans.toLocaleString()}</h4>
        </div>

        <div className="box">
          <img src={icon3} alt="" />
          <p className="text">USERS WITH SAVINGS</p>
          <h4>{animatedSavings.toLocaleString()}</h4>
        </div>
      </div>

      <div className="table-area">
        <div className="table-top">
          {showUserDiv && (
            <div className="table-filter-wrap" ref={filterRef}>
              {isFilterOpen && (
                <form className="users-filter" onSubmit={applyFilters}>
                  <div className="users-filter__field">
                    <label className="users-filter__label">Organization</label>
                    <div className="users-filter__control users-filter__control--select">
                      <select
                        className="users-filter__input"
                        value={draftFilters.organization}
                        onChange={updateDraft("organization")}
                      >
                        <option value="">Select</option>
                        {organizations.map((org) => (
                          <option key={org} value={org}>
                            {org}
                          </option>
                        ))}
                      </select>
                      <span className="users-filter__chevron" aria-hidden="true" />
                    </div>
                  </div>

                  <div className="users-filter__field">
                    <label className="users-filter__label">Username</label>
                    <div className="users-filter__control">
                      <input
                        className="users-filter__input"
                        value={draftFilters.username}
                        onChange={updateDraft("username")}
                        placeholder="User"
                        type="text"
                      />
                    </div>
                  </div>

                  <div className="users-filter__field">
                    <label className="users-filter__label">Email</label>
                    <div className="users-filter__control">
                      <input
                        className="users-filter__input"
                        value={draftFilters.email}
                        onChange={updateDraft("email")}
                        placeholder="Email"
                        type="email"
                      />
                    </div>
                  </div>

                  <div className="users-filter__field">
                    <label className="users-filter__label">Date</label>
                    <div className="users-filter__control users-filter__control--date">
                      <input
                        className="users-filter__input users-filter__input--date"
                        value={draftFilters.date}
                        onChange={updateDraft("date")}
                        type="date"
                      />
                      <span className="users-filter__calendar" aria-hidden="true" />
                    </div>
                  </div>

                  <div className="users-filter__field">
                    <label className="users-filter__label">Phone Number</label>
                    <div className="users-filter__control">
                      <input
                        className="users-filter__input"
                        value={draftFilters.phone}
                        onChange={updateDraft("phone")}
                        placeholder="Phone Number"
                        type="tel"
                      />
                    </div>
                  </div>

                  <div className="users-filter__field">
                    <label className="users-filter__label">Status</label>
                    <div className="users-filter__control users-filter__control--select">
                      <select
                        className="users-filter__input"
                        value={draftFilters.status}
                        onChange={updateDraft("status")}
                      >
                        <option value="">Select</option>
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                        <option value="Pending">Pending</option>
                        <option value="Blacklisted">Blacklisted</option>
                      </select>
                      <span className="users-filter__chevron" aria-hidden="true" />
                    </div>
                  </div>

                  <div className="users-filter__actions">
                    <button
                      type="button"
                      className="users-filter__btn users-filter__btn--ghost"
                      onClick={resetFilters}
                    >
                      Reset
                    </button>
                    <button type="submit" className="users-filter__btn users-filter__btn--primary">
                      Filter
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}
        </div>

        <div className="table">
          <div className="table-header-holder1">
            {[
              "ORGANIZATION",
              "USERNAME",
              "EMAIL",
              "PHONE NUMBER",
              "DATE JOINED",
              "STATUS",
            ].map((title) => (
              <div className="header" key={title}>
                <h6 className="header-text">{title}</h6>
                <img
                  src={filter}
                  alt=""
                  onClick={openFilter}
                  style={{ cursor: showUserDiv ? "pointer" : "default" }}
                />
              </div>
            ))}
          </div>

         {isEmpty ? (
  <div className="empty-state">
    <h4>No users available</h4>
    <p>We couldn’t load any users right now. Please try again later.</p>
  </div>
) : (
  !loading &&
  paginatedUsers.map((user) => (
    <div className="table-header-holder" key={user.id}>
      <span className="header-text">{user.organization}</span>
      <span className="header-text">{user.username}</span>
      <span className="header-text">{user.email}</span>
      <span className="header-text">{user.phone}</span>
      <span className="header-text">{user.dateJoined}</span>

      <div className={`status status--${user.status.toLowerCase()}`}>
        <p className="header-text">{user.status}</p>
      </div>

      <div className="actions-wrapper">
        <img
          src={dot}
          alt="menu"
          onClick={() =>
            setActiveMenuId(activeMenuId === String(user.id) ? null : String(user.id))
          }
        />
        {activeMenuId === String(user.id) && (
  <div className="actions-menu" ref={menuRef}>
    <button
      className="modal"
      onClick={() => handleMenuAction("view", user)}
    >
      <img src={eye} alt="" />
      View Details
    </button>

    <button
      className={`modal ${
        user.status === "Blacklisted" ? "modal--disabled" : ""
      }`}
      disabled={user.status === "Blacklisted"}
      onClick={() => {
        if (user.status !== "Blacklisted") {
        }
      }}
    >
      <img src={dele} alt="" />
      Blacklist User
    </button>

    <button
      className={`modal ${
        user.status === "Active" ? "modal--disabled" : ""
      }`}
      disabled={user.status === "Active"}
      onClick={() => {
        if (user.status !== "Active") {
        }
      }}
    >
      <img src={activate} alt="" />
      Activate User
    </button>
  </div>
)}

      </div>
    </div>
  ))
)}


          {loading && (
            <div className="loader-wrapper">
              <LoadingSpinner />
            </div>
          )}
        </div>
      </div>

      {!isEmpty && (
  <Pagination
    currentPage={currentPage}
    totalPages={totalPages}
    onPageChange={setCurrentPage}
    pageCount={paginatedUsers.length}
    totalCount={users.length}
  />
)}


    </div>
  );
};

export default DashboardHeader;
