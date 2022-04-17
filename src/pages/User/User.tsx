import './user.scss';
import { useEffect, useState } from 'react';
import Repos from '../../components/Repos/Repos';
import { Link } from 'react-router-dom';

const User = (user: any) => {
  const [repos, setRepos] = useState<any[]>([]);
  const [count, setCount] = useState(2);
  useEffect(() => {
    try {
      fetch(`https://api.github.com/users/${user.user.login}/repos`)
        .then((res) => res.json())
        .then((data) => {
          setRepos(data);
        });
    } catch (e) {
      console.error('patladi');
    }
  }, [user.user.login]);

  const handleClick = () => {
    if (count > repos.length) {
      setCount(repos.length + 1);
      return;
    }
    setCount(count + 2);
  };

  repos.sort(
    (a: { stargazers_count: number }, b: { stargazers_count: number }) => {
      if (a.stargazers_count > b.stargazers_count) return -1;
      if (a.stargazers_count < b.stargazers_count) return 1;
      return 0;
    }
  );

  return (
    <div className="user-wrapper">
      <div className="user">
        <div className="user-info">
          <a
            href={user.user.html_url}
            target="_blank"
            rel="noreferrer"
            className="user-info-link"
          >
            View on Github
          </a>
          <div className="user-info-img">
            <img
              className="user-info-avatar"
              src={user.user.avatar_url}
              alt="User avatar"
            />
          </div>
          <div className="user-info-container">
            <div className="user-info-names">
              {user.user.name ? (
                <h1 className="user-info-name">{user.user.name}</h1>
              ) : null}
              <h2 className="user-info-login">@{user.user.login}</h2>
            </div>

            <div className="user-info-stats">
              <div className="user-stats-repos">
                <p id="length">{repos?.length}</p>
                <label htmlFor="length">Repositories</label>
              </div>
              <div className="user-stats-following">
                <p id="following">
                  {user.user.following < 1000
                    ? user.user.following
                    : `${(user.user.following / 1000).toFixed(1)}k`}
                </p>
                <label htmlFor="following">Following</label>
              </div>
              <div className="user-stats-follower">
                <p id="followers">
                  {user.user.followers < 1000
                    ? user.user.followers
                    : `${(user.user.followers / 1000).toFixed(1)}k`}
                </p>
                <label htmlFor="followers">Followers</label>
              </div>
            </div>
          </div>
        </div>
        <div className="repo-container">
          <h1 className="repo-container-title">Repositories</h1>
          <Repos repos={repos.slice(0, count)} />
          <div className="repo-container-buttons">
            <button className="user-load" onClick={handleClick}>
              Load More
            </button>
            <Link className="user-load" to="/">
              Go Back
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default User;
