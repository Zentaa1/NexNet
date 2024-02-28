import { getPosts } from "../../../api/posts/getPosts.js";
import formatDate from "../../../functions/formatDate.js";
import formatNumber from "../../../functions/formatNumber.js";
import { updDelButtons } from "./updDelButtons.js";

export async function renderPosts() {
    try {
        const posts = await getPosts();
        const postContainer = document.getElementById('postContainer');
        const postTemplate = document.getElementById('postTemplate');

        posts.data.forEach(post => {
            const newPost = postTemplate.cloneNode(true);
            newPost.classList.remove('d-none');

            const createdDate = new Date(post.created);

            const profileName = post.author.name;
            const postId = post.id;

            

            const postLink = newPost.querySelector('.post-link');
            postLink.setAttribute('href', `post/?id=${post.id}`);
            postLink.setAttribute('data-post-index', post.id);

            newPost.querySelector('.post-avatar').src = post.author.avatar.url;
            newPost.querySelector('.post-author').textContent = post.author.name;
            newPost.querySelector('.post-date').textContent = formatDate(createdDate);
            newPost.querySelector('.post-title').textContent = post.title;
            newPost.querySelector('.post-body').textContent = post.body;
            newPost.querySelector('.post-likes').textContent = formatNumber(post._count.reactions);
            newPost.querySelector('.post-comments').textContent = formatNumber(post._count.comments);

            postContainer.appendChild(newPost);

            updDelButtons(profileName, newPost, postId)
        });
    } catch (error) {
        console.error('Error rendering posts:', error);
    }
}
