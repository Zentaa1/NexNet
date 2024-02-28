import { createComment } from './api/posts/comments/createComment.js';
import { getSinglePost } from './api/posts/getSinglePost.js';
import deletePost from './functions/deletePost.js';
import formatDate from './functions/formatDate.js';
import formatNumber from './functions/formatNumber.js';
import updatePost from './functions/updatePost.js';




document.addEventListener("DOMContentLoaded", async function() {
    try {
        const urlParams = new URLSearchParams(window.location.search);
        const postId = urlParams.get('id');

        const post = await getSinglePost(postId);

        const author = post.data.author.name;

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

        const postDelUpdate = document.createElement('div');
            postDelUpdate.classList.add('align-flex-end', 'd-flex');

        postReactions.appendChild(postLikes);
        postReactions.appendChild(postLikesValue);
        postReactions.appendChild(postComments);
        postReactions.appendChild(postCommentsValue);
        postReactions.appendChild(postDelUpdate);

        updatePost(author, postDelUpdate, postContainer, postId);
        deletePost(author, postDelUpdate, postId);

        const commentSection = document.getElementById('commentContainer');        
        const comments = post.data.comments;

        document.getElementById("createCommentForm").addEventListener("submit", async function(event) {
            event.preventDefault();
        
            const commentBody = document.getElementById("commentBody").value;
        
            const urlParams = new URLSearchParams(window.location.search);
            const postId = urlParams.get('id');
        
            try {
                const response = await createComment(postId, commentBody);
        
                console.log("Posted comment!", response);
                alert('Comment was posted!');

                window.location.reload();
            } catch (error) {
                console.error('There was a problem posting the comment!', error.message);
                alert('Failed to post the comment, please try again later or contact support!')
            }
        });
        

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
