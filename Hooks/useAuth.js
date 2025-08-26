import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const API_URL = "http://192.168.0.102:8080";

export default function useAuth() {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  // Login
  const login = async (email, password) => {
    const res = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) throw new Error("Credenciais inválidas");

    const data = await res.json();
    setToken(data.accessToken);
    await AsyncStorage.setItem("token", data.accessToken);

    const userData = await getCurrentUser(data.accessToken);
    setUser(userData);

    // 🔹 Log aqui garante que já existe token e usuário
    console.log("=== Login realizado ===");
    console.log("Token:", data.accessToken);
    console.log("Usuário:", userData);

    return userData;
  };

  // Registro
  const register = async (email, password) => {
    const res = await fetch(`${API_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) throw new Error("Erro ao registrar");

    const registeredUser = await res.json();

    // 🔹 Log para registro
    console.log("=== Registro realizado ===");
    console.log("Usuário registrado:", registeredUser);

    return registeredUser;
  };

  // Pegar usuário logado
  const getCurrentUser = async (jwt) => {
    const res = await fetch(`${API_URL}/auth/me`, {
      headers: { Authorization: `Bearer ${jwt || token}` },
    });

    if (!res.ok) throw new Error("Erro ao buscar usuário");
    const userData = await res.json();
    setUser(userData);
    return userData;
  };

  // Logout
  const logout = async () => {
    setUser(null);
    setToken(null);
    await AsyncStorage.removeItem("token");
    console.log("Usuário deslogado");
  };

  return { user, token, login, register, logout, getCurrentUser };
}
