// import Head from 'next/head';
import { getSession } from 'next-auth/react';

import Sidebar from '../components/Sidebar';
import Spotify from '../components/Spotify';
import Player from '../components/Player';

export default function Home() {
	return (
		<div className='bg-black h-screen overflow-hidden'>
			<main className='flex'>
				<Sidebar />
				<Spotify />
			</main>

			<div className='sticky bottom-0'>
				<Player />
			</div>
		</div>
	);
}

export async function getServerSideProps(context) {
	const session = await getSession(context);

	return {
		props: {
			session,
		},
	};
}
