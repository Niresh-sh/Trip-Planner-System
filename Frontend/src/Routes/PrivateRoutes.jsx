import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = ({ children, allowedRoles }) => {

  const isAuthenticated = localStorage.getItem('token');

 
  const userRole = localStorage.getItem('role') || 'user';  

 
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

 
if (!isAuthenticated || (allowedRoles && !allowedRoles.includes(userRole))) {
    return <Navigate to="/admin" replace />;
  }

  
  return children ? children : <Outlet />;
};

export default PrivateRoute;
