import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Check, Close } from "@mui/icons-material";
import { Alocacao } from "../../../types/Teacher";
import { GridRenderCellParams } from "@mui/x-data-grid";
import { Box, Paper } from "@mui/material";
import { formatDate } from "utils/dates";

interface ProfessorTurmasProps {
  alocacoes: Alocacao[] | null;
}

function setRows(list: Alocacao[] | null) {
  if (list === null) {
    return;
  }
  const rows = list.map((alocacao: Alocacao) => {
    return {
      id: alocacao.id,
      nomeTurma: alocacao.turmas.nome_turma,
      date_inicio: formatDate(alocacao.data_inicio),
      date_final: formatDate(alocacao.data_final),
      ativa: alocacao.ativa,
      etapa: alocacao.turmas.etapa,
    };
  });

  return rows;
}

const paginationModel = { page: 0, pageSize: 10 };

export default function ProfessorTurmas({ alocacoes }: ProfessorTurmasProps) {
  const linhas = setRows(alocacoes);

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 45, disableColumnMenu: true },
    {
      field: "nomeTurma",
      headerName: "Turma",
      width: 300,
    },
    {
      field: "date_inicio",
      headerName: "Data Inicio",
      width: 100,
    },
    {
      field: "date_final",
      headerName: "Data Saída",
      width: 100,
    },
    {
      field: "ativa",
      headerName: "Ativo",
      width: 150,
      renderCell: (params: GridRenderCellParams) => {
        if (params.value === true) {
          return (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "100%",
              }}
            >
              <Check />
            </Box>
          );
        }
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
          }}
        >
          <Close />;
        </Box>;
      },
    },
    {
      field: "etapa",
      headerName: "Etapa",
      width: 85,
    },
  ];

  return (
    <Paper sx={{ width: "100%" }}>
      {!linhas ? (
        <p>O professor não tem alocações</p>
      ) : (
        <DataGrid
          rows={linhas}
          columns={columns}
          initialState={{
            columns: {
              columnVisibilityModel: {
                id: false,
              },
            },
            pagination: { paginationModel },
          }}
          slotProps={{ pagination: { labelRowsPerPage: "Turmas por pág" } }}
          pageSizeOptions={[10, 25, 50]}
          sx={{ border: 0 }}
        />
      )}
    </Paper>
  );
}
