import './repoitem.scss';

const RepoItem = ({ repo }: { repo: any }) => {
  return (
    <div className="user-repo-item" key={repo.id}>
      <h2 className="user-repo-item-name">{repo.name}</h2>
      <p className="user-repo-item-description">
        {repo.description ? repo.description : ''}
      </p>
    </div>
  );
};

export default RepoItem;
