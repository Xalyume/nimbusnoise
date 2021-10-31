# Nimbus Noise
Live link: https://nimbusnoise.herokuapp.com/

## Welcome to Nimbus Noise.
Nimbus Noise is a full stack application developed using a React frontend and Postgres through Flask Alchemy on the backend.
Nimbus Noise allows users to sign up, add albums, add songs to those albums, and listen to those songs.
In addition, users are also able to navigate to other user's songs and listen/leave comments as well.

## Application Stack Architecture
As mentioned above the Nimbus Noise application is using the following for it's application stack:
<br>
[React](https://www.google.com)
<br>
[Redux](https://redux.js.org/)
<br>
[Postgres](https://www.postgresql.org/docs/)
<br>
[Flask](https://flask.palletsprojects.com/en/2.0.x/)
<br>
[SQLAlchemy](https://www.sqlalchemy.org/)


## Additional Technology Used:
In additional to the tech stack mentioned above, Nimbus Noise is utilizing [AWS](https://aws.amazon.com/) through the boto3 library to allow users to directly upload MP3 files from their computer.
Also, a npm package, called [react-audio-player](https://www.npmjs.com/package/react-audio-player), is used to provide a simple audio player to allow users to listen to any of the songs hosted on this application.

## Pipeline for Future Features:
- Create a search bar to allow users to search for users.
- Create a centralized songs and albums component and page that allows displays all albums or songs in alphabetical order.
