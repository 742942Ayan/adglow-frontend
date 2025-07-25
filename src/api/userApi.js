// src/api/userApi.js

import axios from "axios";

export const getUserWallet = async (token) => {
  const response = await axios.get(
    "https://adglow-backend.onrender.com/api/user/wallet",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};
