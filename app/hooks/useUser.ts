import { useState, useEffect } from "react";
import { UserData } from "@/app/types/userData";

export function useUser() {
  const [user, setUser] = useState<UserData | null>(null);

  useEffect(() => {
    async function loadUser() {
      const token = localStorage.getItem("token");
      if (!token) return;
      const res = await fetch("http://localhost:8080/users/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) setUser(await res.json());
    }
    loadUser();
  }, []);

  return { user };
}
