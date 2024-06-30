import AsyncStorage from '@react-native-async-storage/async-storage';

export const useStorage = () => {
  const getItem = async (key) => {
    try {
      const passwords = await AsyncStorage.getItem(key);
      return JSON.parse(passwords) || [];
    } catch (e) {
      console.log('Erro ao buscar: ', e);
      return [];
    }
  };

  const saveItem = async (key, value) => {
    try {
      let passowords = await getItem(key);
      passowords.push(value);

      await AsyncStorage.setItem(key, JSON.stringify(passowords));
    } catch (e) {
      console.log('Erro ao salvar: ', e);
    }
  };

  const removeItem = async (key, item) => {
    try {
      let passowords = await getItem(key);
      let myPasswords = passowords.filter((password) => {
        return password != item;
      });

      await AsyncStorage.setItem(key, JSON.stringify(myPasswords));
      return myPasswords;
    } catch (e) {
      console.log('Erro ao deletar: ', e);
    }
  };

  return { getItem, saveItem, removeItem };
};
