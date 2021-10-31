# Nimbus Noise
Live link: https://nimbusnoise.herokuapp.com/

## Welcome to Nimbus Noise.
![user landing page](https://cdn.discordapp.com/attachments/861029914253328404/904432294360674394/unknown.png)
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

## Usage.
After signing up/logging in the users are able to do the following:
<br>

* Upon signing up or logging in the user's will be redirected to their user page:

![user_homepage](https://cdn.discordapp.com/attachments/904438142063501353/904440208240545812/unknown.png)

* Navigate to the Add an Album through the Upload button on the nav bar to create a new album:
  * Users can pick type in their album title name and optionally set an album image through a web URL.

![album upload page](https://cdn.discordapp.com/attachments/861029914253328404/904434446801969172/unknown.png)

* After creating a successful album, the user should be redirected to the album page that contains basic information about the album as well as the list of songs within in that Album:

![album_page](https://cdn.discordapp.com/attachments/904438142063501353/904438159088164924/unknown.png)

* Navigate to the Upload a Song through the Upload button on the anv bar to upload a new song:
  * Users are able to upload a song saved on their computer with a custom title and set it to an album.

<img src="https://cdn.discordapp.com/attachments/861029914253328404/904436733335187456/unknown.png" width="300" height="300"/>

* After successfully uploading a song, the user should be redircted to the song page that displays the basic information regarding the song as well as a box displaying all of the comments on the song.

![song_page](https://cdn.discordapp.com/attachments/904438142063501353/904439316187602964/unknown.png)

## Pipeline for Future Features:
- Create a search bar to allow users to search for users.
- Create a centralized songs and albums component and page that allows displays all albums or songs in alphabetical order.
- Allow users upload an album image through AWS and not an URL.
- Profile page customization (User profile pictures, bio, etc).
