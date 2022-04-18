import './home.scss';
import { useNavigate } from 'react-router-dom';
import Loading from '../../pages/Loading/Loading';

const Home = ({
  username,
  setUser,
  setLoading,
  loading,
}: {
  username: any;
  setUser: any;
  setLoading: any;
  loading: any;
}) => {
  const navigate = useNavigate();
  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const res = await fetch(
      `https://api.github.com/users/${username.current.value}`
    );
    const data = await res.json();
    setUser(data);
    console.log(data);
    setLoading(false);
    navigate('../user', { replace: true });
  };

  return loading ? (
    <Loading error={null} />
  ) : (
    <div className="home">
      <div className="home-container">
        <img className="home-logo" src="assets/logo.svg" alt="Hipo Logo" />
        <h3 className="home-title">Github Profile Explorer</h3>
        <form className="home-form" onSubmit={submitHandler}>
          <input
            type="search"
            className="home-input"
            placeholder="Type username"
            ref={username}
          />
          <button className="home-form-button">Search</button>
        </form>
      </div>
    </div>
  );
};

export default Home;
