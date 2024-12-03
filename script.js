
const clientId = 'YOUR_GITHUB_CLIENT_ID'; 
const clientSecret = 'YOUR_GITHUB_CLIENT_SECRET'; 


function getUserProfile(username) {
    
    fetch(`https://api.github.com/users/${username}?client_id=${clientId}&client_secret=${clientSecret}`)
        .then(response => response.json()) 
        .then(data => {
           
            document.getElementById('profile-name').innerText = data.name || 'No Name Available';
            document.getElementById('profile-img').src = data.avatar_url;
            document.getElementById('profile-joined').innerText = new Date(data.created_at).toLocaleDateString();

           
            const joinDate = new Date(data.created_at);
            const today = new Date();
            const years = today.getFullYear() - joinDate.getFullYear();
            const months = today.getMonth() - joinDate.getMonth();
            const days = today.getDate() - joinDate.getDate();

            let duration = '';
            if (years > 0) {
                duration += `${years} year${years > 1 ? 's' : ''} `;
            }
            if (months > 0) {
                duration += `${months} month${months > 1 ? 's' : ''} `;
            }
            if (days > 0 || (years === 0 && months === 0)) {
                duration += `${days} day${days > 1 ? 's' : ''}`;
            }

            document.getElementById('profile-member-for').innerText = duration || 'Less than a day';

            
            document.getElementById('profile-link').href = data.html_url;
            document.getElementById('profile-link').innerText = 'Go to GitHub Profile';

            
            document.getElementById('profile-info').classList.remove('hidden');
        })
        .catch(error => {
            alert('Error: User not found!');
            console.error(error);
        });
}


function getUserRepositories(username) {
    fetch(`https://api.github.com/users/${username}/repos?per_page=5&client_id=${clientId}&client_secret=${clientSecret}`)
        .then(response => response.json())
        .then(repos => {
            const repoList = document.getElementById('repos');
            repoList.innerHTML = ''; 
            
            
            repos.forEach(repo => {
                const li = document.createElement('li');
                li.innerHTML = `<a href="${repo.html_url}" target="_blank">${repo.name}</a><br>${repo.description || 'No description'}`;
                repoList.appendChild(li);
            });
            
            
            document.getElementById('repo-list').classList.remove('hidden');
        })
        .catch(error => {
            alert('Error: Could not fetch repositories');
            console.error(error);
        });
}


document.getElementById('search-btn').addEventListener('click', function () {
    const username = document.getElementById('username-input').value.trim();
    
    if (username) {
        getUserProfile(username);
        getUserRepositories(username); 
    } else {
        alert('Please enter a username!');
    }
});

