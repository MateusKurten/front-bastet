"use client"
import { useState, useEffect } from 'react';
import Curso from '@/components/curso';
import { MeusCursos } from '@/lib/methods';
import { useParams } from 'next/navigation'
interface Curso {
  id: string
  nome: string,
  inicio: Date,
  descricao: string,
  capa: string,
  inscricoes: number
  inscricao_cancelada: boolean|undefined
}

export default function Page() {
  const [cursos, setCursos] = useState<Curso[]>([]);
  const [inscricao, setInscricao] = useState('');
  const { idUsuario } = useParams<{ idUsuario: string }>()
  const jwt = sessionStorage.getItem('jwt');

  useEffect(() => {
    const fetchCursos = async () => {
      try {
        const cursosData = await MeusCursos({idUsuario: idUsuario, jwt: jwt});
        setCursos(cursosData);
        if (cursosData.message) {
          alert(cursosData.message);
        }
      } catch (error) {
        console.error('Erro ao listar cursos:', error);
      }
    };

    fetchCursos();
  }, [inscricao]);

    return (
      <main>
        <h2 className="page-title">Cursos</h2>
        <div className='grid md:grid-cols-2 xl:grid-cols-3 gap-8'>
          {Array.isArray(cursos) && cursos.map((curso) => (
            <Curso data={curso} key={curso.id} setInscricao={setInscricao} />
          ))}
        </div>
      </main>
    )
}