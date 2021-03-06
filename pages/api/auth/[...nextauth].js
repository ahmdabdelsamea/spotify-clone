import NextAuth from 'next-auth';
import SpotifyProvider from 'next-auth/providers/spotify';
import spotifyApi, { LOGIN_URL } from '../../../lib/spotify';

const refreshAccessToken = async (token) => {
	try {
		spotifyApi.setAccessToken(token.accessToken);
		spotifyApi.setRefreshToken(token.refreshAccessToken);

		const { body: refreshedToken } = await spotifyApi.refreshAccessToken();

		return {
			...token,
			accessToken: refreshedToken.access_token,
			accessTokenExpires: Date.now + refreshedToken.expires_in * 1000,
			refreshToken: refreshedToken.refresh_token ?? token.refreshToken,
		};
	} catch (error) {
		return {
			...token,
			error: 'RefreshAccessTokenError',
		};
	}
};

export default NextAuth({
	providers: [
		SpotifyProvider({
			clientId: String(process.env.NEXT_PUBLIC_CLIENT_ID),
			clientSecret: String(process.env.NEXT_PUBLIC_CLIENT_SECRET),
			authorization: LOGIN_URL,
		}),
	],
	secret: process.env.JWT_SECRET,
	pages: {
		singIn: `${process.env.NEXTAUTH_URL}/login`,
	},
	callbacks: {
		async jwt({ token, account, user }) {
			// Initial SingIn
			if (account && user) {
				return {
					...token,
					accessToken: account.access_token,
					refreshToken: account.refresh_token,
					username: account.providerAccountId,
					accessTokenExpires: account.expires_at * 1000,
				};
			}

			if (Date.now() < token.accessTokenExpires) {
				return token;
			}

			return await refreshAccessToken(token);
		},

		async session({ session, token }) {
			session.user.accessToken = token.accessToken;
			session.user.refreshToken = token.refreshToken;
			session.user.username = token.username;

			return session;
		},
	},
});
