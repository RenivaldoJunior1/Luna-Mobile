import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// ⚠️ Para emulador Android Studio use: 10.0.2.2
// ⚠️ Para celular físico use: 10.0.0.183
const API_URL = 'http://10.0.0.183:8080/auth';

export default function useAuth() {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  // Carrega dados salvos ao iniciar
  useEffect(() => {
    loadStorageData();
  }, []);

  async function loadStorageData() {
    try {
      const storedToken = await AsyncStorage.getItem('@lunna:token');
      const storedUser = await AsyncStorage.getItem('@lunna:user');

      if (storedToken && storedUser) {
        setToken(storedToken);
        setUser(JSON.parse(storedUser));
        console.log('✅ Dados carregados do storage');
      }
    } catch (error) {
      console.error('❌ Erro ao carregar storage:', error);
    }
  }

  async function register(email, senha, nome, apelido) {
    try {
      const response = await fetch(`${API_URL}/registrar`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          nome,
          apelido,
          email, 
          senha 
        }),
      });

      if (!response.ok) {
        const error = await response.text();
        throw new Error(error || 'Erro ao registrar');
      }

      const data = await response.json();
      console.log('✅ Registro bem-sucedido:', data);
      return data;
    } catch (error) {
      console.error('❌ Erro no registro:', error);
      throw error;
    }
  }

  async function login(email, senha) {
    try {
      const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, senha }),
      });

      if (!response.ok) {
        const error = await response.text();
        throw new Error(error || 'Credenciais inválidas');
      }

      const data = await response.json();
      const { token: newToken, email: userEmail, cargo } = data;

      const userData = { email: userEmail, cargo };

      // Salva no AsyncStorage
      await AsyncStorage.setItem('@lunna:token', newToken);
      await AsyncStorage.setItem('@lunna:user', JSON.stringify(userData));

      // Atualiza estado
      setToken(newToken);
      setUser(userData);

      console.log('✅ Login bem-sucedido');
      console.log('Token:', newToken);
      console.log('User:', userData);

      return userData;
    } catch (error) {
      console.error('❌ Erro no login:', error);
      throw error;
    }
  }

  async function logout() {
    await AsyncStorage.removeItem('@lunna:token');
    await AsyncStorage.removeItem('@lunna:user');
    setToken(null);
    setUser(null);
    console.log('✅ Logout realizado');
  }

  return {
    user,
    token,
    signed: !!user,
    login,
    register,
    logout,
  };
}