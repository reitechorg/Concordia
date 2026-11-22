import Store from 'electron-store';

const storage = new Store({
	encryptionKey: '123',
	encryptionAlgorithm: 'aes-256-cbc',
});

export default storage;
