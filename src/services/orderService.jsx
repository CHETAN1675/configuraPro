const FIREBASE_DB_URL =
  "https://configurapro-default-rtdb.firebaseio.com";

const normalizeEmailKey = (email) => email.replace(".", "_");

//Save a new order for a user
 
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


 // Load all orders for a user

export const loadOrders = async (userEmail) => {
  if (!userEmail) {
    throw new Error("User not authenticated");
  }

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


// Update order status (Cancel, Admin updates, etc.)
export const updateOrderStatus = async (userEmail, orderId, status) => {
  if (!userEmail || !orderId) {
    throw new Error("Missing order details");
  }

  const userKey = normalizeEmailKey(userEmail);

  const response = await fetch(
    `${FIREBASE_DB_URL}/orders/${userKey}/${orderId}.json`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status }),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to update order status");
  }
};
