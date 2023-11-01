export const deleteData = async (param) => {
	const user = JSON.parse(localStorage.getItem("user"));
	return fetch(
		`/creedlance${param}`,
        
		user
			? {
                    method: "DELETE",
					headers: {
						Authorization: `Bearer ${user.token}`,
					},
			  }
			: {}
	)
		.then((response) => {
			if (!response.ok) {
				throw new Error("Network response was not ok.");
			}
			return response.json();
		})
		.then((res) => {
			let data = res.data;
			return data;
		})
		.catch((error) => {
			console.error("Error:", error);
			throw error;
		});
};
