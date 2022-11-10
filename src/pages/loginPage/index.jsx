import React, {useState, useContext} from "react";
import { AuthContext } from "../../context/auth";
import './styles.css'
import FormControl from '@mui/material/FormControl';
import EmailIcon from '@mui/icons-material/Email';
import OutlinedInput from '@mui/material/OutlinedInput';
import LockIcon from '@mui/icons-material/Lock';
import LoginIcon from '@mui/icons-material/Login';
import Button from '@mui/material/Button';
import AccountCircleSharpIcon from '@mui/icons-material/AccountCircleSharp';



    const LoginPage = () => {
    const {authenticated, login} = useContext(AuthContext)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const handleSubmit =(e)=>{
        e.preventDefault()
        console.log({authenticated})
        login(email, password)
    }

    
    return(
    <div id="login">
        
        <form className="form" onSubmit={handleSubmit}>
        <AccountCircleSharpIcon style={{fontSize: '5ch'}}></AccountCircleSharpIcon>
            <div className="field">
            <FormControl fullWidth sx={{ m: 0,  width: '17ch'  }}>  
            <OutlinedInput
                 id="email"
                 type="email"
                 value={email}
                 onChange={(e)=>setEmail(e.target.value)}
                 startAdornment={<EmailIcon style={{margin: '0.5ch'}} position="start"></EmailIcon>}
            />
            </FormControl>                
            </div>
            <div className="field">
            <FormControl fullWidth sx={{ m: 0, width: '17ch' }}>
            
                    <OutlinedInput
                         id="password"
                         type="password"
                         value={password}
                         onChange={(e)=>setPassword(e.target.value)}
            startAdornment={<LockIcon style={{margin: '0.5ch'}} position="start"></LockIcon>}
          />
        </FormControl>
            </div>
            <div className="actions">
            <Button type="submit" variant="contained" endIcon={<LoginIcon />}>
            ENTRAR POR FAVOR
            </Button>
            </div>
        </form>
    </div>  
)}
export default LoginPage