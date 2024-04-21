
// api to get all new world news https://newsapi.org/v2/top-headlines?country=kr&apiKey=12d9979dc11c4b2a81a66ad9a9025cb2

import axios from "axios";

export async function getNewsWorld() {
    try {
        const response = await axios.get(
        `https://newsapi.org/v2/top-headlines?country=us&apiKey=12d9979dc11c4b2a81a66ad9a9025cb2`
        );
        return response.data.articles;
    } catch (error) {
        console.error("Error fetching news:", error);
        return null;
    }
}
