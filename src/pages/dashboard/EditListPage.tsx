import { useMemo, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { ListForm } from '../../components/forms/ListForm';
import { ItemForm } from '../../components/forms/ItemForm';
import { Card } from '../../components/ui/Card';
import { Modal } from '../../components/ui/Modal';
import { listsService } from '../../services/listsService';
import { itemsService } from '../../services/itemsService';
import type { Item } from '../../types/Item';
import { generateId } from '../../utils';

export function EditListPage() {
  const { id } = useParams<{ id: string }>();
  const queryClient = useQueryClient();
  const [editItem, setEditItem] = useState<Item | null>(null);
  const [addKey, setAddKey] = useState('new');

  const { data: list, isLoading } = useQuery({
    queryKey: ['list', id],
    queryFn: () => listsService.getList(id!),
    enabled: Boolean(id),
  });

  const updateList = useMutation({
    mutationFn: (values: Partial<typeof list>) => listsService.updateList(id!, values),
    onSuccess: (updated) => {
      queryClient.setQueryData(['list', id], updated);
      queryClient.invalidateQueries({ queryKey: ['lists'] });
    },
  });

  const addItem = useMutation({
    mutationFn: (values: Partial<Item>) => itemsService.addItem(id!, values),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['list', id] });
      queryClient.invalidateQueries({ queryKey: ['lists'] });
      setAddKey(generateId());
    },
  });

  const updateItem = useMutation({
    mutationFn: (values: Partial<Item>) => itemsService.updateItem(id!, editItem!.id, values),
    onSuccess: (updatedItem) => {
      queryClient.setQueryData(['list', id], (old: any) => {
        if (!old) return old;
        return { ...old, items: old.items.map((i: Item) => (i.id === updatedItem.id ? updatedItem : i)) };
      });
      setEditItem(null);
    },
  });

  const deleteItem = useMutation({
    mutationFn: (itemId: string) => itemsService.deleteItem(id!, itemId),
    onSuccess: (removedId) => {
      queryClient.setQueryData(['list', id], (old: any) => {
        if (!old) return old;
        return { ...old, items: old.items.filter((i: Item) => i.id !== removedId) };
      });
      queryClient.invalidateQueries({ queryKey: ['lists'] });
    },
  });

  const sortedItems = useMemo(
    () => [...(list?.items ?? [])].sort((a, b) => a.name.localeCompare(b.name)),
    [list?.items]
  );

  if (isLoading || !list) {
    return <p className="text-sm text-slate-600">Carregando lista...</p>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-primary-600">Editar lista</p>
          <h1 className="text-2xl font-bold text-slate-900">{list.name}</h1>
          <p className="text-sm text-slate-600">Atualize detalhes e gerencie os itens.</p>
        </div>
        <Link to={`/lista/${list.slug}`} className="text-sm font-semibold text-primary-600" target="_blank" rel="noreferrer">
          Ver página pública ↗
        </Link>
      </div>

      <Card>
        <ListForm
          initialData={list}
          onSubmit={(values) => updateList.mutate(values)}
          loading={updateList.isPending}
          submitLabel="Salvar alterações"
        />
      </Card>

      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-1">
          <h3 className="mb-3 text-lg font-semibold text-slate-900">Adicionar item</h3>
          <ItemForm key={addKey} onSubmit={(values) => addItem.mutate(values)} submitLabel="Adicionar" />
        </Card>

        <Card className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-slate-900">Itens da lista</h3>
            <span className="text-sm text-slate-600">{sortedItems.length} itens</span>
          </div>
          <div className="grid gap-3 md:grid-cols-2">
            {sortedItems.map((item) => (
              <div key={item.id} className="flex gap-3 rounded-xl border border-slate-200 p-3">
                <img src={item.photo} alt={item.name} className="h-20 w-20 rounded-lg object-cover" />
                <div className="flex flex-1 flex-col gap-1">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="text-sm font-semibold text-slate-900">{item.name}</p>
                      <p className="text-xs text-slate-600 overflow-hidden text-ellipsis">{item.description}</p>
                    </div>
                    <span className="text-sm font-semibold text-primary-700">R$ {item.price.toFixed(2)}</span>
                  </div>
                  <div className="flex gap-2 text-xs text-primary-700">
                    <button type="button" onClick={() => setEditItem(item)} className="font-semibold">
                      Editar
                    </button>
                    <button
                      type="button"
                      className="font-semibold text-red-500"
                      onClick={() => deleteItem.mutate(item.id)}
                    >
                      Remover
                    </button>
                  </div>
                </div>
              </div>
            ))}
            {sortedItems.length === 0 && <p className="text-sm text-slate-600">Nenhum item adicionado ainda.</p>}
          </div>
        </Card>
      </div>

      <Modal
        open={Boolean(editItem)}
        title={`Editar item${editItem ? `: ${editItem.name}` : ''}`}
        onClose={() => setEditItem(null)}
      >
        {editItem && (
          <ItemForm
            initialData={editItem}
            submitLabel="Salvar alterações"
            onSubmit={(values) => updateItem.mutate(values)}
          />
        )}
      </Modal>
    </div>
  );
}
