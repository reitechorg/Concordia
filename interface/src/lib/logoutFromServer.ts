import apiRequest from "$lib/apiRequest";
import { serverList } from "../components/servers/getServers.svelte";
import type { Server } from "../types/LocalData";

export default async function logoutFromServer(server: Server) {
	const newServers = serverList.servers.filter((s) => s.token !== server.token);
	serverList.servers = newServers;

	await apiRequest("DELETE", `${server.serverUrl}/logout`, {}, server.token);

	localStorage.setItem("servers", JSON.stringify(newServers));

	return newServers;
}
