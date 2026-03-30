
import { Navigate } from 'react-router-dom';

export const ProtectedAdmin = ({ children }: { children: React.ReactNode }) => {
  const token = localStorage.getItem('adminToken');
  if (!token) {
    return <Navigate to="/admin" replace />;
  }
  return <>{children}</>;
};
