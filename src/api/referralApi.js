// src/api/referralApi.js

import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Get 30-level referral tree
export const getReferralTree = async (token) => {
  try {
    const res = await axios.get(`${BASE_URL}/api/referral/tree`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (err) {
    throw err.response?.data?.message || 'Error fetching referral tree';
  }
};

// Get referral earnings history (optional if implemented later)
export const getReferralEarnings = async (token) => {
  try {
    const res = await axios.get(`${BASE_URL}/api/referral/earnings`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (err) {
    throw err.response?.data?.message || 'Error fetching referral earnings';
  }
};
