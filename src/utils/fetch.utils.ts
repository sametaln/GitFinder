import axios from 'axios';
import { User } from '../App';
import { Repo } from '../pages/UserPage/UserPage';

// UTILITY FUNCTIONS FOR DATA FETCHING

export const fetchRepos = async <T>(username: string): Promise<T> => {
  const res = await axios.get(`https://api.github.com/users/${username}/repos`);
  const data = await res.data;
  data.sort(
    (a: { stargazers_count: number }, b: { stargazers_count: number }) => {
      if (a.stargazers_count > b.stargazers_count) return -1;
      if (a.stargazers_count < b.stargazers_count) return 1;
      return 0;
    }
  );
  setWithTime(username + '/repo', data, 1000 * 60 * 5);
  return data;
};

export const fetchUserData = async <T>(username: string): Promise<T> => {
  const res = await axios.get(`https://api.github.com/users/${username}`);
  const data = await res.data;
  setWithTime(username, data, 1000 * 60 * 5);
  return data;
};

// INTERACTING WITH LOCAL STORAGE TO CACHE DATA

const setWithTime = (key: string, data: User | Repo, timeout: number) => {
  const now = new Date();

  const item = {
    data,
    expiry: now.getTime() + timeout,
  };

  localStorage.setItem(key, JSON.stringify(item));
};

export const getWithTime = (key: string) => {
  const item = localStorage.getItem(key);

  if (!item) {
    return null;
  }

  const parsedItem = JSON.parse(item);
  const now = new Date();

  if (now.getTime() > parsedItem.expiry) {
    localStorage.removeItem(key);
    return null;
  }

  return parsedItem.data;
};
