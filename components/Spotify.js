import { useState, useEffect } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { shuffle } from 'lodash';
import { ChevronDownIcon } from '@heroicons/react/outline';
import { useRecoilValue, useRecoilState } from 'recoil';
import { playlistIdState, playlistState } from '../atoms/playlistAtom';
import useSpotify from '../hooks/useSpotify';
import Songs from './Songs';

const colors = [
	'from-red-600',
	'from-orange-500',
	'from-yellow-400',
	'from-lime-400',
	'from-green-600',
	'from-emerald-600',
	'from-cyan-600',
	'from-teal-600',
	'from-violet-600',
	'from-fuchsia-600',
	'from-pink-600',
	'from-rose-600',
];

function Spotify() {
	const spotifyApi = useSpotify();
	const { data: session } = useSession();
	const [color, setColor] = useState(null);
	const playlistId = useRecoilValue(playlistIdState);
	const [playlist, setPlaylist] = useRecoilState(playlistState);

	useEffect(() => {
		setColor(shuffle(colors).pop());
	}, [playlistId]);

	useEffect(() => {
		spotifyApi
			.getPlaylist(playlistId)
			.then((data) => {
				setPlaylist(data.body);
				console.log(data.body);
			})
			.catch((err) => {
				console.log('Something went wrong', err);
			});
	}, [spotifyApi, playlistId]);

	return (
		<div className='flex-grow h-screen overflow-y-scroll scrollbar-hide'>
			<header className='absolute top-5 right-8'>
				<div
					className='flex items-center bg-black text-white space-x-3 opacity-90 hover:opacity-80 cursor-pointer rounded-full p-1 pr-2'
					onClick={signOut}
				>
					<img
						className='rounded-full w-10 h-10'
						src={session?.user.image}
						alt=''
					/>
					<h2>{session?.user.name}</h2>
					<ChevronDownIcon className='h-5 w-5' />
				</div>
			</header>

			<section
				className={`flex items-end space-x-7 bg-gradient-to-b ${color} to-black h-80 p-8 text-white`}
			>
				<img
					className='h-48 w-48 shadow-2xl '
					src={playlist?.images?.[0]?.url}
					alt='playlist'
				/>
				<div>
					<p>PLAYLIST</p>
					<h1 className='text-2xl md:text-3xl xl:text-5xl font-bold'>
						{playlist?.name}
					</h1>
				</div>
			</section>

			<div>
				<Songs />
			</div>
		</div>
	);
}

export default Spotify;
