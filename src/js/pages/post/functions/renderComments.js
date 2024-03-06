import formatDate from "../../feed/functions/formatDate.js";

export async function renderComments(comments) {
    try {
        const commentContainer = document.getElementById('commentContainer');
        const commentTemplate = document.getElementById('commentTemplate')

        comments.forEach(comment => {
            const newComment = commentTemplate.cloneNode(true);
            newComment.classList.remove('d-none');

            const date = new Date(comment.created);

            newComment.querySelector('.comment-avatar').src = comment.author.avatar.url;
            newComment.querySelector('.comment-author').textContent = comment.author.name;
            newComment.querySelector('.comment-date').textContent = formatDate(date);
            newComment.querySelector('.comment-body').textContent = comment.body;

            commentContainer.appendChild(newComment);
            

            console.log(comment);
        })

        
    } catch (error) {

    }
}