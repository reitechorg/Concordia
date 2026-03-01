const zeroToNine = '0123456789';
export const generateRandomUsername = createRandomizer([
	[
		'Cute',
		'Brave',
		'Smart',
		'Funny',
		'Happy',
		'Kind',
		'Cool',
		'Awesome',
		'Lovely',
		'Charming',
		'Gentle',
		'Wise',
		'Graceful',
		'Gorgeous',
		'Handsome',
		'Beautiful',
		'Pretty',
		'Sweet',
		'Adorable',
	],
	[
		'Fox',
		'Foxie',
		'Cat',
		'Kitty',
	],
	zeroToNine,
	zeroToNine,
	zeroToNine,
	zeroToNine,
]);


type RandomizerConfig = (string|string[])[];
function createRandomizer(config: RandomizerConfig): () => string {
	return () => {
		let randomString = '';
		for (const randomizer of config) {
			randomString += randomizer[Math.floor(Math.random() * randomizer.length)];
		}
		return randomString;
	};
}
