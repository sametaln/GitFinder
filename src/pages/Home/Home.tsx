import './home.scss';
import { useNavigate } from 'react-router-dom';
import Loading from '../../pages/Loading/Loading';
import { useState } from 'react';
import axios from 'axios';

const Home = ({
  setUser,
  setLoading,
  loading,
}: {
  setUser: any;
  setLoading: any;
  loading: any;
}) => {
  const [username, setUserName] = useState<any>('');
  const [error, setError] = useState<String>('');
  const [cache, setCache] = useState<Object>({});
  const [cacheTimer, setCacheTimer] = useState<number>(0);
  const navigate = useNavigate();

  const cacheTime: number = 300000;

  const getCacheTimer = (time: number) => {
    const now = new Date().getTime();
    if (cacheTimer < now + time) {
      setCacheTimer(now + time);
    }
    return cacheTimer;
  };

  const fetchUserData = async (username: string) => {
    const res = await axios.get(`https://api.github.com/users/${username}`);
    const data = await res.data;
    return data;
  };

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = await fetchUserData(username);
      setCache({
        username: data,
        time: getCacheTimer(cacheTime),
      });
      setUser(data);
      console.log(cache);
      setLoading(false);
      setError('');
      navigate('../user', { replace: true });
    } catch (err) {
      setLoading(false);
      setError('User not found. Please try again.');
    }
  };

  return loading ? (
    <Loading />
  ) : (
    <div className="home">
      <div className="home-container">
        <img className="home-logo" src="assets/logo.svg" alt="Hipo Logo" />
        <h3 className="home-title">Github Profile Explorer</h3>
        {error ? (
          <div className="load-error">
            <p>{error}</p>
          </div>
        ) : null}
        <form className="home-form" onSubmit={submitHandler}>
          <input
            type="search"
            className="home-input"
            placeholder="Type username"
            onChange={(e) => setUserName(e.target.value)}
          />
          <button className="home-form-button">Search</button>
        </form>
      </div>
    </div>
  );
};

export default Home;
