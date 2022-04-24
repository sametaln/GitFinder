import { User } from '../../App';
import { Repo } from '../../pages/UserPage/UserPage';

const UserInfo = ({
  userObject,
  repos,
}: {
  userObject: User;
  repos: Repo[];
}) => {
  return (
    <div className="user-info">
      <a
        href={userObject.html_url}
        target="_blank"
        rel="noreferrer"
        className="user-info-link"
      >
        <p className="user-info-link-text">
          View on Github{' '}
          <img
            className="user-info-link-icon"
            src="assets/icon.svg"
            alt="Redirect Icon"
          />
        </p>
      </a>
      <div className="user-info-img">
        <img
          className="user-info-avatar"
          src={userObject.avatar_url}
          alt="User avatar"
        />
      </div>
      <div className="user-info-container">
        <div className="user-info-names">
          {userObject.name ? (
            <h1 className="user-info-name">{userObject.name}</h1>
          ) : null}
          <h2 className="user-info-login">@{userObject.login}</h2>
        </div>

        <div className="user-info-stats">
          <div className="user-stats-repos">
            <p id="length">{repos?.length}</p>
            <label htmlFor="length">Repositories</label>
          </div>
          <div className="user-stats-following">
            <p id="following">
              {userObject.following < 1000
                ? userObject.following
                : `${(userObject.following / 1000).toFixed(1)}k`}
            </p>
            <label htmlFor="following">Following</label>
          </div>
          <div className="user-stats-follower">
            <p id="followers">
              {userObject.followers < 1000
                ? userObject.followers
                : `${(userObject.followers / 1000).toFixed(1)}k`}
            </p>
            <label htmlFor="followers">Followers</label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
