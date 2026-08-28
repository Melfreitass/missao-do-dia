import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Chave única utilizada para salvar as missões no armazenamento local do aparelho.
 */
const STORAGE_KEY = '@missao_do_dia:missions';

/**
 * Busca todas as missões salvas no AsyncStorage.
 * @returns {Promise<Array>} Lista de missões ou array vazio.
 */
export async function getMissions() {
  try {
    const jsonValue = await AsyncStorage.getItem(STORAGE_KEY);
    if (jsonValue !== null) {
      return JSON.parse(jsonValue);
    }
    return [];
  } catch (error) {
    console.error('Erro ao ler missões do AsyncStorage:', error);
    throw new Error('Não foi possível carregar as missões salvas.');
  }
}

/**
 * Salva a lista completa de missões no AsyncStorage.
 * @param {Array} missions - Lista de objetos de missão.
 * @returns {Promise<void>}
 */
export async function saveMissions(missions) {
  try {
    const jsonValue = JSON.stringify(missions);
    await AsyncStorage.setItem(STORAGE_KEY, jsonValue);
  } catch (error) {
    console.error('Erro ao salvar missões no AsyncStorage:', error);
    throw new Error('Não foi possível salvar as alterações no armazenamento.');
  }
}

/**
 * Remove todas as missões do AsyncStorage (útil para testes e reset).
 * @returns {Promise<void>}
 */
export async function clearAllMissions() {
  try {
    await AsyncStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('Erro ao limpar missões do AsyncStorage:', error);
    throw new Error('Não foi possível limpar o armazenamento.');
  }
}

//FIM
