"use server";
export interface RegisterResponse {
  user: {
    id: number;
    fullName: string;
    email: string;
  };
}

export async function register(
  email: string,
  fullName: string,
  password: string
): Promise<RegisterResponse> {
  const res = await fetch("http://localhost:8080/auth/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password, fullName }),
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error("Create user failed");
  }

  return res.json();
}
