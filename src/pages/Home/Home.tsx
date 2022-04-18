import './home.scss';
import { useNavigate } from 'react-router-dom';

const Home = ({
  username,
  setUser,
  setLoading,
  setFirst,
}: {
  username: any;
  setUser: any;
  setLoading: any;
  setFirst: any;
}) => {
  const navigate = useNavigate();
  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setFirst(false);
    try {
      const res = await fetch(
        `https://api.github.com/users/${username.current.value}`
      );
      const data = await res.json();
      setUser(data);
      setLoading(false);
      navigate('../user', { replace: true });
    } catch (error) {
      console.log('patladi');
    }
  };

  return (
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
