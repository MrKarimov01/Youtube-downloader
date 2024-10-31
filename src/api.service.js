import axios from "axios";

let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url : "https://Video-Downloader.proxy-production.allthingsdev.co/instagram/download?url=https://www.instagram.com/reel/CmfpggwK5cp/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
    headers: { 
       'x-apihub-key': 'wsyj2rcxP5PSBzQI849Vdt5yepSnoushyMABuRQwfCYzztF8uX', 
       'x-apihub-host': 'Video-Downloader.allthingsdev.co', 
       'x-apihub-endpoint': '61cd9229-ed75-4f09-84ed-5da30e4881be'
    }
 };
 



export const ApiService = {
    async fetching(){
        const response = await axios.get(config)
        return response
    }
}