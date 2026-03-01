import type { ServerStatus } from "../types/ServerStatus";

export const getServerStatus = async (url: string) => {
	const response = await fetch(`${url}/status`);
	if (response.status !== 200) {
		throw new Error(`Server responded with status ${response.status}`);
	}

	const data: ServerStatus = await response.json();
	return data;
};
