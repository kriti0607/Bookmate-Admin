export interface LoginResponse {
  message: string;
  token?: string;
  error?: string;
}

export const loginUser = async (
  email: string,
  password: string
): Promise<LoginResponse> => {
  try {
    const response = await fetch("http://34.47.141.148:3000/user-login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data: LoginResponse = await response.json();
    console.log("Login API Response:", data);
    return data;
  } catch (error) {
    console.error("Login API Error:", error);
    throw error;
  }
};
