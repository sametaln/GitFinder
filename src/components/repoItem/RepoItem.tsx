import './repoitem.scss';

const RepoItem = ({ repo }: { repo: any }) => {
  return (
    <div className="user-repo-item">
      <div className="user-repo-item-left">
        <h2 className="user-repo-item-name">{repo.name}</h2>
        <p className="user-repo-item-description">
          {repo.description ? repo.description : null}
        </p>
      </div>
      <div className="user-repo-item-right">
        <div className="user-repo-item-stats">
          <p className="user-repo-item-stats-count" id="count">
            {repo.stargazers_count}
          </p>
          <label htmlFor="count" className="user-repo-item-stats-count-label">
            Stars
          </label>
        </div>
      </div>
    </div>
  );
};

export default RepoItem;
