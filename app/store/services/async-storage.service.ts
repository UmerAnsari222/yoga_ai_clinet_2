import AsyncStorage from '@react-native-async-storage/async-storage';

const storeToken = async (value: string) => {
  console.log('storeToken', value);
  try {
    await AsyncStorage.setItem('token', value);
  } catch (error) {
    console.log(error);
  }
};

const getToken = async () => {
  try {
    const token = await AsyncStorage.getItem('token');
    if (token !== null) {
      return token;
    }
  } catch (error) {
    console.log(error);
  }
};

const removeToken = async () => {
  try {
    await AsyncStorage.clear();
  } catch (error) {
    console.log(error);
  }
};

export {storeToken, getToken, removeToken};
