class API {
    constructor(port = 3000) {
        this.url = `http://localhost:${port}`
    }

    parseJSON = response => response.json()

    headers = { "Accepts": "application/json", "Content-Type": "application/json" }

    get userURL() {
        return this.url + '/users'
    }

    get teamURL() {
        return this.url + '/teams'
    }

    get allteamsURL() {
        return this.url + '/allteams'
    }

    get userTeamsURL() {
        return this.url + '/user_teams'
    }

    fetchUsers = () => {
        return fetch(this.userURL).then(this.parseJSON)
    }

    fetchUser = (id) => {
        return fetch(this.userURL + `/${id}`).then(this.parseJSON)
    }

    fetchUserTeams = (id) => {
        return fetch(this.userTeamsURL + `/${id}`).then(this.parseJSON)
    }

    postUser = (userEmail, userName) => {
        return fetch(this.userURL, {
            method: "POST",
            headers: this.headers,
            body: JSON.stringify({ email: userEmail, name: userName })
        }).then(this.parseJSON)
    }

    fetchTeams = () => {
        return fetch(this.teamURL).then(this.parseJSON)
    }

    fetchTeam = (id) => {
        return fetch(this.teamURL + `/${id}`).then(this.parseJSON)
    }

    postTeam = (userId, teamName, teamBadge) => {
        return fetch(this.teamURL, {
            method: "POST",
            headers: this.headers,
            body: JSON.stringify({ user_id: userId, team_name: teamName, team_badge: teamBadge })
        }).then(this.parseJSON)
    }

    deleteTeam = (id) => {
        return fetch(this.teamURL + `/${id}`, {
            method: "DELETE",
            headers: this.headers
        }).then(this.parseJSON)
    }

    fetchAllteams = () => {
        return fetch(this.allteamsURL).then(this.parseJSON)
    }
}