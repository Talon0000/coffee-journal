async function authenticate(mode, email, password) {
	const url = `https://identitytoolkit.googleapis.com/v1/accounts:${mode}?key=${process.env.EXPO_PUBLIC_FIREBASE_API_KEY}`;

	const response = await fetch(url, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ email, password, returnSecureToken: true }),
	});

	if (!response.ok) {
		throw new Error("Failed to create a user");
	}

	const data = await response.json();
	return data.idToken;
}

export const signUp = (email, password) => {
	return authenticate("signUp", email, password);
};

export const login = (email, password) => {
	return authenticate("signInWithPassword", email, password);
};
