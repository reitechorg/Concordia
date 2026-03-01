export const validateUsername = (username: string) => {
	username = username.trim();
	if (username.length < 3 || username.length > 20) return "Username must be between 3 and 20 characters";
	if (!/^[a-zA-Z0-9]+$/g.test(username)) return "Username must be alphanumeric";
	return true;
};

export const validatePassword = (password: string) => {
	password = password.trim();
	if (!/[0-9]+/g.test(password)) return "Password must contain at least one number";
	if (!/[a-z]+/g.test(password)) return "Password must contain at least one lowercase letter";
	if (!/[A-Z]+/g.test(password)) return "Password must contain at least one uppercase letter";
	return true;
};

export const validateUrl = (url: string) => {
	url = url.trim();
	if (!/^(http|https):\/\/[^ "]+$/.test(url)) return "Invalid URL";
	return true;
}
