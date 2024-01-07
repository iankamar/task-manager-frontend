import { getUser } from "./userApi";

export const checkTokenValidity = async (token) => {
  try {
    const user = await getUser(token);

    return !!user;
  } catch (error) {
    console.error("Error checking token validity:", error);
    return false;
  }
};
