import { useState, type ChangeEvent, type FormEvent } from 'react';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import type { Item } from '../../types/Item';

interface ItemFormProps {
  initialData?: Partial<Item>;
  onSubmit: (values: Partial<Item>) => void;
  submitLabel?: string;
}

export function ItemForm({ initialData, onSubmit, submitLabel = 'Salvar item' }: ItemFormProps) {
  const [form, setForm] = useState<Partial<Item>>({
    name: initialData?.name ?? '',
    description: initialData?.description ?? '',
    price: initialData?.price ?? 0,
    photo: initialData?.photo ?? '',
  });

  const handleChange = (field: keyof Item) => (e: ChangeEvent<HTMLInputElement>) => {
    const value = field === 'price' ? Number(e.target.value) : e.target.value;
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
      <Input label="Nome" value={form.name} onChange={handleChange('name')} required />
      <Input label="Descrição" value={form.description} onChange={handleChange('description')} required />
      <Input label="Preço" type="number" min={0} value={form.price} onChange={handleChange('price')} required />
      <Input label="Foto (URL)" value={form.photo} onChange={handleChange('photo')} placeholder="https://..." />
      <Button type="submit" className="self-start">
        {submitLabel}
      </Button>
    </form>
  );
}
