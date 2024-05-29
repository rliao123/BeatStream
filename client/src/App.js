import React, { useEffect } from "react";
import { useNavigate, useLocation, Route, Routes } from "react-router-dom";
import Homepage from "./pages/Homepage";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import UserProfile from "./pages/UserProfile";
import UserDashboard from "./pages/UserDashboard";
import Song from "./pages/Song";
import AddSong from "./pages/AddSong";
import CreatePlaylist from "./pages/CreatePlaylist";
import EditPlaylist from "./pages/EditPlaylist";
import ViewPlaylistDetails from "./pages/ViewPlaylistDetails";
import AddToPlaylist from "./pages/AddToPlaylist";
import Artist from "./pages/Artist";
import Playlist from "./pages/Playlist";
import Album from "./pages/Album";
import PlaySongs from "./pages/PlaySongs";
import PlayPlaylist from "./pages/PlayPlaylist";
import PlayArtist from "./pages/PlayArtists";
import PlayAlbum from "./pages/PlayAlbum";

function App() {
  const action = useNavigate();
  const location = useLocation();
  const pathname = location.pathname;

  useEffect(() => {
    if (action !== "POP") {
      window.scrollTo(0, 0);
    }
  }, [action, pathname]);

  useEffect(() => {
    let title = "";
    let metaDescription = "";

    // eslint-disable-next-line default-case
    switch (pathname) {
      case "/":
        title = "";
        metaDescription = "";
        break;
    }

    if (title) {
      document.title = title;
    }

    if (metaDescription) {
      const metaDescriptionTag = document.querySelector(
        'head > meta[name="description"]'
      );
      if (metaDescriptionTag) {
        metaDescriptionTag.content = metaDescription;
      }
    }
  }, [pathname]);

  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/sign-in" element={<SignIn />} />
      <Route path="/sign-up" element={<SignUp />} />
      <Route path="/user-profile" element={<UserProfile />} />
      <Route path="/user-dashboard" element={<UserDashboard />} />
      <Route path="/songs" element={<Song />} />
      <Route path="/add-song" element={<AddSong />} />
      <Route path="/create-playlist" element={<CreatePlaylist />} />
      <Route path="/edit-playlist" element={<EditPlaylist />} />
      <Route
        path="/playlist-details/:playlistId"
        element={<ViewPlaylistDetails />}
      />
      <Route path="/add-to-playlist" element={<AddToPlaylist />} />
      <Route path="/artists" element={<Artist />} />
      <Route path="/playlists" element={<Playlist />} />
      <Route path="/albums" element={<Album />} />
      <Route path="/play-songs" element={<PlaySongs />} />
      <Route path="/play-playlist/:playlistId" element={<PlayPlaylist />} />
      <Route path="/play-artist/:artistId" element={<PlayArtist />} />
      <Route path="/play-album/:albumId" element={<PlayAlbum />} />
    </Routes>
  );
}

export default App;
