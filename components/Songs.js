import { useRecoilValue } from 'recoil';
import { playlistState } from '../atoms/playlistAtom';
import Track from './Track';

function Songs() {
	const playlist = useRecoilValue(playlistState);

	return (
		<div className='text-white px-8 flex flex-col space-y-1 pb-28'>
			{playlist?.tracks.items.map((item, i) => (
				<Track key={item.track.id} track={item} order={i} />
			))}
		</div>
	);
}

export default Songs;
