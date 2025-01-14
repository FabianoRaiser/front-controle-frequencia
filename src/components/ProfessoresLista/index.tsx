import { MoreHoriz } from "@mui/icons-material";
import { Paper } from "@mui/material";
import {
  DataGrid,
  GridActionsCellItem,
  GridColDef,
  GridRowId,
} from "@mui/x-data-grid";
import { useCallback, useEffect, useState } from "react";
import { Teacher } from "types/Teacher.ts";
import ProfessorModal from "../ProfessorModal";
import { fetchProfessores } from "api/ProfessorData";

const paginationModel = { page: 0, pageSize: 10 };

function setRows(list: Teacher[]) {
  const rows = list.map((professor: Teacher) => {
    return {
      id: professor.matricula,
      name: professor.nome_professor,
      ue: professor.unidade_ensino,
      admissao: professor.data_admissao,
      email: professor.email,
    };
  });

  return rows;
}

function ProfessoresLista() {
  const [openModal, setOpenModal] = useState(false);
  const [selectedTeacherId, setSelectedTeacherId] = useState<GridRowId | null>(
    null
  );
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState<string>("");
  const [lista, setLista] = useState<Teacher[] | null | undefined>(null);

  const showTeacher = useCallback(
    (id: GridRowId) => () => {
      setSelectedTeacherId(id);
      setOpenModal(true);
    },
    []
  );

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedTeacherId(null);
  };

  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "Matricula",
      width: 140,
    },
    {
      field: "name",
      headerName: "Nome",
      width: 160,
    },
    {
      field: "ue",
      headerName: "Unidade de Ensino",
      width: 160,
    },
    {
      field: "admissao",
      headerName: "Admissão",
      width: 160,
    },
    {
      field: "email",
      headerName: "Email",
      width: 250,
    },
    {
      field: "actions",
      type: "actions",
      width: 80,
      getActions: (params) => [
        <GridActionsCellItem
          icon={<MoreHoriz />}
          label="Mostrar Mais"
          onClick={showTeacher(params.id)}
        />,
      ],
    },
  ];

  useEffect(() => {
    const fetchListaProfessores = async () => {
      const fetchProfessoresData = await fetchProfessores();
      if (!fetchProfessores) {
        console.error("Erro ao buscar unidades");
      } else {
        setLista(fetchProfessoresData);
      }
    }

    fetchListaProfessores();
  }, []);

  // if (loading) return <Paper sx={{ width: "100%" }}>Carregando...</Paper>;
  // if (error) return <Paper sx={{ width: "100%" }}>Erro: {error}</Paper>;

  return (
    <Paper sx={{ width: "100%" }}>
      <DataGrid
        rows={!lista ? [] : setRows(lista)}
        columns={columns}
        initialState={{ pagination: { paginationModel } }}
        slotProps={{ pagination: { labelRowsPerPage: "Professores por pág" } }}
        pageSizeOptions={[10, 25, 50]}
        sx={{ border: 0 }}
      />
      <ProfessorModal
        open={openModal}
        handleClose={handleCloseModal}
        teacherId={selectedTeacherId}
      />
    </Paper>
  );
}

export default ProfessoresLista;
