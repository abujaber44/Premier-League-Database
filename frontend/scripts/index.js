const api = new API()
const signUpForm = document.querySelector(".container")
const inputFields = document.querySelectorAll(".input-text")
const logoutBtn = document.querySelector(".logout-btn")
const teamCollection = document.querySelector("#team-collection")
const gridContainer = document.querySelector(".grid-container")
const gridItem = document.querySelector(".grid-item")
const leftGrid = document.querySelector(".left-grid")
const centerGrid = document.querySelector(".center-grid")
const rightGrid = document.querySelector(".right-grid")
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
        showLikedTeams()
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
        let team = data[0]
        leftGrid.innerHTML += `<div class="grid-item">
                                        <h2>${team.team_name} Players:</h2>
                                         </div>`
        team.players.map(player => {
            leftGrid.innerHTML += `
                    <div class="grid-item"> Name: ${player.player_name} <br>
                                            Age: ${player.player_age} <br>
                                            Number: ${player.player_number} <br>
                                            Country: ${player.player_country} <br>
                                            Type: ${player.player_type} <br>
                                            Goals: ${player.player_goals} <br>
                                             </div>`
        })
    })
    api.fetchUserTeams(user.id).then(data => {
        let team = data[1]
        centerGrid.innerHTML += `<div class="grid-item">
                                        <h2>${team.team_name} Players:</h2>
                                         </div>`
        team.players.map(player => {
            centerGrid.innerHTML += `
                    <div class="grid-item"> Name: ${player.player_name} <br>
                                            Age: ${player.player_age} <br>
                                            Number: ${player.player_number} <br>
                                            Country: ${player.player_country} <br>
                                            Type: ${player.player_type} <br>
                                            Goals: ${player.player_goals} <br> 
                                            </div>`
        })
    })
    api.fetchUserTeams(user.id).then(data => {
        let team = data[2]
        rightGrid.innerHTML += `<div class="grid-item">
                                        <h2>${team.team_name} Players:</h2>
                                         </div>`
        team.players.map(player => {
            rightGrid.innerHTML += `
                    <div class="grid-item"> Name: ${player.player_name} <br>
                                            Age: ${player.player_age} <br>
                                            Number: ${player.player_number} <br>
                                            Country: ${player.player_country} <br>
                                            Type: ${player.player_type} <br>
                                            Goals: ${player.player_goals} <br> 
                                            </div>`
        })
    })
}