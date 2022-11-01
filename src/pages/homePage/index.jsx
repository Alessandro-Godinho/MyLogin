import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../context/auth";
import {
  getSistemas,
  deleteSistema,
} from "../../services/api";
import { useNavigate } from "react-router-dom";

import styled from "styled-components";
import Button from "@mui/material/Button";
import Avatar from '@mui/material/Avatar';
import SearchIcon from "@mui/icons-material/Search";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import IconButton from "@mui/material/IconButton";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import "./styles.css";
import MenuItem from "@mui/material/MenuItem";
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import Menu from '@mui/material/Menu';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import Tooltip from '@mui/material/Tooltip';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Logout from '@mui/icons-material/Logout';
import Box from '@mui/material/Box';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";


const WrapperList = styled.div`
  display: flex;
  background-color: #ffffff;
  flex-direction: column;
  margin-bottom: 20px;
  margin-top: 50px;
`;

const TableTitle = styled.th`
  color: rgb(100, 29, 233);
  background-color: rgb(100, 29, 233);

  color: rgb(255, 255, 255);
  font-size: 17px;
  font-family: Source Sans Pro;
  text-align: center;
  padding-left: 10px;
  width: 100%;
`;

const ContentText = styled.td`
  background-color: rgb(255, 255, 255);
  font-size: 13px;
  font-family: Source Sans Pro;
  padding-left: 1px;
  text-align: center;
  width: 100%;
`;

const FilterWrapper = styled.tr`
  background-color: rgb(100, 29, 233);
  width: 100%;
`;

const InputFilter = styled.input`
  width: ${(props) => props.width};
  height: 32px;
  margin: 0px 5px;
  border-radius: 4px 4px 4px 4px;
  border: 1px solid #d7dae2;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  color: #4d4f5c;
  font-size: 16px;
  font-family: Source Sans Pro;
`;

const ListWrapper = styled.tr`
  padding: 15px;
  width: 100%;
  > td {
    background-color: ${(props) => props.backgroundColor}
    border-bottom: solid 1px #f1f1f3;
    text-align: center;
    width: 100%;
  }
`;

const TitleWrapper = styled.tr`
  background: #eff1fc;
  height: 42.65px;
`;

const BaselineTd = styled.td`
  vertical-align: baseline;
  text-align: center;
`;

const Wrapper = styled.div`
  display: flex;
  overflow: hidden;
  flex-direction: column;
  background-color: rgb(100, 29, 233);
  padding: 10px 30px;
`;

const BuscarTd = styled.td`
  display: flex;
  flex-direction: row;
  text-align: center;
  align-items: center;
  justify-content: space-evenly;
  height: 100px;
`;

const EditarWrapper = styled.td`
  display: flex;
  height: 55px;
  align-items: center;
  justify-content: center;
  text-align: center;
  border-bottom: solid 1px #f1f1f3;
`;

