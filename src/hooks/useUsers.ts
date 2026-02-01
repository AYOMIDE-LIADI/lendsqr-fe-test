import { useEffect, useMemo, useState } from "react";
import type { User } from "../types";
import { fetchUsers500 } from "../api/usersApi";

export const useUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        setLoading(true);
        const data = await fetchUsers500();
        setUsers(Array.isArray(data) ? data : []);
      } finally {
        setLoading(false);
      }
    };
    loadUsers();
  }, []);

  const usersCount = users.length;

  const activeUsersCount = useMemo(
    () => users.filter(u => String(u.status) === "Active").length,
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

  return {
    users,
    loading,
    usersCount,
    activeUsersCount,
    loansCount,
    savingsCount,
  };
};
