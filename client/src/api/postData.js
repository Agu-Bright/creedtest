export const postData = async (param, body) => {
	const user = JSON.parse(localStorage.getItem("user"));
	return fetch(`/creedlance${param}`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${user?.token}`,
		},
		body: JSON.stringify(body),
	})
		.then((res) => res)
		.catch((error) => {
			console.error("Error:", error);
			throw error;
		});
};
