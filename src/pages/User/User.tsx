import './user.scss';

const User = (user: any) => {
  console.log(user.user.name);
  return <div>{user.user.name}</div>;
};

export default User;
