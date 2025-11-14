import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = ({ children, allowedRoles }) => {
  // Use token to check if the user is authenticated
  const isAuthenticated = localStorage.getItem('token');

  // Retrieve the role from localStorage
  const userRole = localStorage.getItem('role') || 'user';  // Default to 'user' if not found

  // If not authenticated, redirect to login page
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  // If user role doesn't match allowedRoles, redirect to the home page or other fallback
if (!isAuthenticated || (allowedRoles && !allowedRoles.includes(userRole))) {
    return <Navigate to="/admin" replace />;
  }

  // If a child element is passed, render it. Otherwise, render the Outlet (for nested routes)
  return children ? children : <Outlet />;
};

export default PrivateRoute;
