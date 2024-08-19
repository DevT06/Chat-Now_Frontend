const URL = "http://localhost:5072/api";

export async function authUser(userCreds) {
    const response = await fetch(`${URL}/AuthUser`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(userCreds),
    });

    if (!response.ok) {
        throw new Error("An error occurred while creating the user");
    }

    const data = await response.json();
    return data;
}