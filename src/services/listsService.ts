import { api } from '../api/axios';
import type { List } from '../types/List';
import type { Payment } from '../types/Payment';

export const listsService = {
  getLists: async () => {
    const { data } = await api.get<List[]>('/lists');
    return data;
  },
  getList: async (id: string) => {
    const { data } = await api.get<List>(`/lists/${id}`);
    return data;
  },
  createList: async (payload: Partial<List>) => {
    const { data } = await api.post<List>('/lists', payload);
    return data;
  },
  updateList: async (id: string, payload: Partial<List>) => {
    const { data } = await api.put<List>(`/lists/${id}`, payload);
    return data;
  },
  deleteList: async (id: string) => {
    await api.delete(`/lists/${id}`);
    return id;
  },
  getPublicList: async (slug: string) => {
    const { data } = await api.get<List>(`/public/lists/${slug}`);
    return data;
  },
  contribute: async (listId: string, payload: { amount: number; payerName: string }) => {
    const { data } = await api.post<Payment>(`/payments/${listId}`, payload);
    return data;
  },
};
