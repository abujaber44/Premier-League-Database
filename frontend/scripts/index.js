const api = new API()
const signUpForm = document.querySelector(".container")
const inputFields = document.querySelectorAll(".input-text")
const logoutBtn = document.querySelector(".logout-btn")
const teamCollection = document.querySelector("#team-collection")
const teamNames = document.getElementsByClassName("team-name")
const mainContainer = document.querySelector("main")
let loggedIn = null
let signedUp = false


document.addEventListener("DOMContentLoaded", () => {
    logoutBtn.hidden = true;
})


function hideSignUpForm() {
    signUpForm.style.display = 'none'
}

signUpForm.addEventListener('submit', function(e) {
    e.preventDefault()
    api.postUser(inputFields[1].value, inputFields[0].value).then(function(object) {
        loggedIn = object
        localStorage.loggedIn = object.id
        renderLoggedInUser()
    })
})



function renderLoggedInUser() {
    if (loggedIn.error !== "Unable to create user") {
        let welcome = document.querySelector('#welcome')
        welcome.innerText = " "
        welcome.innerText = `Welcome ${loggedIn.name}!`
        hideSignUpForm()
        showLogOutBtn()
            // showLikedTeams()
    } else {
        alert("Please enter your name and email address");
    }
}


logoutBtn.addEventListener('click', () => {
    localStorage.clear(loggedIn)
    window.location.reload()
})


function showLogOutBtn() {
    logoutBtn.hidden = false
}


function renderTeams() {
    api.fetchAllteams()
        .then(data => {
            data.map(team => {
                mainContainer.innerHTML += `<div class="card">
                    <img src=${team.team_badge} class="team-badge" />
                    <h2 class="team-name">${team.team_name}</h2>
                    <button onClick=addTeam(event) data-teamname="${team.team_name}" data-teambadge="${team.team_badge}"> Add Team </button>
                    </br>
                  </div>`
            })
        })
        .catch(error => {
            console.log(error);
        });
}

renderTeams();


function addTeam(event) {
    let user = loggedIn
    teamName = event.target.dataset.teamname
    teamBadge = event.target.dataset.teambadge
    api.postTeam(user.id, teamName, teamBadge)
}

function showLikedTeams() {
    user = loggedIn
    api.fetchUserTeams(user.id).then(data => {
        data.map(team => {
            teamCollection.innerHTML += `<div>
                    <h2 class="team-name">${team.team_name} Players:</h2>`
            team.players.map(player => {
                teamCollection.innerHTML += `<div>
                    <ul> Name: ${player.player_name} </ul>
                    <li> Number: ${player.player_number} </li>
                    <li> Country: ${player.player_country}</li>
                    <li> Type: ${player.player_type}</li>
                    <li> Age: ${player.player_age}</li>
                    <li> Match Played: ${player.player_match_played}</li>
                    <li> Goals: ${player.player_goals}</li>
                    <li> Yellow Cards: ${player.player_yellow_cards}</li>
                    <li> Red Cards: ${player.player_red_cards}</li>
                    </br>
                  </div>`
            })
        })
    })
}