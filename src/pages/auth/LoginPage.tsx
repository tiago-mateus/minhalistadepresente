import { useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { authService } from '../../services/authService';
import { useUserStore } from '../../store/userStore';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';

export function LoginPage() {
  const [email, setEmail] = useState('laura@minhalistadepresentes.com');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const login = useUserStore((s) => s.login);

  const mutation = useMutation({
    mutationFn: authService.login,
    onSuccess: (data) => {
      login(data);
      navigate('/dashboard');
    },
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    mutation.mutate({ email, password });
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="space-y-2">
        <p className="text-sm font-semibold text-primary-600">Bem-vindo de volta</p>
        <h1 className="text-2xl font-bold text-slate-900">Entre para gerenciar suas listas</h1>
        <p className="text-sm text-slate-600">Use qualquer e-mail para testar: tudo é mockado.</p>
      </div>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <Input label="E-mail" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <Input
          label="Senha"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          helperText="Qualquer senha funciona no mock."
        />
        <Button type="submit" loading={mutation.isPending}>
          Entrar
        </Button>
      </form>
      <p className="text-sm text-slate-600">
        Ainda não tem conta?{' '}
        <Link to="/register" className="font-semibold text-primary-600">
          Criar agora
        </Link>
      </p>
    </div>
  );
}
