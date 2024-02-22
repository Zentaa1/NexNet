import { NN_BASE, NN_AUTH, NN_LOGIN } from './constants.js'; 
import { save } from './storage/save.js';

export async function login(email, password) {
    const response = await fetch(NN_BASE + NN_AUTH + NN_LOGIN, {
        headers: {
            "Content-Type": "application/json"
        },
        method: "POST",
        body: JSON.stringify({ email, password })
    });

    if (response.ok) {
        const responseData = await response.json();

        const { accessToken, ...profile } = responseData.data;

        save("token", accessToken);
        save("profile", profile);
        return profile;
    }

    throw new Error("Count not login!")
}