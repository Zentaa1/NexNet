import { renderPosts } from "../../pages/feed/functions/renderPosts.js";
import { selectOption } from "./filterOption.js";

export async function relevantFilter(posts) {
    document.getElementById('relevantOption').addEventListener('click', async function() {
        console.log('Relevant');
        selectOption('Relevant');
        posts.data.sort((a, b) => b._count.comments - a._count.comments);

        console.log(posts);

        await renderPosts(posts);
    });
}
