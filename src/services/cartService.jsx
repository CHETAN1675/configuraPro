import { setCart } from "../features/cart/cartSlice";

const FIREBASE_DB_URL =
  "https://configurapro-default-rtdb.firebaseio.com";

const normalizeEmailKey = (email) =>
  email.replace(/\./g, "_");

/* LOAD CART */
export const loadCart = (email) => async (dispatch) => {
  if (!email) return;

  const key = normalizeEmailKey(email);

  const response = await fetch(
    `${FIREBASE_DB_URL}/carts/${key}.json`
  );

  if (!response.ok) return;

  const data = await response.json();
  dispatch(setCart(data || []));
};

/* SAVE CART */
export const saveCart = (email, items) => async (dispatch) => {
  if (!email) return;

  const key = normalizeEmailKey(email);

  await fetch(
    `${FIREBASE_DB_URL}/carts/${key}.json`,
    {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(items),
    }
  );

  dispatch(setCart(items));
};
