import {ColorData, colorsData} from '@/data/colors';
import type {NextPage} from 'next';
import Head from 'next/head';
import {useState} from 'react';

const getHue = (color: ColorData) => {
	const hex = color.HEX.substring(1);
	const r = parseInt(hex.substring(0, 2), 16) / 255;
	const g = parseInt(hex.substring(2, 4), 16) / 255;
	const b = parseInt(hex.substring(4, 6), 16) / 255;

	const max = Math.max.apply(Math, [r, g, b]);
	const min = Math.min.apply(Math, [r, g, b]);

	let chr = max - min;
	let hue = 0;
	let val = max;
	let sat = 0;

	if (val > 0) {
		sat = chr / val;
		if (sat > 0) {
			if (r === max) {
				hue = 60 * ((g - min - (b - min)) / chr);
				if (hue < 0) {
					hue += 360;
				}
			} else if (g === max) {
				hue = 120 + 60 * ((b - min - (r - min)) / chr);
			} else if (b === max) {
				hue = 240 + 60 * ((r - min - (g - min)) / chr);
			}
		}
	}

	return hue;
};

const ColorCard = ({color}: {color: ColorData}) => {
	const [isClicked, setIsClicked] = useState(false);

	const handleClick = () => {
		setIsClicked(prev => !prev);
	};

	return (
		<div
			className='flex h-80 w-64 items-center rounded-md justify-center bg-gradient-to-b from-zinc-100 to-zinc-300'
			onClick={handleClick}
		>
			{isClicked ? (
				<div className='text-lg font-bold'>
					<p>{color.name}</p>
					<p>{color.HEX}</p>
					<p>{color.RGB}</p>
				</div>
			) : (
				<div
					className='h-32 w-32 rounded-full drop-shadow-lg'
					style={{backgroundColor: color.HEX}}
				></div>
			)}
		</div>
	);
};

const Home: NextPage = () => {
	return (
		<div className='flex min-h-screen flex-col items-center justify-center py-2'>
			<Head>
				<title>find a color</title>
			</Head>

			<main className='flex w-full flex-1 flex-col items-center justify-center px-20 text-center'>
				<h1 className='my-6 text-5xl font-bold'>find a color</h1>

				<div className='flex flex-wrap content-center justify-center gap-4'>
					{colorsData
						.sort((a, b) => getHue(b) - getHue(a))
						.map(color => (
							<ColorCard key={color.HEX} color={color} />
						))}
				</div>
			</main>

			<footer className='flex h-24 w-full items-center justify-center'>
				<a
					className='flex items-center justify-center gap-2'
					href='https://github.com/pnxdxt'
					target='_blank'
					rel='noopener noreferrer'
				>
					Made with 🖤 by <b>pnxdxt</b>
				</a>
			</footer>
		</div>
	);
};

export default Home;
