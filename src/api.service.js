import axios from "axios";
const apiUrl = import.meta.env.VITE_API_URL;
const appHeader = JSON.parse(import.meta.env.VITE_APP_HEADER);


const config = {
    method: 'post',
    url: apiUrl, // URLni o'zgartirdik
    headers: appHeader
};

export const ApiService = {
    async fetching(url) {
        const data = JSON.stringify({ url }); // JSON formatida ma'lumot yaratish
        try {
            const response = await axios.post(config.url, data, { headers: config.headers });
            return response.data; // Faqat data qismi qaytariladi
        } catch (error) {
            console.error("API chaqiruvida xato:", error);
            throw error; // Xatoni qaytarish
        }
    }
};
