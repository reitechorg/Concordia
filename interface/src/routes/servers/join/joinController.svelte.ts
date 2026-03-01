import { goto } from "$app/navigation";
import { getServerStatus } from "$lib/getServerStatus";
import type { ServerStatus } from "../../../types/ServerStatus";

type JoinData = {
	url: string | undefined;
	serverStatus: ServerStatus | undefined;
};

export const joinData = $state<JoinData>({
	url: undefined,
	serverStatus: undefined,
});

export async function openJoinServerPage(url: string) {
	try {
		new URL(url);
	} catch (e) {
		console.error("Invalid server url");
		return;
	}

	const serverData = await getServerStatus(url);

	if (!serverData) {
		console.error("Server did not return status");
		return;
	}

	joinData.url = url;
	joinData.serverStatus = serverData;

	goto("/servers/join");
}
