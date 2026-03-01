// import { Menu } from "@tauri-apps/api/menu";
// import { TrayIcon, type TrayIconEvent } from "@tauri-apps/api/tray";
// import type { Window } from "@tauri-apps/api/window";
// import { exit, relaunch } from "@tauri-apps/plugin-process";

export default async function InitTray(window: Window) {
	// TODO: Replace with Electrons API
	// function onTrayMenuClick(itemId: string) {
	// 	switch (itemId) {
	// 		case "quit":
	// 			exit(0);
	// 			break;
	// 		case "show":
	// 			console.log(window);
	// 			window.show();
	// 			break;
	// 		case "reload":
	// 			relaunch();
	// 			break;
	// 	}
	// }
	// const menu = await Menu.new({
	// 	items: [
	// 		{
	// 			id: "show",
	// 			text: "Focus",
	// 			action: onTrayMenuClick,
	// 		},
	// 		{
	// 			id: "reload",
	// 			text: "Reload",
	// 			action: onTrayMenuClick,
	// 		},
	// 		{
	// 			id: "quit",
	// 			text: "Quit",
	// 			action: onTrayMenuClick,
	// 		},
	// 	],
	// });
	// const options = {
	// 	menu,
	// 	title: "concordia",
	// 	showMenuOnLeftClick: false,
	// 	icon: "icons/32x32.png",
	// 	action: (event: TrayIconEvent) => {
	// 		switch (event.type) {
	// 			case "Click":
	// 				console.log(window);
	// 				window.show();
	// 				break;
	// 		}
	// 	},
	// };
	// const tray = await TrayIcon.new(options);
}
