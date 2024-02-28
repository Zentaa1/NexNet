import { createNewPost } from "./functions/createPost.js";
import { renderPosts } from "./functions/renderPosts.js";

document.addEventListener('DOMContentLoaded', () => {
    renderPosts();
    createNewPost();
});
