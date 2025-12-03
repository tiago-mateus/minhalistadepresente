import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useMutation, useQuery } from '@tanstack/react-query';
import { listsService } from '../../services/listsService';
import { Modal } from '../../components/ui/Modal';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { useUIStore } from '../../store/uiStore';

export function PublicListPage() {
  const { slug } = useParams<{ slug: string }>();
  const { data: list, isLoading } = useQuery({
    queryKey: ['public-list', slug],
    queryFn: () => listsService.getPublicList(slug!),
    enabled: Boolean(slug),
  });

  const { modalOpen, setModalOpen } = useUIStore();
  const [payerName, setPayerName] = useState('Convidado generoso');
  const [amount, setAmount] = useState(150);

  const contribute = useMutation({
    mutationFn: () => listsService.contribute(list!.id, { payerName, amount }),
    onSuccess: () => {
      alert('Contribuição confirmada! Obrigado ❤️');
      setModalOpen(false);
    },
  });

  if (isLoading || !list) {
    return <p className="text-sm text-slate-600">Carregando lista...</p>;
  }

  return (
    <div className="mx-auto max-w-5xl space-y-8 px-4 py-8">
      <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
        <div className="relative">
          <img src={list.coverImage} alt={list.name} className="h-64 w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />
          <div className="absolute bottom-6 left-6 text-white">
            <p className="text-sm font-semibold">Lista pública</p>
            <h1 className="text-3xl font-bold">{list.name}</h1>
            <p className="text-sm text-slate-100">{list.description}</p>
          </div>
        </div>
        <div className="flex flex-col gap-6 p-6 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3 text-sm text-slate-700">
            <span className="rounded-full bg-primary-50 px-3 py-1 text-primary-700">{list.items.length} itens</span>
            <span>Evento em {new Date(list.eventDate).toLocaleDateString('pt-BR')}</span>
          </div>
          <Button onClick={() => setModalOpen(true)}>Contribuir</Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {list.items.map((item) => (
          <div key={item.id} className="flex gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <img src={item.photo} alt={item.name} className="h-24 w-24 rounded-lg object-cover" />
            <div className="flex flex-1 flex-col gap-1">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-base font-semibold text-slate-900">{item.name}</h3>
                  <p className="text-sm text-slate-600">{item.description}</p>
                </div>
                <span className="text-sm font-semibold text-primary-700">R$ {item.price.toFixed(2)}</span>
              </div>
              <span className="text-xs text-slate-500">Status: {item.reserved ? 'Reservado' : 'Disponível'}</span>
            </div>
          </div>
        ))}
      </div>

      <Modal open={modalOpen} title="Contribuir com a lista" onClose={() => setModalOpen(false)}>
        <form
          className="flex flex-col gap-3"
          onSubmit={(e) => {
            e.preventDefault();
            contribute.mutate();
          }}
        >
          <Input label="Seu nome" value={payerName} onChange={(e) => setPayerName(e.target.value)} required />
          <Input
            label="Valor da contribuição"
            type="number"
            min={20}
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            required
          />
          <Button type="submit" loading={contribute.isPending}>
            Confirmar pagamento
          </Button>
        </form>
      </Modal>
    </div>
  );
}
