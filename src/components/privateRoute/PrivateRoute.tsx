import { Navigate } from 'react-router-dom';
import { User } from '../../App';

type privRoute = {
  children: React.ReactNode;
  user: User;
};

// TO NAVIGATE TO /USER ROUTE, FIRST CHECK IF THERE IS A USER. IF NOT, REDIRECT TO / (INDEX ROUTE)

const PrivateRoute = ({ children, user }: privRoute) => {
  return <>{user ? children : <Navigate to="/" />}</>;
};

export default PrivateRoute;
