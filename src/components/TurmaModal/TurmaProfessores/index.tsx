import { Check, Close } from "@mui/icons-material";
import { Paper } from "@mui/material";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { Alocacao } from "types/Turmas";
import { formatDate } from "utils/dates";

interface TurmaProfessoresProps {
  listaProfessores: Alocacao[] | null;
}

function setRows(list: Alocacao[] | null) {
  if (list === null) {
    return;
  }
  const rows = list.map((alocacao: Alocacao) => {
    return {
      id: alocacao.id,
      matricula: alocacao.professores.matricula,
      nome: alocacao.professores.nome_professor,
      ativa: alocacao.ativa,
      dataInicio: formatDate(alocacao.data_inicio),
      dataFinal: formatDate(alocacao.data_final),
    };
  });

  return rows;
}

const paginationModel = { page: 0, pageSize: 10 };

export default function TurmaProfessores({
  listaProfessores,
}: TurmaProfessoresProps) {
  const linhas = setRows(listaProfessores);

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 45, disableColumnMenu: true },
    { field: "matricula", headerName: "Matricula", width: 150 },
    { field: "nome", headerName: "Nome", width: 300 },
    {
      field: "ativa",
      headerName: "Ativo",
      width: 150,
      renderCell: (params: GridRenderCellParams) => {
        if (params.value === true) {
          return <Check />;
        }
        <Close />;
      },
    },
    { field: "dataInicio", headerName: "Data Inicio", width: 100 },
    { field: "dataFinal", headerName: "Data Final", width: 100 },
  ];

  return (
    <Paper sx={{ width: "100%" }}>
      {!linhas ? (
        <p>A turma não tem professores</p>
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
          slotProps={{
            pagination: { labelRowsPerPage: "Professores por pág" },
          }}
          pageSizeOptions={[10, 25, 50]}
          sx={{ border: 0 }}
        />
      )}
    </Paper>
  );
}
