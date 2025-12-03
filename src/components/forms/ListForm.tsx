import { useState, type ChangeEvent, type FormEvent } from 'react';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import type { List } from '../../types/List';

interface ListFormProps {
  initialData?: Partial<List>;
  onSubmit: (values: Partial<List>) => void;
  submitLabel?: string;
  loading?: boolean;
}

export function ListForm({ initialData, onSubmit, submitLabel = 'Salvar lista', loading }: ListFormProps) {
  const [form, setForm] = useState<Partial<List>>({
    name: initialData?.name ?? '',
    description: initialData?.description ?? '',
    eventDate: initialData?.eventDate ?? '',
    coverImage: initialData?.coverImage ?? '',
  });

  const handleChange = (field: keyof List) => (e: ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
      <Input label="Nome da lista" value={form.name} onChange={handleChange('name')} required />
      <Input label="Descrição" value={form.description} onChange={handleChange('description')} required />
      <Input
        label="Data do evento"
        type="date"
        value={form.eventDate}
        onChange={handleChange('eventDate')}
        required
      />
      <Input
        label="Imagem de capa (URL)"
        placeholder="https://..."
        value={form.coverImage}
        onChange={handleChange('coverImage')}
      />
      <Button type="submit" loading={loading} className="self-start">
        {submitLabel}
      </Button>
    </form>
  );
}
