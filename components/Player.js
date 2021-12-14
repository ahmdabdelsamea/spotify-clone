import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRecoilState } from 'recoil';
import { currentTrackIdState, isPlayingState } from '../atoms/songAtom';
import useSpotify from '../hooks/useSpotify';
import useSongInfo from '../hooks/useSongInfo';

const Player = () => {
	const [volume, setVolume] = useState(50);
	const spotifyApi = useSpotify();
	const { data: session, status } = useSession();
	const [currentTrackId, setCurrentTrackId] =
		useRecoilState(currentTrackIdState);
	const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);
	const songInfo = useSongInfo();

	const fetchCurrentSong = () => {
		if (!songInfo) {
			spotifyApi.getMyCurrentPlayingTrack().then((data) => {
				setCurrentTrackId(data.body?.item?.id);

				spotifyApi.getMyCurrentPlaybackState().then((data) => {
					setIsPlaying(data.body?.is_playing);
				});
			});
		}
	};

	useEffect(() => {
		if (spotifyApi.getAccessToken() && !currentTrackId) {
			fetchCurrentSong();
			setVolume(50);
		}
	}, [currentTrackId, spotifyApi, session]);

	return (
		<div className='h=24 bg-gradient-to-b from-black to-gray-900 text-white grid grid-cols-3 text-xs md:text-base px-2 md:px-8'>
			{/* LEFT */}
			<div className='flex items-center space-x-4'>
				<img
					className='hidden md:inline w-10 h-10'
					src={songInfo?.album.images?.[0]?.url}
					alt=''
				/>
				<div>
					<h3 className=''>{songInfo?.name}</h3>
					<p className=''>{songInfo?.artists?.[0]?.name}</p>
				</div>
			</div>

			{/* CENTER */}
		</div>
	);
};

export default Player;