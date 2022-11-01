import React,{createContext, useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import {
    api,
    createSession, 
    saveSistema, 
    updateSistema, 
    getSistemaById,
    updateUser,
    saveUser
} from "../services/api" 

export const AuthContext = createContext()

export const AuthProvider = ({children}) => {
   
   const navigate = useNavigate()
    const [user, SetUser] = useState(null)
    const [descricaoContext, setDescricao] = useState("");
    const [senhaContext, setSenha] = useState("");
    const [usuarioContext, setUsuario] = useState("");
    const [idContext, setId] = useState("");
    const [loading, setLoading] = useState(true)

    useEffect(() =>{
        const recoveredUser = localStorage.getItem('user')
        const recoveredToken = localStorage.getItem('token')
  
        if(recoveredUser && recoveredToken){
            SetUser(JSON.parse(recoveredUser))
            api.defaults.headers.Authorization = recoveredToken
        }

        setLoading(false)
    }, [])

    const login = async (usuario, senha) => {
        
        const response = await createSession(usuario,senha)
        const auth = JSON.stringify(response.data.auth)
        if(auth){

            const loggerUser = response.data
            localStorage.setItem("user", JSON.stringify(loggerUser))
            localStorage.setItem("token", response.data.token)
    
            api.defaults.headers.Authorization = response.data.token
    
            SetUser(loggerUser)
            console.log('user '+ JSON.stringify(loggerUser))
            navigate("/")
        }
        else{
            logout()
        }            
        
}
const logout = () => {
    localStorage.removeItem('user')
    localStorage.removeItem('token')
    api.defaults.headers.Authorization = null
    SetUser(null)
    navigate("/login")   
}

const alterUser = async (_id, usuario, senha,tipo) => {
    await updateUser(_id, usuario, senha, tipo);
    verificarResponse(false);
}

const newUser = async (usuario, senha,tipo) => {
    const response = await saveUser(usuario, senha, tipo);
    verificarResponse(response);
}

const getSistema = async (id) => {
    const sistema = await getSistemaById(id)
    navigate(`/update/${id}`)
    if(!sistema.data.msg){

        setDescricao(sistema.data.descricao)
        setUsuario(sistema.data.usuario)
        setSenha(sistema.data.senha)
        setId(id)
    }
    else{
        logout()
    }
}

const update = async (_id, descricao, usuario, senha) => {
        const response = await updateSistema(_id,descricao, usuario, senha);
        verificarResponse(response);
  };
  const save = async (_id, descricao, usuario, senha) => {
    const response = await saveSistema(_id, descricao, usuario, senha);
    verificarResponse(response);
  };


  function verificarResponse(response) {
    if (response) {
      navigate("/");
    } else {
      logout();
    }
  }
    return(
    <AuthContext.Provider value={{authenticated: !!user, user, loading, 
        descricaoContext, usuarioContext, senhaContext, idContext,
        getSistema, update, save, login, logout, alterUser, newUser}}>
        {children}
    </AuthContext.Provider>
)}

