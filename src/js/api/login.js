/**
 * Logs in a user using the provided email and password.
 * Saves the access token and user profile to local storage upon successful login.
 * @param {string} email - The email of the user.
 * @param {string} password - The password of the user.
 * @returns {Promise<Object>} The user profile information.
 * @throws {Error} If login fails.
 */
export async function login(email, password) {
    try {
        // Send a login request to the server
        const response = await fetch(NN_BASE + NN_AUTH + NN_LOGIN, {
            headers: {
                "Content-Type": "application/json"
            },
            method: "POST",
            body: JSON.stringify({ email, password })
        });

        // Check if the response is successful
        if (response.ok) {
            // Extract the data from the response
            const responseData = await response.json();

            // Extract the access token and user profile from the data
            const { accessToken, ...profile } = responseData.data;

            // Save the access token and user profile to local storage
            save("token", accessToken);
            save("profile", profile);

            // Return the user profile
            return profile;
        } else {
            // If login fails, throw an error
            throw new Error("Could not login!");
        }
    } catch (error) {
        // Catch any errors that occur during the login process
        throw new Error("An error occurred during login: " + error.message);
    }
}
