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

export const loadOrders = async (userEmail) => {
  if (!userEmail) throw new Error("User not authenticated");

  const userKey = normalizeEmailKey(userEmail);

  const response = await fetch(
    `${FIREBASE_DB_URL}/orders/${userKey}.json`
  );

  if (!response.ok) {
    throw new Error("Failed to load orders");
  }

  const data = await response.json();
  if (!data) return [];

  return Object.entries(data).map(([id, order]) => ({
    id,
    ...order,
  }));
};