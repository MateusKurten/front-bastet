import { UsurioMockup, type Curso, type Usuario } from "./mockup";
import router from '@/config/routes';

const MOCKED = router.root === '#';

async function request(path:string, options : {
    method?: string,
    body?: string,
    headers?: any,
    credentials?: RequestCredentials;
} = { method: "GET" }){
    const url = `${ router.root }${ path }`;
    return await fetch( url, options ).then( async (res) => await res.json() ).catch( err => { error: err.message });
}

export async function CreateUser({ nome, email, senha, nascimento } : Usuario ) : Promise<Usuario | any>{
    try {
        const result = await request( router["criar-usuario"]() , {
            method: "POST",
            body: JSON.stringify({
                nome,
                email,
                senha,
                nascimento
            }),
            credentials: 'include',
            headers: {
                "Content-Type": "application/json",
            },
        });

        if( result.error ){
            throw new Error( result.error );
        }

        return result
    } catch (error) {
        if(MOCKED){
            return UsurioMockup[0]
        }else{
            return {
                statusCode: 400,
                mensagem: "Erro ao criar usuário"
            }
        }
    }
}

export async function Login({ email, senha } : { email: string, senha : string }){
    try {
        const result = await request( router["login"]() , {
            method: "POST",
            body: JSON.stringify({ email, senha }),
            credentials: 'include',
            headers: {
                "Content-Type": "application/json",
            },
        });

        if( result.error ){
            throw new Error( result.error );
        }

        return result;
    } catch (error) {
        if(MOCKED){
            return UsurioMockup[0]
        }else{
            return {
                statusCode: 400,
                mensagem: "Erro ao fazer login"
            }
        }
    }
}

export async function ListarCursos(filtro?: string, jwt?: string|null) {
    try {
        const result = await request(router["listar-cursos"](filtro, jwt), {
            method: "GET",
            credentials: 'include'
        });

        if( result.error ){
            throw new Error( result.error );
        }

        return result;
    } catch (error) {
        return [];
    }
}

export async function Inscricao({ idCurso, jwt } : { idCurso : string, jwt: string|null }){
    const result = await request( router["inscrever-curso"](idCurso) , {
        method: "POST",
        credentials: 'include',
        body: JSON.stringify({ jwt }),
        headers: {
            "Content-Type": "application/json",
        },
    });

    if( result.error ){
        throw new Error( result.error );
    }

    return result
}

export async function Cancelar({ idCurso, jwt } : { idCurso : string, jwt: string|null }){
    const result = await request( router["cancelar-curso"](idCurso) , {
        method: "PATCH",
        credentials: 'include',
        body: JSON.stringify({ jwt }),
        headers: {
            "Content-Type": "application/json",
        },
    });

    if( result.error ){
        throw new Error( result.error );
    }

    return result
}

export async function MeusCursos({ idUsuario, jwt }:{ idUsuario : string, jwt: string|null }){
    try {
        const result = await request(router["meus-cursos"](idUsuario, jwt), {
            method: "GET",
            credentials: 'include'
        });

        if( result.error ){
            throw new Error( result.error );
        }

        return result;
    } catch (error) {
        return [];
    }
}
