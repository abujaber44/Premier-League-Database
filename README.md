# Premier League Database

This app is built with a Javascript frontend and a Rails API backend. This app is used to show all stats for Premier League players based on chosen teams by the user.

## Installation:

After cloning the repo, install the dependencies by executing the below command in your terminal:

$ bundle install

Create the database using the command below:

$ rake db:migrate

Launch the system using the below command in your terminal and navigating to your specified local host URL:

$ rails server

## Usage:

Upon launching the application, the user can navigate to the path of index.html where they will be prompted to sign up or log in.

From here, the user may:

- Add favorite teams to their list by clicking the associated Add Team button.
- View all players for the selected teams along with their associated statistics.
- Remove a team from their list by clicking on the Delete Team button.

## License:

The system is available as open source under the terms of the [MIT License](https://opensource.org/licenses/MIT).
