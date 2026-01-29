import { ReactNode, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../../components/Layout/Layout";
import GeneralDetails from "./GeneralDetails";
import EmptyState from "../../components/EmptyState/EmptyState";
import Counter from "../../components/Counter/Counter";

import avatar from "../../assets/images/avatar2.svg";
import back from "../../assets/images/np_back_3007750_000000 1.svg";
import star1 from "../../assets/images/np_star_1208084_000000 1.svg";
import star2 from "../../assets/images/np_star_1171151_000000 2.svg";

import "./UserDetails.scss";

const tabs = [
  "General Details",
  "Documents",
  "Bank Details",
  "Loans",
  "Savings",
  "App and System",
];

const UserDetails = () => {
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState<string>(tabs[0]);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
  const storedUser = localStorage.getItem("selectedUser");

  if (!storedUser) {
    navigate("/users");
    return;
  }

  try {
    setUser(JSON.parse(storedUser));
  } catch {
    localStorage.removeItem("selectedUser");
    navigate("/users");
  }
}, [navigate]);


    if (!user) {
      return (
        <Layout>
          <div className="details" style={{ padding: 30 }}>
            Loading user...
          </div>
        </Layout>
      );
    }

  const tabContent: Record<string, ReactNode> = {
    "General Details": <GeneralDetails user={user} />,

    "Documents": (
      <EmptyState
        title="No documents available"
        description="This user has not uploaded any documents yet."
      />
    ),

    "Bank Details": (
      <EmptyState
        title="No bank details found"
        description="Bank information has not been added."
      />
    ),

    "Loans": (
      <EmptyState
        title="No loans"
        description="This user has no loan records."
      />
    ),

    "Savings": (
      <EmptyState
        title="No savings records"
        description="This user has no savings activity."
      />
    ),

    "App and System": (
      <EmptyState
        title="No app activity"
        description="No system or app data available."
      />
    ),
  };

  return (
    <Layout>
      <div className="details">
        <div className="back-holder" onClick={() => navigate("/users")}>
          <img src={back} alt="Back" />
          <p className="back">Back to Users</p>
        </div>

        <div className="sub-holder">
          <p className="sub">User Details</p>
          <div className="control">
            <button className="blacklist">BLACKLIST USER</button>
            <button className="activate">ACTIVATE USER</button>
          </div>
        </div>

        <div className="profile-holder">
          <div className="profile">
            <img src={avatar} alt="User Avatar" />

            <div className="user-info">
              <p className="name">{user.username}</p>
              <p className="name2">{user.id}</p>
            </div>

            <div className="divider">
              <span>User’s Tier</span>
              <div className="star">
                <img src={star1} alt="" />
                <img src={star2} alt="" />
                <img src={star2} alt="" />
              </div>
            </div>

            <div className="account">
              <p className="cash">
                <Counter end={Number(user.accountBalance ?? 0)} />
              </p>
              <p className="bank">
                {user.accountNumber ?? "9912345678"} / {user.BankName ?? "N/A"}
              </p>
            </div>
          </div>

          <div className="tabs">
            {tabs.map((tab) => (
              <div
                key={tab}
                className={`tab-item ${activeTab === tab ? "active" : ""}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </div>
            ))}
          </div>
        </div>

        <div className="profile-holder">
          {tabContent[activeTab]}
        </div>
      </div>
    </Layout>
  );
};

export default UserDetails;
