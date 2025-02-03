import { Paper } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Formacao } from "types/Turmas";
import { formatDate } from "utils/dates";

interface TurmaFormacoesProps {
  formacoes: Formacao[] | null;
}

function setRows(list: Formacao[] | null) {
  if (list === null) {
    return;
  }
  const rows = list.map((formacao: Formacao) => {
    return {
      id: formacao.formacao_id,
      nome: formacao.nome_formacao,
      data: formatDate(formacao.data),
      cargaHoraria: formacao.carga_horaria,
    };
  });

  return rows;
}

const paginationModel = { page: 0, pageSize: 10 };

export default function TurmaFormacoes({ formacoes }: TurmaFormacoesProps) {
  const linhas = setRows(formacoes);

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 45, disableColumnMenu: true },
    { field: "nome", headerName: "Nome", width: 300 },
    { field: "data", headerName: "Data", width: 100 },
    { field: "cargaHoraria", headerName: "Horas", width: 100 },
  ];

  return (
    <Paper sx={{ width: "100%" }}>
      {!linhas ? (
        <p>A Turma não possuí formacoes</p>
      ) : (
        <DataGrid
          rows={linhas}
          columns={columns}
          initialState={{
            pagination: { paginationModel },
            columns: {
              columnVisibilityModel: {
                id: false,
              },
            },
          }}
          slotProps={{ pagination: { labelRowsPerPage: "Formações por pág" } }}
          pageSizeOptions={[10, 25, 50]}
          sx={{ border: 0 }}
        />
      )}
    </Paper>
  );
}
