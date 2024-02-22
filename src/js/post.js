// post.js

import { getSinglePost } from './api/posts/getSinglePost.js';
import formatDate from './functions/formatDate.js';
import formatNumber from './functions/formatNumber.js';

document.addEventListener("DOMContentLoaded", async function() {
    try {
        const urlParams = new URLSearchParams(window.location.search);
        const postId = urlParams.get('id');

        const post = await getSinglePost(postId);


        const title = post.data.title;
        const body = post.data.body;
        const likes = post.data._count.reactions;
        const formattedLikes = formatNumber(likes);
        const commentNumber = post.data._count.comments;
        const formattedComments = formatNumber(commentNumber);

        const createdDate = new Date(post.data.created);
        const formattedDate = formatDate(createdDate);

        const postSection = document.getElementById('postContainer');
        

        const postContainer = document.createElement('div');
        postContainer.classList.add('bg-primary', 'container', 'rounded', 'mt-4', 'row', 'mx-auto');
        postSection.appendChild(postContainer);

        const postImage = document.createElement('i');
        postImage.classList.add('bi', 'bi-person-circle', 'col-md-1', 'fs-1', 'mt-2')

        const postContent = document.createElement('div');
        postContent.classList.add('col-md-11', 'row', 'align-items-start', 'py-2', 'px2')

        const postHeaders = document.createElement('div');

        postContainer.appendChild(postImage);
        postContainer.appendChild(postContent);
        postContainer.appendChild(postHeaders);


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

        postContainer.appendChild(postBody);

        const postReactions = document.createElement('div');
        postReactions.classList.add('d-flex', 'align-items-center');

        postContainer.appendChild(postReactions);

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

        const commentSection = document.createElement('div');
        postContainer.appendChild(commentSection)

        const commentH2 = document.createElement('h2');
        commentH2.classList.add('fs-4', 'mb-0', 'text-primary', 'mb-4');
        commentH2.textContent = 'Comment section';

        commentSection.appendChild(commentH2);

        const comments = post.data.comments;

        comments.forEach(comment => {

            const author = comment.owner;
            const body = comment.body;

            const commentDate = new Date(comment.created);
            const commentFormattedDate = formatDate(commentDate);

            const commentContainer = document.createElement('div');
            commentSection.appendChild(commentContainer);

            const commentAuthor = document.createElement('h2');
            commentAuthor.classList.add('fs-4', 'mb-0', 'text-purple');
            commentAuthor.textContent = author;

            const commentTime = document.createElement('p');
            commentTime.classList.add('mt-0', 'fs-6', 'text-purple');
            commentTime.textContent = commentFormattedDate;

            const commentBody = document.createElement('p');
            commentBody.classList.add('text-primary')
            commentBody.textContent = body;

            commentContainer.appendChild(commentAuthor);
            commentContainer.appendChild(commentTime);
            commentContainer.appendChild(commentBody);

            

        })

        console.log(comments);

    } catch (error) {
        console.error('Error fetching post:', error.message);
    }
});
