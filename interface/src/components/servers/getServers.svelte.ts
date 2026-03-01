import type { Server } from "../../types/LocalData";

const serverList: { servers: Server[] } = $state({ servers: [] });

async function loadServers() {
	serverList.servers = JSON.parse(localStorage.getItem("servers") || "[]");
}

const initServerListStorage = () => {
	loadServers();
	$effect(() => {
		localStorage.setItem("servers", JSON.stringify(serverList.servers));
	});
};

export { serverList, initServerListStorage };
