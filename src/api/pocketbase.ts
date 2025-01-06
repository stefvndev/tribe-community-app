import PocketBase from "pocketbase";

export const pb = new PocketBase(import.meta.env.VITE_API_BASE_URL);
