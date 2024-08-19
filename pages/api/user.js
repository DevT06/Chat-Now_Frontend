const URL = "http://localhost:5072/api";

// Get all users
export async function getAllUsers() {
    const response = await fetch(`${URL}/User`);

    if (!response.ok) {
        throw new Error("An error occurred while fetching users");
    }

    const data = await response.json();
    return data;
}

// Get user by ID
export async function getUserById(id) {
    const response = await fetch(`${URL}/user/${id}`);

    if (!response.ok) {
        throw new Error("An error occurred while fetching the user");
    }

    const data = await response.json();
    return data;
}

// Crate a new user
export async function createUser(user) {
    const response = await fetch(`${URL}/User`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
    });

    if (!response.ok) {
        throw new Error("An error occurred while creating the user");
    }

    const data = await response.json();
    return data;
}

// Update a user
export async function updateUser(id, user) {
    const response = await fetch(`${URL}/User/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
    });

    if (!response.ok) {
        throw new Error("An error occurred while updating the user");
    }

    const data = await response;
    return data;
}

// Delete a user
export async function deleteUser(id) {
    const response = await fetch(`${URL}/User/${id}`, {
        method: "DELETE",
    });

    if (!response.ok) {
        throw new Error("An error occurred while deleting the user");
    }
}

// Login user
export async function loginUser(loginData) {
    const response = await fetch(`${URL}/User`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
    });

    if (!response.ok) {
        throw new Error("An error occurred while logging in");
    }

    const data = await response.json();
    return data;
}

export async function getUserByName(name) {
    const response = await fetch(`${URL}/user/name/${name}`);

    if (!response.ok) {
        throw new Error("An error occurred while fetching the user");
    }

    const data = await response.json();
    return data;
}

export async function getUserByEmail(email) {
    const response = await fetch(`${URL}/user/email/${email}`);

    if (!response.ok) {
        throw new Error("An error occurred while fetching the user");
    }

    const data = await response.json();
    return data;
}