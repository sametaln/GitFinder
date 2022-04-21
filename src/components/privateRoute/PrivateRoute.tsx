import { Navigate } from 'react-router-dom';
import { User } from '../../App';

type privRoute = {
  children: React.ReactNode;
  user: User;
};

const PrivateRoute = ({ children, user }: privRoute) => {
  return <>{user ? children : <Navigate to="/" />}</>;
};

export default PrivateRoute;