const HomePage = () => {
  const navigate = useNavigate()
  const { logout,user,getSistema} = useContext(AuthContext);
  const [sistemas, setSistemas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [descricao, setDescricao] = useState("");
  const [senha, setSenha] = useState("");
  const [usuario, setUsuario] = useState("");
  const [totalPage, setTotalPage] = useState(null);
  const [pagina, setPagina] = useState(1);
  const [limit, setLimit] = useState(5);
  const isAdmin = user.data.tipo === "admin";
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const buscarSistema = async () => {
    const result = await getSistemas(filters());
    setSistemas(result.data.data);
    setLoading(false);
    setTotalPage(result.data.total)
    if (result.data.msg) {
      logout();
    }
  }
  useEffect(() => {
    (async () => {
      buscarSistema()
    })();

    return () => {
      if (loading) {
        return <div className="loading">Carregando...</div>;
      }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pagina, limit]);

  const filters = () => {

    let queryFilter = {
      page:pagina,
      limit,
      usuario: usuario ? usuario : null,
      senha: senha ? senha : null,
      descricao: descricao ? descricao : null
    }
    
    return queryFilter
  }

  const handleBuscarSistemas = async () => {
    buscarSistema()
  };

  const deletarSistema = async (id) => {
    confirmAlert({
      title: "Deletar Sistema",
      message: `Essa ação não pode ser desfeita, deseja continuar?`,
      buttons: [
        {
          label: "Sim",
          onClick: () => {
            (async () => {
              const isDeleted = await deleteSistema(id);
              if (isDeleted.data) {
                  buscarSistema()
              }
            })();
          },
        },
        {
          label: "Não",
        },
      ],
    });
  };

const atualizarSistema = (id) => {
  getSistema(id)
}
const novoSistema = () => {
  navigate(`/save`)
}

const handleLimit = (e) => {
  setLimit(e.target.value)
  buscarSistema()
}

const handlePage = (e) => {
   e.preventDefault()
   if(e.target.tagName !== "path" && e.target.tagName !== "svg"){
      setPagina(parseInt(e.target.innerText) )
   }
   if(e.target.parentNode.ariaLabel === "Go to next page"){
      const newOffset = Number(pagina) + Number(1);

       setPagina(newOffset)

   }
   if(e.target.parentNode.ariaLabel === "Go to previous page"){
    const newOffset = Number(pagina) - Number(1);

    setPagina(newOffset)

   }
   buscarSistema()
}

  return (
    <div style={{ marginLeft: "20px" }}>
      <div id="header">
      <React.Fragment>
      <Box sx={{ display: 'flex', alignItems: 'left', textAlign: 'left' }}>
        
        <Tooltip title="Configurações de Conta">
          <IconButton
            className="config"
            onClick={handleClick}
            size="medium"
            sx={{ ml: 2 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            <Avatar sx={{ width: 70, height: 70 }}>{JSON.stringify(user.data.usuario).substring(1,3).toUpperCase()}</Avatar>
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 1,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 10,
              height: 10,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 20,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
 
        <MenuItem onClick={() => navigate("user/alter")}>
        <ListItemIcon>
          <ManageAccountsIcon fontSize="small" className="minhaConta"/>Alterar Conta
       </ListItemIcon>
        </MenuItem>
        <Divider />
        {
        isAdmin &&
        <MenuItem onClick={() => navigate("user/new")}>
          <ListItemIcon>
            <PersonAdd className="outraConta" color="success" fontSize="small" />
          </ListItemIcon>
          Inserir Outra Conta
        </MenuItem>
        }
        <MenuItem onClick={() => logout()}>
          <ListItemIcon>
            <Logout className="logout" color="error" fontSize="small" />
          </ListItemIcon>
          Sair
        </MenuItem>
      </Menu>
    </React.Fragment>

      </div>

      <Wrapper>
        <WrapperList>
          <table
            cellPadding="0"
            cellSpacing="0"
            style={{ tableLayout: "fixed", width: "100%" }}
          >
            <TitleWrapper>
              <TableTitle>Sistema</TableTitle>
              <TableTitle>Usuario</TableTitle>
              <TableTitle>Senha</TableTitle>
              <TableTitle>Ação</TableTitle>
            </TitleWrapper>

            <FilterWrapper>
              <BaselineTd>
                <InputFilter
                  width="90%"
                  name="filterSistema"
                  value={descricao}
                  onChange={(e) => setDescricao(e.target.value)}
                />
              </BaselineTd>

              <BaselineTd>
                <InputFilter
                  width="90%"
                  value={usuario}
                  onChange={(e) => setUsuario(e.target.value)}
                  name="filterUsuario"
                />
              </BaselineTd>

              <BaselineTd>
                <InputFilter
                  width="90%"
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                  name="filterSenha"
                />
              </BaselineTd>

              <BuscarTd>
                <Button
                  variant="contained"
                  onClick={handleBuscarSistemas}
                  endIcon={<SearchIcon />}
                >
                  Buscar
                </Button>

                <Button
                  color="success"
                  variant="contained"
                  onClick={novoSistema}
                  endIcon={<PersonAddAltIcon />}
                >
                  Novo
                </Button>
              </BuscarTd>
            
            </FilterWrapper>
            <tbody>
              {sistemas &&
                sistemas.map((sistema) => {
                  return (
                    <ListWrapper key={sistema._id}>
                      <ContentText>{sistema.descricao}</ContentText>
                      <ContentText>{sistema.usuario}</ContentText>
                      <ContentText>{sistema.senha}</ContentText>

                      <EditarWrapper>
                        <IconButton
                          onClick={() => deletarSistema(sistema._id)}
                          aria-label="delete"
                          size="medium"
                        >
                          <DeleteForeverIcon />
                        </IconButton>
                        <IconButton
                          onClick={() => atualizarSistema(sistema._id)}
                          aria-label="edit"
                          size="medium"
                        >
                          <EditIcon />
                        </IconButton>
                      </EditarWrapper>
                    </ListWrapper>
                  );
                })}
            </tbody>
          </table>
        </WrapperList>
      </Wrapper>
      <div className="paginacao">

      <InputLabel id="limit">Registros por Página:</InputLabel>
        <Select
          id="select"
          defaultValue={limit}
          label="limit"
          onChange={(e) => handleLimit(e)}
        >
          <MenuItem  value="5">5</MenuItem>
          <MenuItem  value="10">10</MenuItem>
          <MenuItem  value="15">15</MenuItem>
        </Select>
        <Stack>
        <Pagination onChange={(e) => handlePage(e)} className="pg" count={totalPage} color="secondary" />
        </Stack>
     </div>

    </div>    
  );
};

export default HomePage;
