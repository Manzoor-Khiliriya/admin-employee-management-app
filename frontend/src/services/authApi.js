const API_URL = `${process.env.REACT_APP_API_BASE_URL}/api/v1`;

export async function loginUser(credentials, navigate) {
  try {
    const response = await fetch(`${API_URL}/authenticate/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });

    const result = await response.json();
    if (!response.ok) {
      throw new Error(result.error || "Login failed");
    }

    const { token, username } = result.data;
    localStorage.setItem("token", token);
    localStorage.setItem("username", username);

    navigate("/home");
  } catch (error) {
    throw error;
  }
}

export async function signUpUser(signUpData, navigate) {
  try {
    const response = await fetch(`${API_URL}/authenticate/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(signUpData),
    });

    const result = await response.json();
    if (!response.ok) {
      throw new Error(result.error || "Sign-up failed");
    }

    const { token, username } = result.data;
    localStorage.setItem("token", token);
    localStorage.setItem("username", username);

    navigate("/home");
  } catch (error) {
    throw error;
  }
}
