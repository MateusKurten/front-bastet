import type { Curso as CursoType } from "@/lib/mockup"
import Image from "next/image"
import { Inscricao, Cancelar } from '@/lib/methods';

export default function CursoView({ data, setInscricao } : { data : CursoType, setInscricao: any }){
    const usuarioId = sessionStorage.getItem('idUsuario');
    const jwt = sessionStorage.getItem('jwt');

    const handleInscricao = async () => {
        await Inscricao({idCurso: data.id, jwt: jwt}).then((res) => {
            if (res.message == "Inscrição realizada com sucesso!") {
                setInscricao(data.id + '-inscricao')
            }
            alert(res.message)
            
        });
    };

    const handleCancelar = async () => {
        await Cancelar({idCurso: data.id, jwt: jwt}).then((res) => {
            if (res.message == "Inscrição cancelada com sucesso!") {
                setInscricao(data.id + '-cancelamento')
            }
            alert(res.message)
            
        });
    };

    return <div className="border flex-1 flex flex-col">
        <figure className="relative aspect-video">
            <Image src={ data.capa } alt={ data.nome } fill />
            { data.inscrito && <figcaption className="text-sm p-4 bg-slate-200 absolute m-4 shadow-xl border-slate-400 border rounded-xl">Você já se inscreveu nesse curso</figcaption> }
        </figure>
        <div className="p-6 flex flex-col gap-2 flex-1">
            <h3 className="text-2xl">{ data.nome }</h3>
            <p>{ data.descricao }</p>
            <div className="flex flex-row flex-wrap gap-1">
                <span className="text-xs py-1 px-2 leading-tight bg-slate-200 rounded-2xl">{ data.inscricoes } inscritos</span>
                <span className="text-xs py-1 px-2 leading-tight bg-slate-200 rounded-2xl">Inicia em { new Date(data.inicio).toLocaleDateString('pt-BR', { year: 'numeric', month: 'long', day: "numeric" }) }</span>
            </div>
        </div>
        { usuarioId && (
            data.inscrito ? data.inscricao_cancelada ? 
                <p className="bg-red-500 p-4 text-center">Inscrição cancelada</p> : 
                <button className="text-center p-4 bg-slate-300 hover:bg-slate-400" onClick={handleCancelar}>Cancelar inscrição</button> : 
                <button className="text-center p-4 bg-indigo-500 hover:bg-indigo-600 text-white" onClick={handleInscricao}>Fazer inscrição</button>
            )
        }
    </div>
}