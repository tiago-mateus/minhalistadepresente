import { api } from '../api/axios';
import type { Item } from '../types/Item';

export const itemsService = {
  addItem: async (listId: string, payload: Partial<Item>) => {
    const { data } = await api.post<Item>(`/lists/${listId}/items`, payload);
    return data;
  },
  updateItem: async (listId: string, itemId: string, payload: Partial<Item>) => {
    const { data } = await api.put<Item>(`/lists/${listId}/items/${itemId}`, payload);
    return data;
  },
  deleteItem: async (listId: string, itemId: string) => {
    await api.delete(`/lists/${listId}/items/${itemId}`);
    return itemId;
  },
};
