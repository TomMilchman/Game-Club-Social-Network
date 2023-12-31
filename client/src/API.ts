const BASE_URL = "http://localhost:3000";

export const makeRequest = async (
  url: string,
  method: string,
  body: any = null
) => {
  try {
    const response = await fetch(`${BASE_URL}${url}`, {
      method,
      credentials: "include",
      headers: body ? { "Content-Type": "application/json" } : {},
      body: body ? JSON.stringify(body) : null,
    });

    const responseData = await response.json();

    if (!response.ok) {
      console.error(responseData.message);
    }

    return { ok: response.ok, data: responseData };
  } catch (error) {
    console.error("Error:", error);
    return { ok: false, data: null };
  }
};
