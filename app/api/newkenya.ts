import axios from "axios";

export async function getNewsKenya() {
    const options = {
        method: "GET",
        url: "https://kenyan-news-api.p.rapidapi.com/news/English",
        headers: {
            "X-RapidAPI-Key": "a89830ca15mshcaf4cfe70a69c43p11ddffjsn831022ce9a74",
            "X-RapidAPI-Host": "kenyan-news-api.p.rapidapi.com",
        },
    };

    try {
        const response = await (await axios.request(options));
        return response.data;
        
    } catch (error) {
        console.error(error);
    }
}
