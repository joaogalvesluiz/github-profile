/*#*/ const APIURL = "https://api.github.com/users/";

const main = document.querySelector("main");
const form = document.querySelector("#form");
const search = document.querySelector("#search");


//Get users
async function getUser(username) {

    const resp = await fetch(APIURL + username);
    const respData = await resp.json(resp);


    createUserCard(respData);
    getRepos(username);
  
};

async function getRepos(username) {
    const resp = await fetch(APIURL + username + "/repos");
    const respData = await resp.json(resp);

    addReposToCard(respData);
}


//Create card componente HTML 
function createUserCard(user) {

    const cardHTML = `
    <div class="card">
        <div>
            <img class="avatar" src="${user.avatar_url}" alt="${user.name}">
        </div>

        <div class="user-info">
            <h2>${user.name}</h2>
            <p>${user.bio}</p>

            <ul class="info">
                <li><strong>${user.followers} Followers</strong></li>
                <li><strong>${user.following} Following</strong></li>
                <li><strong>${user.public_repos} Repos</strong></li>
            </ul>

            <h4>Repos: </h4>
            <div id="repos"> </div>

        </div>
    </div>
    `;
    
    main.innerHTML = cardHTML;
};

function addReposToCard(repos) {
    const reposEl = document.querySelector("#repos");

    repos.sort((a,b) => b.stargazers_count - a.stargazers_count)
    .slice(0,10)
    .forEach((repo) => {
        const repoEl = document.createElement("a");
        repoEl.classList.add("repo");

        repoEl.href = repo.html_url;
        repoEl.target = "_blank";
        repoEl.innerText = repo.name;  

        reposEl.appendChild(repoEl);
    } );
};

//Get and search the user
form.addEventListener("submit", event => {
    event.preventDefault();
    const user = search.value;

    if (user) {
        getUser(user);
        search.value = "";
    };

});

