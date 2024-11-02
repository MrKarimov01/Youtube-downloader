import axios from "axios";

const config = {
    method: 'post',
    url: 'https://social-download-all-in-one.p.rapidapi.com/v1/social/autolink', // URLni o'zgartirdik
    headers: { 
        'x-rapidapi-key': '55cd9dca24msh3240afabb0e5cfdp16974cjsn05bd926bdee6', 
        'x-rapidapi-host': 'social-download-all-in-one.p.rapidapi.com', 
        'Content-Type': 'application/json'
    }
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
