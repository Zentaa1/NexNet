import { renderPosts } from "../../pages/feed/functions/renderPosts.js";
import { selectOption } from "./filterOption.js";

export async function popularFilter(posts) {
    document.getElementById('popularOption').addEventListener('click', async function() {
        console.log('popular');
        selectOption('Popular');
        posts.data.sort((a, b) => b._count.reactions - a._count.reactions);

        console.log(posts);

        await renderPosts(posts);
    });
}
