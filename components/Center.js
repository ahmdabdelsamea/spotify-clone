import { useState, useEffect } from 'react';
import { shuffle } from 'lodash';
import { useSession } from 'next-auth/react';
import { ChevronDownIcon } from '@heroicons/react/outline';

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

function Center() {
	const { data: session } = useSession();
	const [color, setColor] = useState(null);

	useEffect(() => {
		setColor(shuffle(colors).pop());
	}, []);

	return (
		<div className='flex-grow '>
			<header className='absolute top-5 right-8'>
				<div className='flex items-center bg-red-300 space-x-3 opacity-90 hover:opacity-80 cursor-pointer rounded-full p-1 pr-2'>
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
				className={`flex items-end space-x-7 bg-gradient-to-b ${color} to-black h-80 padding-8 text-white`}
			>
				{/* <img src='' alt=''/> */}
				{/* <h1>Hello World</h1> */}
			</section>
		</div>
	);
}

export default Center;
