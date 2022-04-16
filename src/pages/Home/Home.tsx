import './home.scss';

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
  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setFirst(false);
    try {
      const res = await fetch(
        `https://api.github.com/users/${username.current.value.split('@')[1]}`
      );
      const data = await res.json();
      setUser(data);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  return (
    <div className="home">
      <div className="home-container">
        <img className="home-logo" src="assets/logo.svg" alt="Hipo Logo" />
        <h3 className="home-title">Github Profile Explorer</h3>
        <form className="home-form" onSubmit={submitHandler}>
          <input
            type="search"
            defaultValue="@"
            className="home-input"
            placeholder="Type username"
            ref={username}
          />
        </form>
      </div>
    </div>
  );
};

export default Home;
