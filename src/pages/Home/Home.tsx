import './home.scss';

const Home = () => {
  return (
    <div className="home">
      <div className="home-container">
        <img className="home-logo" src="assets/logo.svg" alt="Hipo Logo" />
        <h3 className="home-title">Github Profile Explorer</h3>
        <input
          type="search"
          className="home-input"
          placeholder="Type username"
        />
      </div>
    </div>
  );
};

export default Home;
