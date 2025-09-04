"use server";
export interface LoginResponse {
  token: string;
  user: {
    id: number;
    name: string;
    email: string;
  };
}

export async function login(
  email: string,
  password: string
): Promise<LoginResponse> {
  const res = await fetch("http://localhost:8080/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error("Falha ao fazer login");
  }

  return res.json();
}
