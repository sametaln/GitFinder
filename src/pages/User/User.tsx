import './user.scss';
import { useEffect, useState } from 'react';
import Repos from '../../components/Repos/Repos';

const User = (user: any) => {
  const [repos, setRepos] = useState<any[]>([]);
  const [count, setCount] = useState(2);
  useEffect(() => {
    fetch(`https://api.github.com/users/${user.user.login}/repos`)
      .then((res) => res.json())
      .then((data) => {
        setRepos(data);
      });
  }, [user.user.login]);

  const handleClick = () => {
    if (count > repos.length) {
      setCount(repos.length + 1);
      return;
    }
    setCount(count + 2);
  };

  return (
    <div className="user-wrapper">
      <div className="user">
        <div className="user-info">
          <div className="user-info-img">
            <img
              className="user-info-avatar"
              src={user.user.avatar_url}
              alt="User avatar"
            />
          </div>
          <div className="user-info-container">
            {user.user.name ? (
              <h1 className="user-info-name">{user.user.name}</h1>
            ) : null}
            <h2 className="user-info-login">@{user.user.login}</h2>
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
          <button className="user-load" onClick={handleClick}>
            LOAD MORE
          </button>
        </div>
      </div>
    </div>
  );
};

export default User;
