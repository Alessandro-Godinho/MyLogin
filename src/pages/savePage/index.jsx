import React, { useState, useContext } from "react";
import { AuthContext } from "../../context/auth";
import "./styles.css";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import LockIcon from "@mui/icons-material/Lock";
import LoginIcon from "@mui/icons-material/Login";
import Button from "@mui/material/Button";
import SmartToyIcon from '@mui/icons-material/SmartToy';
import Person3Icon from '@mui/icons-material/Person3';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';

const SavePage = () => {
  const { save } = useContext(AuthContext);
  const [descricao, setDescricao] = useState("");
  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
   
    save(descricao,usuario, senha);
  };
  return (
    <div id="update">
      <form className="form" onSubmit={handleSubmit}>
        <PersonAddAlt1Icon
          style={{ fontSize: "5ch" }}
        ></PersonAddAlt1Icon>
        <div className="field">
          <FormControl fullWidth sx={{ m: 0, width: "17ch" }}>
            <OutlinedInput
              id="descricao"
              type="text"
              defaultValue={descricao}
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
              defaultValue={usuario}
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
        <div className="actions">
          <Button type="submit" variant="contained" endIcon={<LoginIcon />}>
            Salvar
          </Button>
        </div>
      </form>
    </div>
  );
};
export default SavePage;
