export async function getUser(userId: string) {
    const response = await fetch(`${import.meta.env.VITE_USER_PROFILE}/${userId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    });

    const json = await response.json();

    if (!json.success) {
        throw new Error("failed to fetch user profile");
    }

    return json.data;
}