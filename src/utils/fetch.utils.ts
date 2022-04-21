import axios from 'axios';

export const fetchRepos = async <T>(username: string): Promise<T> => {
  const res = await axios.get(`https://api.github.com/users/${username}/repos`);
  return await res.data;
};

export const fetchUserData = async <T>(username: string): Promise<T> => {
  const res = await axios.get(`https://api.github.com/users/${username}`);
  return await res.data;
};
