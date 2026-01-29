import type { User } from "../types";

const BASE_URL = import.meta.env.VITE_MOCKAROO_API_URL;
const API_KEY = import.meta.env.VITE_MOCKAROO_API_KEY;

const API_URL = `${BASE_URL}?count=500&key=${API_KEY}`;

export const fetchUsers500 = async (): Promise<User[]> => {
  try {
    const res = await fetch(API_URL);

    if (!res.ok) {
      throw new Error(`Failed to fetch users: ${res.status}`);
    }

    const data: User[] = await res.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch users:", error);
    return [];
  }
};
