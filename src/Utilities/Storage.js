import AsyncStorage from '@react-native-async-storage/async-storage';

export async function storeData(key, value) {
    try {
        await AsyncStorage.setItem(
            key,
            value
        );
        return true
    } catch (error) {
        return false;
    }
}

export async function getData(key) {
    try {
        const value = await AsyncStorage.getItem(key);
        return JSON.parse(value);
    } catch (error) {
        return [];
    }
}
const storage = {
    storeData, getData
}
export default storage