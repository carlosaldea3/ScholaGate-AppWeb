import Header from "../components/Header";
import styled from "styled-components";
import UserCard from "../components/UserCard";
import TablaReportes from "../components/TablaReportes";
import TablaUsuarios from "../components/TablaUsuarios";
import { getReportes } from "../services/authService";
import { getUsers } from "../services/authService";
import React, { useState, useEffect } from "react";
import { getUsuarioActual } from "../services/authService";

const TablaReportesStyled = styled.div`
  padding-bottom: 20px;
`;

const TablaUsuariosStyled = styled.div`
  padding-top: 20px;
`;

const columnsReportes = [
  {
    header: "Alumno",
    accessorKey: "id",
  },

  {
    header: "Profesor",
    accessorKey: "name",
  },
  {
    header: "Tipo",
    accessorKey: "lastname",
  },
  {
    header: "Motivo",
    accessorKey: "email",
  },
  {
    header: "Fecha",
    accessorKey: "country",
  },
];

const HomePage = () => {
  const [reportes, setReportes] = useState([]);

  useEffect(() => {
    getUsuarioActual(localStorage.getItem("jwt"))
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error("Error obteniendo el usuario actual:", error);
      });

    getReportes(localStorage.getItem("jwt"))
      .then((data) => {
        setReportes(data);
      })
      .catch((error) => {
        console.error("Error obteniendo los reportes:", error);
      });
  }, []);

  return (
    <Container>
      <Header />
      <UserCard />
      <TablaReportesStyled>
        <TablaReportes data={reportes} columns={columnsReportes} />
      </TablaReportesStyled>
    </Container>
  );
};

export default HomePage;

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;
