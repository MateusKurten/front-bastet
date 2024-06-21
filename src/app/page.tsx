"use client"
import { useState, useEffect } from 'react';
import Curso from '@/components/curso';
import { ListarCursos } from '@/lib/methods';

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
  const [filtro, setFiltro] = useState('');
  const [inscricao, setInscricao] = useState('');
  const [filtroTemporario, setFiltroTemporario] = useState('');
  const jwt = sessionStorage.getItem('jwt');

  useEffect(() => {
    const fetchCursos = async () => {
      try {
        const cursosData = await ListarCursos(filtro, jwt);
        setCursos(cursosData);
      } catch (error) {
        console.error('Erro ao listar cursos:', error);
      }
    };

    fetchCursos();
  }, [filtro, inscricao]);

  const handleFiltroChange = (e: any) => {
    setFiltroTemporario(e.target.value);
  };

  const handlePesquisarClick = () => {
    setFiltro(filtroTemporario);
  };

  return (
    <main>
      <h2 className="page-title">Cursos</h2>
      <div className="filtro-container mb-4">
        <input
          type="text"
          placeholder="Filtrar por nome do curso..."
          value={filtroTemporario}
          onChange={handleFiltroChange}
          className="mr-2 px-2 py-1 border border-gray-300 rounded"
        />
        <button
          onClick={handlePesquisarClick}
          className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Pesquisar
        </button>
      </div>
      <div className='grid md:grid-cols-2 xl:grid-cols-3 gap-8'>
        { cursos.map((curso) => (
          <Curso key={curso.id} data={curso} setInscricao={setInscricao} />
        ))}
      </div>
    </main>
  );
}