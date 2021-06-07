//global variables
//where profile information will appear
const profileOverview = document.querySelector (".overview");
const username = "Slipstitch";
//select unordered list to display the repos list
const reposList = document.querySelector (".repo-list");


//Fetch API JSON data
const getUserInfo = async function () {
	const showRequest = await fetch (`http://api.github.com/users/${username}`);
	const data = await showRequest.json();
	//console.log(showRequest);
	displayUserInfo(data);
};

getUserInfo();

//Fetch and Display User Information
const displayUserInfo = function (data) {
	const div = document.createElement("div");
	div.classList.add("user-info");
	div.innerHTML = `
	   <figure>
         <img alt="user avatar" src=${data.avatar_url} />
       </figure>
       <div>
         <p><strong>Name:</strong> ${data.name}</p>
         <p><strong>Bio:</strong> ${data.bio}</p>
         <p><strong>Location:</strong> ${data.location}</p>
         <p><strong>Number of public repos:</strong> ${data.public_repos}</p>
       </div>`;
       profileOverview.append(div);
       getRepos();
};

//Fetch the repos
const getRepos = async function () {
	const fetchRepos = await fetch (`http://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
	const repoData = await fetchRepos.json();
	displayRepoInfo(repoData);
	
};

//Display information about each repo
const displayRepoInfo = function (repos) {
	for (const repo of repos) {
		const repoItem = document.createElement ("li");
		repoItem.classList.add ("repo");
		repoItem.innerHTML = `<h3>${repo.name}</h3>`;
		reposList.append(repoItem);
	}

};

