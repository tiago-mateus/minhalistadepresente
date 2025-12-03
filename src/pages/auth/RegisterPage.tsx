import { useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { authService } from '../../services/authService';
import { useUserStore } from '../../store/userStore';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';

export function RegisterPage() {
  const [name, setName] = useState('Convidado');
  const [email, setEmail] = useState('guest@minhalistadepresentes.com');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const login = useUserStore((s) => s.login);

  const mutation = useMutation({
    mutationFn: authService.register,
    onSuccess: (data) => {
      login(data);
      navigate('/dashboard');
    },
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    mutation.mutate({ name, email, password });
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="space-y-2">
        <p className="text-sm font-semibold text-primary-600">Crie sua conta</p>
        <h1 className="text-2xl font-bold text-slate-900">Comece a montar listas incríveis</h1>
      </div>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <Input label="Nome" value={name} onChange={(e) => setName(e.target.value)} required />
        <Input label="E-mail" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <Input label="Senha" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <Button type="submit" loading={mutation.isPending}>
          Criar conta
        </Button>
      </form>
      <p className="text-sm text-slate-600">
        Já tem conta?{' '}
        <Link to="/login" className="font-semibold text-primary-600">
          Entrar
        </Link>
      </p>
    </div>
  );
}
