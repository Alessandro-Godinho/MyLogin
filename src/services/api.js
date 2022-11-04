import axios from "axios"

export const api = axios.create({
    baseURL: "http://polar-headland-86201.herokuapp.com",   
    
})
//Endpoints User
export const createSession = async (usuario, senha) => {
    const reqHeaders = {
        'headers': {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST, GET',
            'Access-Control-Allow-Headers': '*',
            'Access-Control-Max-Age': '86400',
            
            'x-access-token': api.defaults.headers.Authorization,
        }
    }    

    const reqData = {
        usuario,
        senha    
    }

    return api.post(`/login/`, reqData, reqHeaders)

}

export const updateUser = async (_id, usuario, senha, tipo) => {

    const reqData = {
            usuario,
            senha,
            tipo
    }
    
    const reqHeaders = {
        'headers': {
            'Access-Control-Allow-Headers': 'x-access-token',
            'X-WP-Nonce': 'my-wp-nonce-here',
            'x-access-token': api.defaults.headers.Authorization,
        }
    }
    
    return api.put(`/usuario/${_id}`, reqData, reqHeaders)
  
}

export const saveUser = async (usuario, senha,tipo) => {
    
    const reqData = {
        usuario,
        senha,
        tipo
}

const reqHeaders = {
    'headers': {
        'Access-Control-Allow-Headers': 'x-access-token',
        'X-WP-Nonce': 'my-wp-nonce-here',
        'x-access-token': api.defaults.headers.Authorization,
    }
}    
    return api.post("/usuario", reqData, reqHeaders)
}

// Endpoints Sistemas

export const getSistemas = async (parametros) => {
   console.log(parametros);
    const params = new URLSearchParams();
    params.append('page', parametros.page)
    params.append('limit', parametros.limit)
        if(parametros.usuario) {params.append('usuario', parametros.usuario)}
        if(parametros.descricao) {params.append('descricao',parametros.descricao)}
        if(parametros.senha) {params.append('senha',parametros.senha)}
    
    let header = {'x-access-token': api.defaults.headers.Authorization}
    return api.get("/sistemas", {params,headers:  header})
}

export const deleteSistema = async (_id) => {
    let header = {'x-access-token': api.defaults.headers.Authorization}
    return api.delete(`/sistema/${_id}`, {headers:  header})
}

export const updateSistema = async (_id, descricao,usuario, senha) => {

    const reqData = {
            descricao,
            usuario,
            senha
    }
    
    const reqHeaders = {
        'headers': {
            'Access-Control-Allow-Headers': 'x-access-token',
            'X-WP-Nonce': 'my-wp-nonce-here',
            'x-access-token': api.defaults.headers.Authorization,
        }
    }
    
    return api.put(`/sistema/${_id}`, reqData, reqHeaders) 
}

export const saveSistema = async (descricao, usuario, senha) => {
    
    const reqData = {
        descricao,
        usuario,
        senha
}

const reqHeaders = {
    'headers': {
        'Access-Control-Allow-Headers': 'x-access-token',
        'X-WP-Nonce': 'my-wp-nonce-here',
        'x-access-token': api.defaults.headers.Authorization,
    }
}    
    return api.post("/sistema", reqData, reqHeaders)
}

export const getSistemaById = async (_id) => {
    let header = {'x-access-token': api.defaults.headers.Authorization}
    return api.get(`/sistema/${_id}`, {_id, headers:  header})
}

