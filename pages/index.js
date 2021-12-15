import Head from 'next/head';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { getSession, useSession } from 'next-auth/react';

import Sidebar from '../components/Sidebar';
import Spotify from '../components/Spotify';
import Player from '../components/Player';

export default function Home() {
	const router = useRouter();
	const { data: session, status } = useSession();

	useEffect(() => {
		if (status === 'unauthenticated') {
			router.push('/login');
		}
	}, [status]);

	return (
		<div className='bg-black h-screen overflow-hidden'>
			{status === 'loading' || session === undefined || session === null ? (
				<h1 className='text-white text-2xl font-semibold p-10'>Loading...</h1>
			) : (
				<>
					<Head>
						<title>Spotify Clone</title>
						<meta
							name='viewport'
							content='initial-scale=1.0, width=device-width'
						/>
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
				</>
			)}
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
