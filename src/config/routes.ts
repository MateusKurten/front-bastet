export default {
    'root': 'https://backend-bastet.vercel.app/', //Rota da API
    'criar-usuario': () => '/usuarios', //url de criar usuários
    'login': () => '/login', //url de login
    'listar-cursos': (filtro?: any) => {
        const params = new URLSearchParams();
        if (filtro) {
            params.append('filtro', filtro);
        }
        return '/cursos' + (params.toString() ? '?' + params.toString() : '');
    },
    'inscrever-curso': ( idCurso : string ) => `/cursos/${ idCurso }`, //url de se inscrever em curso,
    'cancelar-curso': ( idCurso : string ) => `/cursos/${ idCurso }`, //url de cancelar inscricao
    'meus-cursos': ( idUsuario : string ) => `/${ idUsuario }`, //url de listar meus cursos
}