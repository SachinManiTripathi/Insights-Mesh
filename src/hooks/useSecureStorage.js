import CryptoJS from 'crypto-js';

const KEY = import.meta.env.VITE_SECURE_STORAGE_KEY;;

export default function useSecureStorage(key, initial) {
    const read = () => {
        try {
            const raw = localStorage.getItem(key);
            if (!raw) return initial;
            const bytes = CryptoJS.AES.decrypt(raw, KEY);
            return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
        } catch {
            return initial;
        }
    }

    let state = read();
    const setValue = (value) => {
        state = typeof value === 'function' ? value(state) : value;
        localStorage.setItem(key, CryptoJS.AES.encrypt(JSON.stringify(state), KEY).toString());
    }

    return [state, setValue];
}