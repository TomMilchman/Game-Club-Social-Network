import { useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

export default function RootLayout() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname === '/') {
      navigate('/feed');
    }
  }, []); 

  return (
    <div className="root-layout">
      <p>This is the root</p>
      <Outlet />
    </div>
  );
}