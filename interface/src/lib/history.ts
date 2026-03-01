const history: string[] = [];

export function pushHistory(item: string) {
	history.push(item);
}

export function popHistory() {
	return history.pop();
}
