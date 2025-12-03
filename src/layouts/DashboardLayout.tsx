import { Outlet, Navigate } from 'react-router-dom';
import { Sidebar } from '../components/ui/Sidebar';
import { Header } from '../components/ui/Header';
import { useUserStore } from '../store/userStore';

export function DashboardLayout() {
  const { user } = useUserStore();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar />
      <div className="flex flex-1 flex-col">
        <Header />
        <main className="flex-1 px-4 py-6 md:px-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
