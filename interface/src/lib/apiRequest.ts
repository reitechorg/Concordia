export default async function apiRequest(method: "POST" | "GET" | "DELETE", url: string, body?: any, token?: string) {
	try {
		const response = await fetch(url, {
			method: method,
			headers: {
				"Content-Type": "application/json",
				"authorization": token ?? "",
			},
			body: body ? JSON.stringify(body) : undefined,
		});

		if (response.status !== 200) return false;

		const data = await response.json();
		return data;
	} catch (e) {
		console.error("Error in apiRequest", e);
	}
}
