// hooks/useUser.ts
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

interface User {
  id: number;
  fullName?: string;
  email?: string;
  salary?: number;
}

export function useUser() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const decoded: any = jwtDecode(token);

      setUser({
        id: decoded.id,
        fullName: decoded.fullName,
        email: decoded.email,
        salary: decoded.salary || 0,
      });
    } catch (error) {
      console.error("Erro ao decodificar token:", error);
    }
  }, []);

  return user;
}
