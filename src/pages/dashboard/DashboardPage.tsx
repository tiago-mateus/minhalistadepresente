import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { listsService } from '../../services/listsService';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { EmptyState } from '../../components/ui/EmptyState';

export function DashboardPage() {
  const { data, isLoading } = useQuery({ queryKey: ['lists'], queryFn: listsService.getLists });

  if (isLoading) {
    return <p className="text-sm text-slate-600">Carregando listas...</p>;
  }

  if (!data || data.length === 0) {
    return (
      <EmptyState
        title="Nenhuma lista ainda"
        description="Crie sua primeira lista de presentes em minutos."
        action={
          <Link to="/dashboard/lists/new">
            <Button>Criar nova lista</Button>
          </Link>
        }
      />
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Minhas listas</h1>
          <p className="text-sm text-slate-600">Visualize e edite suas listas de presentes.</p>
        </div>
        <Link to="/dashboard/lists/new">
          <Button>Criar nova lista</Button>
        </Link>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {data.map((list) => (
          <Card key={list.id} className="flex flex-col gap-3">
            <img
              src={list.coverImage}
              alt={list.name}
              className="h-40 w-full rounded-xl object-cover"
            />
            <div className="flex flex-1 flex-col gap-2">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="text-lg font-semibold text-slate-900">{list.name}</h3>
                  <p className="text-sm text-slate-600 overflow-hidden text-ellipsis">{list.description}</p>
                </div>
                <span className="rounded-full bg-primary-50 px-3 py-1 text-xs font-semibold text-primary-700">
                  {list.items.length} itens
                </span>
              </div>
              <div className="flex items-center justify-between text-sm text-slate-600">
                <span>Evento em {new Date(list.eventDate).toLocaleDateString('pt-BR')}</span>
                <Link to={`/dashboard/lists/${list.id}/edit`} className="font-semibold text-primary-600">
                  Editar
                </Link>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
