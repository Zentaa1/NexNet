import { createPost } from './api/posts/createPost.js';
import { getPosts } from './api/posts/getPosts.js';
import formatDate from './functions/formatDate.js';
import formatNumber from './functions/formatNumber.js';

async function renderPosts() {
    try {
        const posts = await getPosts();
        console.log(posts);
        const postSection = document.getElementById("postContainer");

        posts.data.forEach(post => {
            const title = post.title;
            const body = post.body;

            const likes = post._count.reactions;
            const formattedLikes = formatNumber(likes);

            const comments = post._count.comments;
            const formattedComments = formatNumber(comments);

            const createdDate = new Date(post.created);
            const formattedDate = formatDate(createdDate);

            const postContainer = document.createElement('div');
            postContainer.classList.add('bg-primary', 'container', 'rounded', 'mt-4', 'row', 'mx-auto');
            postSection.appendChild(postContainer);

            const postLink = document.createElement('a');
            postLink.setAttribute('href', `post/?id=${post.id}`);
            postLink.setAttribute('data-post-index', post.id);
            postContainer.appendChild(postLink);

            const postImage = document.createElement('i');
            postImage.classList.add('bi', 'bi-person-circle', 'col-md-1', 'fs-1', 'mt-2')

            const postContent = document.createElement('div');
            postContent.classList.add('col-md-11', 'row', 'align-items-start', 'py-2', 'px2')

            const postHeaders = document.createElement('div');

            postLink.appendChild(postImage);
            postLink.appendChild(postContent);
            postLink.appendChild(postHeaders);


            const postTitle = document.createElement('h2');
            postTitle.classList.add('fs-4', 'mb-0', 'text-purple');
            postTitle.textContent = title;

            const postDate = document.createElement('p');
            postDate.classList.add('mt-0', 'fs-6', 'text-purple');
            postDate.textContent = formattedDate;

            postHeaders.appendChild(postTitle);
            postHeaders.appendChild(postDate);

            const postBody = document.createElement('p');
            postBody.classList.add('text-primary')
            postBody.textContent = body;

            postLink.appendChild(postBody);

            const postReactions = document.createElement('div');
            postReactions.classList.add('d-flex', 'align-items-center');

            postLink.appendChild(postReactions);

            const postLikes = document.createElement('i');
            postLikes.classList.add('bi', 'bi-hand-thumbs-up', 'text-primary');

            const postLikesValue = document.createElement('p');
            postLikesValue.classList.add('my-0', 'mx-0', 'text-purple');
            postLikesValue.textContent = formattedLikes;

            const postComments = document.createElement('i');
            postComments.classList.add('bi', 'bi-chat', 'text-primary');

            const postCommentsValue = document.createElement('p');
            postCommentsValue.classList.add('my-0', 'mx-0', 'text-purple');
            postCommentsValue.textContent = formattedComments;

            postReactions.appendChild(postLikes);
            postReactions.appendChild(postLikesValue);
            postReactions.appendChild(postComments);
            postReactions.appendChild(postCommentsValue);

        });

    } catch (error) {
        console.error('Error fetching posts:', error.message);
    }
}


document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("createPostForm").addEventListener("submit", async function(event) {
        event.preventDefault();

        const title = document.getElementById("postTitle").value;
        const body = document.getElementById("postBody").value;

        try {
            const response = await createPost(title, body);

            console.log('Post Created Successfully!', response);
            alert('successfully created a post!');

        } catch (error) {
            console.error('There was a problem creating the post!', error.message);
            alert('Failed to create the post, please try again later or contact support!')
        }
    });
});


renderPosts();
