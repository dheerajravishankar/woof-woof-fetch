import { api } from "./api";

async function login(name, email) {
  try {
    const res = await api.post("/auth/login", { name, email });
    return res;
  } catch (e) {
    throw new Error(e);
  }
}

async function logout() {
  try {
    await api.post("/auth/logout");
  } catch (e) {
    throw new Error(e);
  }
}

export { login, logout };
