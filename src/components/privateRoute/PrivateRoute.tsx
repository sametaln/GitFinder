import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children, user }: { children: any; user: any }) => {
  return user ? children : <Navigate to="/" />;
};

export default PrivateRoute;
