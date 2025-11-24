import AsyncStorage from '@react-native-async-storage/async-storage';

// ⚠️ Para emulador Android Studio use: 10.0.2.2
// ⚠️ Para celular físico use: 10.0.0.183
const API_URL = 'http://10.0.0.183:8080/ciclos';

/**
 * Verifica se o usuário já possui dados menstruais cadastrados
 * Usa o endpoint /listar que já existe no backend
 * @returns {Promise<boolean>} - true se tem dados, false se não tem
 */
export async function verificarDadosMenstruais() {
  try {
    const token = await AsyncStorage.getItem('@lunna:token');
    
    if (!token) {
      console.log('❌ Token não encontrado');
      return false;
    }

    console.log('🔍 Verificando dados menstruais...');

    const response = await fetch(`${API_URL}/listar`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      console.log('⚠️ Erro ao verificar dados:', response.status);
      return false;
    }

    const data = await response.json();
    console.log('✅ Dados retornados:', data);
    
    // Se o array está vazio, não tem dados
    // Se tem dados, retorna true
    return Array.isArray(data) && data.length > 0;
    
  } catch (error) {
    console.error('❌ Erro ao verificar dados menstruais:', error);
    return false;
  }
}

/**
 * Envia os dados menstruais para o backend
 * @param {Object} dadosMenstruais - Objeto com todos os dados do ciclo
 * @returns {Promise<Object>} - Dados salvos do backend
 */
export async function criarDadosMenstruais(dadosMenstruais) {
  try {
    const token = await AsyncStorage.getItem('@lunna:token');
    
    console.log('🔑 Token encontrado:', token ? 'SIM' : 'NÃO');
    
    if (!token) {
      throw new Error('Usuário não autenticado. Faça login novamente.');
    }

    console.log('📤 URL:', `${API_URL}/criar`);
    console.log('📤 Body:', JSON.stringify(dadosMenstruais, null, 2));

    const response = await fetch(`${API_URL}/criar`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(dadosMenstruais),
    });

    console.log('📥 Status:', response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ Erro do servidor:', errorText);
      
      if (response.status === 403 || response.status === 401) {
        console.log('⚠️ Token inválido. Por favor, faça login novamente.');
        await AsyncStorage.removeItem('@lunna:token');
        await AsyncStorage.removeItem('@lunna:user');
        throw new Error('Sessão expirada. Faça login novamente.');
      }
      
      throw new Error(errorText || 'Erro ao salvar dados menstruais');
    }

    const data = await response.json();
    console.log('✅ Dados salvos com sucesso:', data);
    return data;
    
  } catch (error) {
    console.error('❌ Erro ao criar dados menstruais:', error);
    throw error;
  }
}

/**
 * Formata uma data do JavaScript para o formato LocalDate do Java (YYYY-MM-DD)
 * @param {Date} date - Data JavaScript
 * @returns {string} - Data no formato "YYYY-MM-DD"
 */
export function formatarDataParaBackend(date) {
  if (!date) return null;
  
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  
  return `${year}-${month}-${day}`;
}