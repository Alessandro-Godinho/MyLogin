import {
    BrowserRouter as Router,
    Route,
    Routes,
    Navigate,
} from "react-router-dom"
import HomePage from "./pages/homePage"
import LoginPage from "./pages/loginPage"
import UpdatePage from "./pages/updatePage"
import SavePage from "./pages/savePage"
import UserPage from "./pages/userPage"
import { AuthProvider, AuthContext } from "./context/auth"
import React,{useContext} from "react"

const AppRoutes = () => {

    const Private = ({children}) => {
        const {authenticated, loading} = useContext(AuthContext)
        
        if(loading){
            return <div className="loading">Carregando...</div>
        }
        if(!authenticated){
            return <Navigate to="/login" />
        }

        return children
    }
  
    return(
        <Router>
            <AuthProvider>
            <Routes>
                <Route exact path="/login" element={<LoginPage/>} />
                <Route exact path="/" element={<Private><HomePage/> </Private>} />
                <Route exact path="/update/:id" element={<Private><UpdatePage/> </Private>} />
                <Route exact path="/save" element={<Private><SavePage/> </Private>} />
                <Route exact path="/user/alter" element={<Private><UserPage/> </Private>} />
                <Route exact path="/user/new" element={<Private><UserPage/> </Private>} />
            </Routes>
            </AuthProvider>
        </Router>
    )

}

export default AppRoutes