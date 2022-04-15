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
    const res = await fetch(`https://jsonplaceholder.typicode.com/users`);
    const data = await res.json();
    setUser(data[2]);
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

/// STYLE USER PAGE
/// LEARN SKELETON PACKAGE
/// LEARN TYPESCRIPT MORE
/// lEARN GITHUB API
