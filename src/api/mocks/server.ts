import { createServer, Response } from 'miragejs';
import type { List } from '../../types/List';
import type { Item } from '../../types/Item';
import type { User } from '../../types/User';
import type { Payment } from '../../types/Payment';
import { lists as seedLists } from './data/lists';
import { items as seedItems } from './data/items';
import { users as seedUsers } from './data/users';
import { generateId, toSlug } from '../../utils';

let lists: List[] = JSON.parse(JSON.stringify(seedLists));
let items: Item[] = JSON.parse(JSON.stringify(seedItems));
let users: User[] = JSON.parse(JSON.stringify(seedUsers));

const attachItems = (list: List): List => ({
  ...list,
  items: items.filter((item) => item.listId === list.id),
});

export function makeServer() {
  return createServer({
    routes() {
      this.namespace = 'api';
      this.timing = 800;

      this.post('/auth/login', (_schema, request) => {
        const { email, name } = JSON.parse(request.requestBody) as { email: string; name?: string };
        const existing = users.find((user) => user.email === email);
        if (!existing && !name) {
          return new Response(401, {}, { message: 'Usuário não encontrado.' });
        }

        const user: User = existing ?? {
          id: generateId(),
          name: name ?? email.split('@')[0],
          email,
        };

        if (!existing) {
          users = [...users, user];
        }

        return { user, token: `mock-token-${user.id}` };
      });

      this.post('/auth/register', (_schema, request) => {
        const { name, email } = JSON.parse(request.requestBody) as { name: string; email: string };
        const already = users.find((u) => u.email === email);

        if (already) {
          return new Response(409, {}, { message: 'E-mail já cadastrado.' });
        }

        const newUser: User = {
          id: generateId(),
          name,
          email,
        };
        users = [...users, newUser];

        return { user: newUser, token: `mock-token-${newUser.id}` };
      });

      this.get('/lists', () => {
        return lists.map(attachItems);
      });

      this.get('/lists/:id', (_schema, request) => {
        const list = lists.find((l) => l.id === request.params.id);
        if (!list) return new Response(404, {}, { message: 'Lista não encontrada' });
        return attachItems(list);
      });

      this.post('/lists', (_schema, request) => {
        const payload = JSON.parse(request.requestBody) as Partial<List>;
        const newList: List = {
          id: generateId(),
          name: payload.name ?? 'Nova Lista',
          description: payload.description ?? '',
          eventDate: payload.eventDate ?? new Date().toISOString().slice(0, 10),
          coverImage:
            payload.coverImage ??
            'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80',
          slug: payload.slug ?? toSlug(payload.name ?? 'nova-lista'),
          items: [],
          createdBy: payload.createdBy ?? 'u1',
        };
        lists = [newList, ...lists];
        return attachItems(newList);
      });

      this.put('/lists/:id', (_schema, request) => {
        const payload = JSON.parse(request.requestBody) as Partial<List>;
        const index = lists.findIndex((l) => l.id === request.params.id);
        if (index === -1) return new Response(404, {}, { message: 'Lista não encontrada' });
        const current = lists[index];
        const updated: List = {
          ...current,
          ...payload,
          slug: payload.name ? toSlug(payload.name) : current.slug,
        };
        lists[index] = updated;
        return attachItems(updated);
      });

      this.delete('/lists/:id', (_schema, request) => {
        lists = lists.filter((l) => l.id !== request.params.id);
        items = items.filter((item) => item.listId !== request.params.id);
        return new Response(204);
      });

      this.post('/lists/:id/items', (_schema, request) => {
        const payload = JSON.parse(request.requestBody) as Partial<Item>;
        const listExists = lists.some((l) => l.id === request.params.id);
        if (!listExists) return new Response(404, {}, { message: 'Lista não encontrada' });
        const newItem: Item = {
          id: generateId(),
          listId: request.params.id,
          name: payload.name ?? 'Novo item',
          description: payload.description ?? '',
          price: payload.price ?? 0,
          photo:
            payload.photo ?? 'https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=800&q=80',
          reserved: payload.reserved ?? false,
        };
        items = [...items, newItem];
        return newItem;
      });

      this.put('/lists/:id/items/:itemId', (_schema, request) => {
        const payload = JSON.parse(request.requestBody) as Partial<Item>;
        const idx = items.findIndex((i) => i.id === request.params.itemId && i.listId === request.params.id);
        if (idx === -1) return new Response(404, {}, { message: 'Item não encontrado' });
        items[idx] = { ...items[idx], ...payload };
        return items[idx];
      });

      this.delete('/lists/:id/items/:itemId', (_schema, request) => {
        items = items.filter((i) => !(i.id === request.params.itemId && i.listId === request.params.id));
        return new Response(204);
      });

      this.get('/public/lists/:slug', (_schema, request) => {
        const list = lists.find((l) => l.slug === request.params.slug);
        if (!list) return new Response(404, {}, { message: 'Lista pública não encontrada' });
        return attachItems(list);
      });

      this.post('/payments/:listId', (_schema, request) => {
        const payload = JSON.parse(request.requestBody) as Partial<Payment> & { payerName: string; amount: number };
        const listExists = lists.some((l) => l.id === request.params.listId);
        if (!listExists) return new Response(404, {}, { message: 'Lista não encontrada' });
        const payment: Payment = {
          id: generateId(),
          listId: request.params.listId,
          amount: payload.amount ?? 0,
          payerName: payload.payerName ?? 'Contribuição anônima',
          status: 'pago',
          createdAt: new Date().toISOString(),
        };
        return payment;
      });
    },
  });
}
