import { useEffect } from 'react';
import { useRouter } from 'next/router';

import Image from 'next/image';
import { getProviders, signIn, useSession } from 'next-auth/react';
import SpotifyLogo from '../assets/spotify_logo.svg';

function Login({ providers }) {
	const router = useRouter();
	const { data: session, status } = useSession();

	useEffect(() => {
		if (status === 'authenticated') {
			router.push('/');
		}
	}, [status]);

	return (
		<div className='flex flex-col items-center justify-center bg-black min-h-screen'>
			<Image
				src={SpotifyLogo}
				alt='Spotify'
				width={400}
				// height={100}
			/>
			{Object.values(providers).map((provider) => (
				<div key={provider.name} className='mt-5'>
					<button
						className='bg-[#18D860] text-lg font-bold text-white w-80 p-3 rounded-full cursor-pointer hover:bg-[#00a13e]'
						onClick={() => signIn(provider.id, { callbackUrl: '/' })}
					>
						Login with {provider.name}
					</button>
				</div>
			))}
		</div>
	);
}

export default Login;

export async function getServerSideProps() {
	const providers = await getProviders();

	return {
		props: {
			providers,
		},
	};
}
