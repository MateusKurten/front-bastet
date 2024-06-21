"use client"
import { useForm } from "react-hook-form";
import Link from "next/link";
import { Login } from '@/lib/methods';

export default function Page() {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const onSubmit = async (data: any) => {
        await Login(data).then((res) => {
            sessionStorage.setItem("idUsuario", res.id);
            alert(res.message);
            location.reload();
        });
        reset();
    };

    return (
        <main>
            <form className="p-6 bg-indigo-50 max-w-96 rounded-3xl flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
                <h2 className="page-title">Login</h2>
                <div className="flex flex-col gap-2">
                    <label htmlFor="email">E-mail</label>
                    <input type="email" required id="email" className="border h-10 rounded-xl focus:outline-none focus:border-indigo-300 px-4 py-2" {...register("email", { required: true })} />
                    {errors.email && <span className="text-red-500">Nome é obrigatório</span>}
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="senha">Senha</label>
                    <input type="password" required id="senha" className="border h-10 rounded-xl focus:outline-none focus:border-indigo-300 px-4 py-2" {...register("senha", { required: true })} />
                    {errors.senha && <span className="text-red-500">Senha é obrigatório</span>}
                </div>
                <div className="flex flex-row justify-between items-end">
                    <Link href="/cadastro" className="my-3">Fazer cadastro</Link>
                    <button type="submit" className="bg-indigo-500 hover:bg-indigo-600 text-white px-6 py-3 rounded-lg">Entrar</button>
                </div>
            </form>
        </main>
    );
}