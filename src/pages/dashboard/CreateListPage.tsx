import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { ListForm } from '../../components/forms/ListForm';
import { Card } from '../../components/ui/Card';
import { listsService } from '../../services/listsService';

export function CreateListPage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: listsService.createList,
    onSuccess: (list) => {
      queryClient.invalidateQueries({ queryKey: ['lists'] });
      navigate(`/dashboard/lists/${list.id}/edit`);
    },
  });

  return (
    <div className="mx-auto max-w-2xl space-y-4">
      <div className="space-y-1">
        <h1 className="text-2xl font-bold text-slate-900">Criar nova lista</h1>
        <p className="text-sm text-slate-600">Adicione os detalhes do evento e personalize a capa.</p>
      </div>
      <Card>
        <ListForm onSubmit={(values) => mutation.mutate(values)} loading={mutation.isPending} />
      </Card>
    </div>
  );
}
