import { getProfile } from "./api/profile/getProfile.js";
import { load } from "./api/storage/load.js";
import { createListItem } from "./functions/createListItem.js";
import { updateProfileData } from "./functions/editProfileData.js";
import { followUnfollowProfile } from "./functions/followUnfollowUser.js";

document.addEventListener("DOMContentLoaded", async function() {
    try {
        const urlParams = new URLSearchParams(window.location.search);
        const profileName = urlParams.get('name');

        const profileData = await getProfile(profileName);

        const profile = profileData.data;

        const followers = profile.followers;

        console.log(profile);

        const profileContainer = document.getElementById('profileContainer');

        const profileAvatarDiv = document.createElement('div');
        profileAvatarDiv.classList.add('col-md-5', 'mt-5');

        profileContainer.appendChild(profileAvatarDiv);

        const profileAvatar = document.createElement('img');
        profileAvatar.src = profile.avatar.url;
        profileAvatar.classList.add('profile-picture', 'rounded');

        profileAvatarDiv.appendChild(profileAvatar);

        const profileContent = document.createElement('div');
        profileContent.classList.add('col-md-4');

        profileContainer.appendChild(profileContent);

        const renderProfileName = document.createElement('h1');
        renderProfileName.classList.add('fs-2', 'text-purple', 'mt-5');
        renderProfileName.textContent = profile.name;

        profileContent.appendChild(renderProfileName);

        const profileCounterDiv = document.createElement('div');
        profileCounterDiv.classList.add('row', 'flex-md-row', 'flex-column-reverse');

        profileContent.appendChild(profileCounterDiv);

        const postUL = createListItem('Posts', profile._count.posts);
        const followersUL = createListItem('Followers', profile._count.followers);
        const followingUL = createListItem('Following', profile._count.following);

        profileCounterDiv.appendChild(postUL);
        profileCounterDiv.appendChild(followersUL);
        profileCounterDiv.appendChild(followingUL);

        const profileBio = document.createElement('p');
        profileBio.classList.add('mt-3');
        
        if (profile.bio === null) {
            profileBio.textContent = "This is a short description"
        } else {
            profileBio.textContent = profile.bio;
        }

        profileContent.appendChild(profileBio);

        const btnDiv = document.createElement('div');
        btnDiv.classList.add('col-md-11', 'mt-5', 'mb-5');

        profileContainer.appendChild(btnDiv);

        const ownProfile = load("profile");

        console.log(ownProfile.name);

        if (profileName === ownProfile.name) {
            const editProfileButton = document.createElement('button');
            editProfileButton.classList.add('col-12', 'btn', 'btn-primary', 'fw-bold', 'fs-5')
            editProfileButton.textContent = 'Edit Profile';

            const addNewPostButton = document.createElement('button');
            addNewPostButton.classList.add('col-12', 'mt-3', 'btn', 'btn-sec', 'fw-bold', 'fs-5');
            addNewPostButton.textContent = 'New Post';

            btnDiv.appendChild(editProfileButton);
            btnDiv.appendChild(addNewPostButton);

            updateProfileData(profileName, editProfileButton);

        } else {
            const followButton = document.createElement('button');
            followButton.classList.add('col-12', 'btn', 'btn-primary', 'fw-bold', 'fs-5');
            followButton.textContent = 'Follow';
    
            const addFriendButton = document.createElement('button');
            addFriendButton.classList.add('col-12', 'mt-3', 'btn', 'btn-sec', 'fw-bold', 'fs-5');
            addFriendButton.textContent = 'Add as Friend';
    
            btnDiv.appendChild(followButton);
            btnDiv.appendChild(addFriendButton);

            followUnfollowProfile(profileName, followButton, followers); 
        }

        console.log(profileName);     
       
    } catch (error) {
        console.error('Error loading profile', error.message);
    }
});