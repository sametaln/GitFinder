import './home.scss';
import { useNavigate } from 'react-router-dom';
import Loading from '../../pages/Loading/Loading';
import { useState } from 'react';
import { fetchUserData, getWithTime } from '../../utils/fetch.utils';
const Home = ({
  setUser,
  setLoading,
  loading,
}: {
  setUser: Function;
  setLoading: Function;
  loading: boolean;
}) => {
  const [username, setUserName] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // FETCHING DATA AFTER FORM SUBMIT

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      // IF USER IS NOT STORED IN LOCAL STORAGE
      if (!getWithTime(username)) {
        const data = await fetchUserData(username);
        setUser(data);
        setLoading(false);
        setError('');
        navigate('../user', { replace: true });
      }
      // IF USER IS STORED IN LOCAL STORAGE
      else {
        setUser(getWithTime(username));
        setLoading(false);
        setError('');
        navigate('../user', { replace: true });
      }
    } catch (err) {
      // IF THERE IS NO USER
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
