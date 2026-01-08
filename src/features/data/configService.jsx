const FIREBASE_DB_URL =
  "https://configurapro-default-rtdb.firebaseio.com";

/* Save new configuration */
export const saveConfiguration = async (userId, configuration) => {
  if (!userId) throw new Error("User not authenticated");

  const response = await fetch(
    `${FIREBASE_DB_URL}/configurations/${userId}.json`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...configuration,
        createdAt: Date.now(),
      }),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to save configuration");
  }

  return response.json(); // generated id
};

export const loadConfigurations = async (userId) => {
  if (!userId) throw new Error("User not authenticated");

  const response = await fetch(
    `${FIREBASE_DB_URL}/configurations/${userId}.json`
  );

  if (!response.ok) {
    throw new Error("Failed to load configurations");
  }

  const data = await response.json();
  if (!data) return [];

  return Object.entries(data).map(([id, config]) => ({
    id,
    ...config,
  }));
};


export const updateConfiguration = async (
  userId,
  configId,
  configuration
) => {
  const response = await fetch(
    `${FIREBASE_DB_URL}/configurations/${userId}/${configId}.json`,
    {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...configuration,
        updatedAt: Date.now(),
      }),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to update configuration");
  }
};

export const deleteConfiguration = async (userId, configId) => {
  const response = await fetch(
    `${FIREBASE_DB_URL}/configurations/${userId}/${configId}.json`,
    {
      method: "DELETE",
    }
  );

  if (!response.ok) {
    throw new Error("Failed to delete configuration");
  }
};
