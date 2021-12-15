import Head from 'next/head';
import { getSession } from 'next-auth/react';

import Sidebar from '../components/Sidebar';
import Spotify from '../components/Spotify';
import Player from '../components/Player';

export default function Home() {
	return (
		<div className='bg-black h-screen overflow-hidden'>
			<Head>
				<title>Spotify Clone</title>
				<meta name='viewport' content='initial-scale=1.0, width=device-width' />
				<meta
					name='description'
					content='Spotify Clone with Next.js and TailwindCSS'
				/>
				<link
					rel='shortcut icon'
					href='/images/spotify-logo.png'
					type='image/png'
				/>
			</Head>
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
