# Music Streaming Application

This is a music streaming application that allows users to upload songs, create playlists, and manage their music collection. Users can also play songs from their collection, playlists, and specified albums or artists.

## Features

- User authentication (Sign up, Sign in)
- Upload song files
- Create, view, and manage playlists
- View and manage artists and albums
- Play songs from collections

## Prerequisites
Install the following:
- React.js
- Node.js
- npm (Node Package Manager)
- MongoDB
- Git
- VSCode


## Technologies Used

- MongoDB
- Express.js
- React.js
- Node.js
- HTML/CSS
- Materials UI
- Axios
- JWT Authentication

## Getting Started
1. Open up a terminal and cd into your project destination folder. Clone the repository to your local envrionment:

``` git clone https://github.com/rliao123/BeatStream.git```

2. Navigate to the project directory
   ```cd beatstream```
3. After cloning, you should see two folders: server and client.
 The server includes server-side functions such as the database connection and routes.
 The client includes the front-end components and pages. In separate terminal tabs, make the two commands:
 ```cd client
npm install```
   ```cd server
 npm install``` and to install the dependencies

4. Create a `.env` file in the server directory and add the following variables:
   `PORT=8080
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
SESSION_SECRET=your_session_secret`
5. Add an "uploads" folder in the server directory manually in VSCode or via command:
```
    mkdir server/uploads
    ```
6. Navigate to the MongoDB Atlas website to "Rachel's Org - 2024-05-19" and go to the "Network Access" tab on the left panel.
   From here, click "+ Add IP Address" to add your IP address and connect to the database.
7. In separate terminal tabs, run the following to start the front-end and back-end parts of the application:
   Frontend:
   `cd client
   npm start`
   Backend:
   `cd server
   npm start`

8. Open your browser and navigate to `http://localhost:3000` if it is not automatically done so

## Usage

### Sign Up
1. Click `Get Started`
<img width="1440" alt="Screen Shot 2024-05-31 at 8 59 13 PM" src="https://github.com/rliao123/BeatStream/assets/92598518/1a2129f3-48d0-4ae2-a6ef-d5d41f13ef43">
2. Enter your first name, last name, email, and password
   - password validation: must have at least 6 characters and include at least one each: a-z, A-Z, 0-9, and special characters
<img width="1440" alt="Screen Shot 2024-05-31 at 8 59 51 PM" src="https://github.com/rliao123/BeatStream/assets/92598518/fe819b59-908f-4abf-a80a-ab935e6db12f">
3. Upon successfully signing up, sign in with email and password
<img width="1440" alt="Screen Shot 2024-05-31 at 9 01 17 PM" src="https://github.com/rliao123/BeatStream/assets/92598518/c8350b76-971f-4fff-bf56-afb5798e9330">

### Add and Manage Song Library

1. Sign in to your account. Upon sign in success, you will be brought to the User Dashboard page which can also be found by clicking the hamburger button in the header. 
<img width="1440" alt="Screen Shot 2024-05-31 at 9 02 06 PM" src="https://github.com/rliao123/BeatStream/assets/92598518/ab654e35-c305-4ecb-8155-c269fd555811">
2. Navigate to the "Song" page. 
   <img width="1440" alt="Screen Shot 2024-05-31 at 9 03 41 PM" src="https://github.com/rliao123/BeatStream/assets/92598518/84ea1df9-5f27-44ed-9158-ca5e1a27511e">
3. Click the "Add Song" button.
<img width="1440" alt="Screen Shot 2024-05-31 at 9 04 22 PM" src="https://github.com/rliao123/BeatStream/assets/92598518/b64e638f-f41f-403a-aac5-3027b6258c28">

4. Fill in the song details and upload the song file.
   - Album name is optional
   - File must be .mp3 format
5. Click "Add Song" to add the song to your library.
6. From the Songs page, click the delete button to remove the song from your library.
7. Click "Play" to play all the songs in the library.
   <img width="1440" alt="Screen Shot 2024-05-31 at 9 17 50 PM" src="https://github.com/rliao123/BeatStream/assets/92598518/087ef78c-9f93-45e8-976d-87d92e54c143">


### Create and Manage Playlist

1. Navigate to the "Playlist" page to view all playlists. Click "Create Playlist".
   <img width="1440" alt="Screen Shot 2024-05-31 at 9 09 41 PM" src="https://github.com/rliao123/BeatStream/assets/92598518/281bd368-3055-4b70-a5f5-e0b9a1b181a2">
<img width="1440" alt="Screen Shot 2024-05-31 at 9 10 29 PM" src="https://github.com/rliao123/BeatStream/assets/92598518/3cdfea33-b1de-42ac-84d0-2652a853195b">

2. Enter the playlist name and an image url.
3. Click "Create Playlist" to save your new playlist.
4. From the Playlists page, click on a playlist to view its details.
<img width="1440" alt="Screen Shot 2024-05-31 at 9 13 46 PM" src="https://github.com/rliao123/BeatStream/assets/92598518/abf83e6a-6f80-49a0-9464-9b3de73ed1d8">
5. Click "Add Song" to add songs to playlist.
<img width="1440" alt="Screen Shot 2024-05-31 at 9 14 38 PM" src="https://github.com/rliao123/BeatStream/assets/92598518/6f7eb1b2-554b-4957-9e51-4af871f192e9">
6. Click "Edit Playlist" to edit playlist details or delete playlist.
<img width="1440" alt="Screen Shot 2024-05-31 at 9 14 50 PM" src="https://github.com/rliao123/BeatStream/assets/92598518/7c816a80-7332-4c7a-a86f-97cb57c54001">
7. From a playlist page, click "Play" to start playing songs in that playlist.

### View Albums and Artists

1. Navigate to the "Albums" or "Artists" page.
   <img width="1440" alt="Screen Shot 2024-05-31 at 9 11 40 PM" src="https://github.com/rliao123/BeatStream/assets/92598518/b2f0a4fa-ac9d-4a35-848b-5d6eb0087cc5">
<img width="1440" alt="Screen Shot 2024-05-31 at 9 12 53 PM" src="https://github.com/rliao123/BeatStream/assets/92598518/6f027100-84f7-4294-bfa8-7c3ce9c75fdd">
2. Click the "Play" button to start playing songs.

