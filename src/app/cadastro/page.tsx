"use client"
import { useForm } from "react-hook-form";
import Link from "next/link";
import { CreateUser } from '@/lib/methods';

export default function Page() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm({ mode: 'onChange' });

  const onSubmit = async (data: any) => {
    await CreateUser(data).then( (res) => alert(res.message));
    reset();
  };

  return (
    <main>      
      <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
        <h2 className="page-title">Cadastro</h2>
        <p>Eu já tenho cadastro, quero <Link href="/login">fazer login.</Link></p>
        <div className="max-w-96 flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="nome">Nome</label>
            <input type="text" {...register("nome", { required: true })} id="nome" className="border h-10 rounded-xl focus:outline-none focus:border-indigo-300 px-4 py-2" />
            {errors.nome && <span className="text-red-500">Nome é obrigatório</span>}
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="nascimento">Data de nascimento</label>
            <input type="date" {...register("nascimento", { required: true })} id="nascimento" className="border h-10 rounded-xl focus:outline-none focus:border-indigo-300 px-4 py-2" />
            {errors.nascimento && <span className="text-red-500">Data de nascimento é obrigatória</span>}
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="email">E-mail</label>
            <input type="email" {...register("email", { required: true })} id="email" className="border h-10 rounded-xl focus:outline-none focus:border-indigo-300 px-4 py-2" />
            {errors.email && <span className="text-red-500">E-mail é obrigatório</span>}
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="senha">Senha</label>
            <input type="password" {...register("senha", { required: true })} id="senha" className="border h-10 rounded-xl focus:outline-none focus:border-indigo-300 px-4 py-2" />
            {errors.senha && <span className="text-red-500">Senha é obrigatória</span>}
          </div>
        </div>
        <div className="flex flex-row justify-between items-end">
          <button type="submit" className="bg-indigo-500 hover:bg-indigo-600 text-white px-6 py-3 rounded-lg">Cadastrar</button>
        </div>
      </form>
    </main>
  );
}
