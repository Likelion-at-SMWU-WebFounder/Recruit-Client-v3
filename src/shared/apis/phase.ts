import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const getServerTime = async () => {
  const res = await axios.get(`${BASE_URL}/api/recruit/time`);
  return res.data.serverTime;
};
