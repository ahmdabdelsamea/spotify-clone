import { getProviders, signIn } from 'next-auth/react';

// import SpotifyLogo from '../assets/Spotify-Logo.wine.svg';

function Login({ providers }) {
	return (
		<div className='flex flex-col items-center justify-center bg-black min-h-screen'>
			<img className='w-80 mb-8' src='/spotify_logo.svg' />
			{Object.values(providers).map((provider) => (
				<div key={provider.name}>
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
