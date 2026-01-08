const FIREBASE_DB_URL =
  "https://configurapro-default-rtdb.firebaseio.com";

const normalizeEmailKey = (email) =>
  email.replace(".", "_");

export const saveOrder = async (userEmail, order) => {
  if (!userEmail) {
    throw new Error("User not authenticated");
  }

  const userKey = normalizeEmailKey(userEmail);

  const response = await fetch(
    `${FIREBASE_DB_URL}/orders/${userKey}.json`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...order,
        createdAt: Date.now(),
      }),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to save order");
  }

  return response.json();
};
