import { NavLink } from 'react-router-dom';

const linkStyle = ({ isActive }: { isActive: boolean }) =>
  `flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold transition ${
    isActive ? 'bg-primary-50 text-primary-700' : 'text-slate-700 hover:bg-slate-100'
  }`;

export function Sidebar() {
  return (
    <aside className="hidden w-64 border-r border-slate-200 bg-white p-4 md:block">
      <nav className="flex flex-col gap-2">
        <NavLink to="/dashboard" className={linkStyle} end>
          Visão geral
        </NavLink>
        <NavLink to="/dashboard/lists/new" className={linkStyle}>
          Criar nova lista
        </NavLink>
      </nav>
    </aside>
  );
}
