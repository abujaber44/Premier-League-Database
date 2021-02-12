const api = new API()
const signUpForm = document.querySelector(".container")
const inputFields = document.querySelectorAll(".input-text")
const logoutBtn = document.querySelector(".logout-btn")
const removeTeamBtns = document.getElementsByClassName("remove-team-btn")
const teamCollection = document.querySelector("#team-collection")
const gridContainer = document.querySelector(".grid-container")
const gridItem = document.querySelector(".grid-item")
const leftGrid = document.querySelector(".left-grid")
const centerGrid = document.querySelector(".center-grid")
const rightGrid = document.querySelector(".right-grid")
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


logoutBtn.addEventListener('click', () => {
    localStorage.clear(loggedIn)
    window.location.reload()
})


function showLogOutBtn() {
    logoutBtn.hidden = false
}



function renderLoggedInUser() {
    if (loggedIn.error !== "Unable to create user") {
        let welcome = document.querySelector('#welcome')
        welcome.innerText = " "
        welcome.innerHTML = `Welcome ${loggedIn.name}!  Add teams below to display all the player and their stats. You can have a maximum of 3 teams in your list`
        hideSignUpForm()
        showLogOutBtn()
        showLikedTeams()
    } else {
        swal("Please enter your name and email address");
    }
}

function renderTeams() {
    api.fetchAllteams()
        .then(data => {
            let teams = data
            sortedTeams = teams.sort(function(a, b) {
                let teamA = a.team_name;
                let teamB = b.team_name;
                return (teamA < teamB) ? -1 : (teamA > teamB) ? 1 : 0;
            })
            sortedTeams.map(team => {
                mainContainer.innerHTML += `<div class="card">
                    <img src=${team.team_badge} class="team-badge" />
                    <h2 class="team-name">${team.team_name}</h2>
                    <button onClick=addTeam(event) data-teamname="${team.team_name}" data-teambadge="${team.team_badge}"> Add Team </button>
                    </>
                  </div>`
            })
        })
        .catch(error => {
            console.log(error);
        });
}

renderTeams();


function addTeam(event) {
    if (loggedIn == null) {
        swal("Create an account or log in to start using this app")
    };
    user = loggedIn
    teamName = event.target.dataset.teamname
    teamBadge = event.target.dataset.teambadge
    api.postTeam(user.id, teamName, teamBadge).then(function(object) {
        newTeam = object
        if (newTeam.error == "Unable to add this team") {
            swal("You have the maximum number of teams or you have this team already in your list. Please remove a team before adding a new one")
        }
    })
    showLikedTeams();
}


function removeTeam(event) {
    let user = loggedIn
    teamName = event.target.dataset.teamname
    api.deleteTeam(user.id, teamName)
}

function clearLeftGrid() {
    leftGrid.innerHTML = ""
}

function clearCenterGrid() {
    centerGrid.innerHTML = ""
}

function clearRightGrid() {
    rightGrid.innerHTML = ""
}


function showLikedTeams() {
    let user = loggedIn
    api.fetchUserTeams(user.id).then(data => {
        let team = data[0]
        leftGrid.innerHTML += `<div class="grid-item">
                                        <h2>${team.team_name} Players:</h2>
                                        <button onClick="removeTeam(event); clearLeftGrid();" data-teamname="${team.team_name}" id="remove-team-btn"> Delete Team </button>
                                         </div>`
        team.players.map(player => {
            leftGrid.innerHTML += `<div class="grid-item"> Name: ${player.player_name} <br>
                                            Age: ${player.player_age} <br>
                                            Number: ${player.player_number} <br>
                                            Country: ${player.player_country} <br>
                                            Type: ${player.player_type} <br>
                                            Goals: ${player.player_goals} <br>
                                             </div>`
        })
    })
    api.fetchUserTeams(user.id).then(data => {
        let team_1 = data[1]
        centerGrid.innerHTML += `<div class="grid-item">
                                        <h2>${team_1.team_name} Players:</h2>
                                        <button onClick="removeTeam(event); clearCenterGrid()" data-teamname="${team_1.team_name}" id="remove-team-btn"> Delete Team </button>
                                         </div>`
        team_1.players.map(player => {
            centerGrid.innerHTML += `<div class="grid-item"> Name: ${player.player_name} <br>
                                            Age: ${player.player_age} <br>
                                            Number: ${player.player_number} <br>
                                            Country: ${player.player_country} <br>
                                            Type: ${player.player_type} <br>
                                            Goals: ${player.player_goals} <br> 
                                            </div>`
        })
    })
    api.fetchUserTeams(user.id).then(data => {
        let team_2 = data[2]
        rightGrid.innerHTML += `<div class="grid-item">
                                        <h2>${team_2.team_name} Players:</h2>
                                        <button onClick="removeTeam(event); clearRightGrid()" data-teamname="${team_2.team_name}" id="remove-team-btn"> Delete Team </button>
                                         </div>`
        team_2.players.map(player => {
            rightGrid.innerHTML += `<div class="grid-item"> Name: ${player.player_name} <br>
                                            Age: ${player.player_age} <br>
                                            Number: ${player.player_number} <br>
                                            Country: ${player.player_country} <br>
                                            Type: ${player.player_type} <br>
                                            Goals: ${player.player_goals} <br> 
                                            </div>`
        })
    })
}


$(window).on('load', function(e) {
    $('#refresh').on('click', function(e) {
        showLikedTeams();
    });
});


function sortTeams() {
    team.sort();
}
// rightGrid.innerHTML.trim().length == 0