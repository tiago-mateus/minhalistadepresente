import { Link } from 'react-router-dom';
import { useUserStore } from '../../store/userStore';
import { Button } from './Button';

export function Header() {
  const { user, logout } = useUserStore();

  return (
    <header className="flex items-center justify-between border-b border-slate-200 bg-white px-6 py-4">
      <Link to="/dashboard" className="text-lg font-semibold text-primary-700">
        🎁 MinhaListaDePresentes
      </Link>
      <div className="flex items-center gap-3 text-sm text-slate-700">
        {user && <span className="hidden sm:block">Olá, {user.name}</span>}
        <Button variant="ghost" onClick={logout}>
          Sair
        </Button>
      </div>
    </header>
  );
}
