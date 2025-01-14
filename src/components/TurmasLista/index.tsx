import { MoreHoriz } from "@mui/icons-material";
import { Paper } from "@mui/material";
import {
  DataGrid,
  GridActionsCellItem,
  GridColDef,
  GridRowId,
} from "@mui/x-data-grid";
import { fetchTurmas } from "api/TurmaData";
import TurmaModal from "components/TurmaModal";
import { useCallback, useEffect, useState } from "react";
import { Turma } from "types/Turmas";

function setRows(list: Turma[]) {
  const rows = list.map((turma: Turma) => {
    return {
      id: turma.turma_id,
      name: turma.nome_turma,
      etapa: turma.etapa,
    };
  });

  return rows;
}

const paginationModel = { page: 0, pageSize: 10 };

function TurmasLista() {
  const [selectedTurmaId, setSelectedTurmaId] = useState<GridRowId | null>(
    null
  );
  const [openModal, setOpenModal] = useState(false);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string>("");
  const [lista, setLista] = useState(null);

  const showTurma = useCallback(
    (id: GridRowId) => () => {
      setSelectedTurmaId(id);
      setOpenModal(true);
    },
    []
  );

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedTurmaId(null);
  };

  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "ID",
      width: 140,
    },
    {
      field: "name",
      headerName: "Nome",
      width: 160,
    },
    {
      field: "etapa",
      headerName: "Etapa",
      width: 100,
    },
    {
      field: "actions",
      type: "actions",
      width: 80,
      getActions: (params) => [
        <GridActionsCellItem
          icon={<MoreHoriz />}
          label="Mostrar Mais"
          onClick={showTurma(params.id)}
        />,
      ],
    },
  ];

  useEffect(() => {
    const fetchListaTurmas = async () => {
        const fetchTurmasData = await fetchTurmas();
        if (!fetchTurmas) {
            console.error("Erro ao buscar unidades");
        } else {
            setLista(fetchTurmasData);
        }
    };

    fetchListaTurmas();
  }, []);

  return (
    <Paper sx={{ width: "100%" }}>
      <DataGrid
        rows={!lista ? [] : setRows(lista)}
        columns={columns}
        initialState={{ pagination: { paginationModel } }}
        slotProps={{ pagination: { labelRowsPerPage: "Turmas por pág" } }}
        pageSizeOptions={[10, 25, 50]}
        sx={{ border: 0 }}
      />
      <TurmaModal
        open={openModal}
        handleClose={handleCloseModal}
        turmaId={selectedTurmaId}
      />
    </Paper>
  );
}

export default TurmasLista;