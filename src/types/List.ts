import { Item } from './Item';

export interface List {
  id: string;
  name: string;
  description: string;
  eventDate: string;
  coverImage: string;
  slug: string;
  items: Item[];
  createdBy: string;
}
