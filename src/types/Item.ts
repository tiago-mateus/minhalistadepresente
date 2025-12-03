export interface Item {
  id: string;
  listId: string;
  name: string;
  description: string;
  price: number;
  photo: string;
  reserved?: boolean;
}
