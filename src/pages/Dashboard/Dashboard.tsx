import { useEffect, useMemo, useState } from "react";
import Layout from "../../components/Layout/Layout";
import DashboardHeader from "../../components/DashboardComponent/DashboardComponent";
import type { User } from "../../types";
import { fetchUsers500 } from "../../api/usersApi";

const Dashboard: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        setLoading(true);

        const data = await fetchUsers500();
        const normalizedUsers: User[] = Array.isArray(data) ? data : [];

        setUsers(normalizedUsers);
      } catch (error) {
        console.error("Failed to load users:", error);
        setUsers([]);
      } finally {
        setLoading(false);
      }
    };

    loadUsers();
  }, []);

  const usersCount = users.length;

  const activeUsersCount = useMemo(
    () => users.filter((u) => u.status === "Active").length,
    [users]
  );

  const loansCount = useMemo(
    () => users.reduce((sum, u) => sum + (u.loansCount ?? 0), 0),
    [users]
  );

  const savingsCount = useMemo(
    () => users.reduce((sum, u) => sum + (u.savingsCount ?? 0), 0),
    [users]
  );

  return (
    <Layout>
      <DashboardHeader
        users={users}
        loading={loading}
        usersCount={usersCount}
        activeUsersCount={activeUsersCount}
        loansCount={loansCount}
        savingsCount={savingsCount}
      />
    </Layout>
  );
};

export default Dashboard;
