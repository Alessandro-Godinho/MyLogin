import React, { useState, useContext } from "react";
import { AuthContext } from "../../context/auth";
import "./styles.css";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import LockIcon from "@mui/icons-material/Lock";
import LoginIcon from "@mui/icons-material/Login";
import Button from "@mui/material/Button";
import SyncAltIcon from "@mui/icons-material/SyncAlt";
import EmailIcon from "@mui/icons-material/Email";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

const UserPage = () => {
  const { alterUser, newUser, user } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [senha, setSenha] = useState("");
  const [tipo, setTipo] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("usuario e" + user.data._id);
    console.log("url é " + window.location.pathname);
    if (window.location.pathname === "/user/alter") {
      if (senha === confirmarSenha) {
        alterUser(user.data._id, email, senha, tipo);
      }
    } else {
      newUser(email, senha, tipo);
    }
  };
  const handleChange = (event) => {
    setTipo(event.target.value);
  };
  return (
    <div id="user">
      <form className="form" onSubmit={handleSubmit}>
        <SyncAltIcon style={{ fontSize: "5ch" }}></SyncAltIcon>
        <div className="field">
          <FormControl fullWidth sx={{ m: 0, width: "17ch" }}>
            <OutlinedInput
              id="email"
              type="email"
              defaultValue={email}
              onChange={(e) => setEmail(e.target.value)}
              startAdornment={
                <EmailIcon
                  style={{ margin: "0.5ch" }}
                  position="start"
                ></EmailIcon>
              }
            />
          </FormControl>
        </div>
        <div className="field">
          <FormControl fullWidth sx={{ m: 0, width: "17ch" }}>
            <OutlinedInput
              id="senha"
              type="password"
              defaultValue={senha}
              onChange={(e) => setSenha(e.target.value)}
              startAdornment={
                <LockIcon
                  style={{ margin: "0.5ch" }}
                  position="start"
                ></LockIcon>
              }
            />
          </FormControl>
        </div>
        <div>
          <FormControl fullWidth sx={{ m: 0, width: "17ch" }}>
            <OutlinedInput
              id="Confirmarsenha"
              type="password"
              defaultValue={confirmarSenha}
              onChange={(e) => setConfirmarSenha(e.target.value)}
              startAdornment={
                <LockIcon
                  style={{ margin: "0.5ch" }}
                  position="start"
                ></LockIcon>
              }
            />
          </FormControl>
        </div>
        <div className="field">
          <FormControl id="frmcontrol" fullWidth>
            <InputLabel id="inputLabel">Tipo</InputLabel>
            <Select
              labelId="inputLabel"
              id="selectLabel"
              defaultValue={user.data.tipo}
              label="Tipo"
              onChange={handleChange}
            >
              <MenuItem id="mnuser" value="user">User</MenuItem>
              <MenuItem id="mnadmin" value="admin">Admin</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div className="actions">
          <Button type="submit" variant="contained" endIcon={<LoginIcon />}>
            Salvar
          </Button>
        </div>
      </form>
    </div>
  );
};
export default UserPage;
