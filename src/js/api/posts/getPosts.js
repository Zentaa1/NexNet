import { API_KEY, NN_BASE, NN_POSTS } from "../constants.js";
import { load } from "../storage/load.js";

export async function getPosts() {
    const response = await fetch(NN_BASE + NN_POSTS, {
        headers: {
            Authorization: `Bearer ${load("token")}`,
            "X-Noroff-API-Key": API_KEY
        }
    });

    if (response.ok) {
        const responseData = await response.json();
        console.log(responseData);
        return responseData;
    }

    throw new Error("Failed to fetch Posts!");
}