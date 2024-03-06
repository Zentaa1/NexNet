import { clear } from "../../api/storage/clear.js";

export function logOut() {
    console.log(document);
    const logOutBtn = document.getElementById('logOutBtn');

    console.log(logOutBtn);

    logOutBtn.addEventListener('click', async => {
        clear("token");
        clear("profile");
    })
}