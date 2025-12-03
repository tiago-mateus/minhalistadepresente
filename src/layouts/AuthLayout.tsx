import { Outlet, Navigate, useLocation } from 'react-router-dom';
import { useUserStore } from '../store/userStore';

export function AuthLayout() {
  const { user } = useUserStore();
  const location = useLocation();

  if (user) {
    return <Navigate to="/dashboard" state={{ from: location }} replace />;
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-primary-50 via-white to-slate-50 px-4">
      <div className="w-full max-w-lg rounded-3xl border border-slate-200 bg-white p-8 shadow-xl">
        <Outlet />
      </div>
    </div>
  );
}
