export interface Payment {
  id: string;
  listId: string;
  amount: number;
  payerName: string;
  status: 'pago' | 'pendente' | 'falha';
  createdAt: string;
}
