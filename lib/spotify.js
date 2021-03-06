import SpotifyWebApi from 'spotify-web-api-node';

const scopes = [
	// Spotify Connect
	'user-read-playback-state',
	'user-modify-playback-state',
	'user-read-currently-playing',
	// Users
	'user-read-private',
	'user-read-email',
	// Follow
	'user-follow-read',
	// Library
	'user-library-read',
	// Playback
	'streaming',
	// Listening History
	'user-top-read',
	'user-read-recently-played',
	// Playlists
	'playlist-read-private',
	'playlist-read-collaborative',
].join(',');

const params = {
	scope: scopes,
};

const queryParamString = new URLSearchParams(params);

export const LOGIN_URL = `https://accounts.spotify.com/authorize?${queryParamString.toString()}`;

const spotifyApi = new SpotifyWebApi({
	clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
	clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
});

export default spotifyApi;
