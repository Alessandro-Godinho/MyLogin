import React, { useState, useContext } from "react";
import { AuthContext } from "../../context/auth";
import "./styles.css";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import LockIcon from "@mui/icons-material/Lock";
import LoginIcon from "@mui/icons-material/Login";
import Button from "@mui/material/Button";
import SyncAltIcon from '@mui/icons-material/SyncAlt';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import Person3Icon from '@mui/icons-material/Person3';

const UpdatePage = () => {
  const { update, descricaoContext, usuarioContext, senhaContext,idContext } =
    useContext(AuthContext);
  console.log(descricaoContext);
  const [descricao, setDescricao] = useState("");
  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    const desc = descricao ? descricao : descricaoContext
    const user = usuario ? usuario : usuarioContext
    const pass = senha ? senha : senhaContext
    update(idContext,desc, user, pass);
  };
  return (
    <div id="update">
      <form className="form" onSubmit={handleSubmit}>
        <SyncAltIcon
          style={{ fontSize: "5ch" }}
        ></SyncAltIcon>
        <div className="field">
          <FormControl fullWidth sx={{ m: 0, width: "17ch" }}>
            <OutlinedInput
              id="descricao"
              type="text"
              defaultValue={descricaoContext}
              onChange={(e) => setDescricao(e.target.value)}
              startAdornment={
                <SmartToyIcon
                  style={{ margin: "0.5ch" }}
                  position="start"
                ></SmartToyIcon>
              }
            />
          </FormControl>
        </div>
        <div className="field">
          <FormControl fullWidth sx={{ m: 0, width: "17ch" }}>
            <OutlinedInput
              id="usuario"
              type="text"
              defaultValue={usuarioContext}
              onChange={(e) => setUsuario(e.target.value)}
              startAdornment={
                <Person3Icon
                  style={{ margin: "0.5ch" }}
                  position="start"
                ></Person3Icon>
              }
            />
          </FormControl>
        </div>
        <div>
          <FormControl fullWidth sx={{ m: 0, width: "17ch" }}>
            <OutlinedInput
              id="senha"
              type="text"
              defaultValue={senhaContext}
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
        <div className="actions">
          <Button type="submit" variant="contained" endIcon={<LoginIcon />}>
            Salvar
          </Button>
        </div>
      </form>
    </div>
  );
};
export default UpdatePage;
