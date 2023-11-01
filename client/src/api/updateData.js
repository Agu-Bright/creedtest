export const updateData = async (param, body) => {
  const user = JSON.parse(localStorage.getItem("user"));

  return fetch(`/creedlance${param}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: user ? `Bearer ${user.token}` : "",
    },
    body: body ? JSON.stringify(body) : "",
  })
    .then((res) => res)
    .catch((error) => {
      console.error("Error:", error);
      throw error;
    });
};
