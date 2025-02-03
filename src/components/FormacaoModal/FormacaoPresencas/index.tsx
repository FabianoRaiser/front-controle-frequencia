import { Paper } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import dayjs from "dayjs";
import { PresencasFormacao } from "types/Formacoes";

interface FormacaoPresencasProps {
  presentes: PresencasFormacao[];
}

function setRows(list: PresencasFormacao[]) {
  if (list.length === 0) {
    return;
  }
  const rows = list.map((presenca: PresencasFormacao, index) => {
    return {
      id: presenca.presenca_id,
      numeroPresenca: index + 1,
      matricula: presenca.professores.matricula,
      nome: presenca.professores.nome_professor,
      data: dayjs(presenca.created_at).format('DD/MM/YYYY HH:mm:ss'),
    };
  });

  return rows;
}

const paginationModel = { page: 0, pageSize: 10 };

export default function FormacaoPresencas({
  presentes,
}: FormacaoPresencasProps) {
  const linhas = setRows(presentes);

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 45, disableColumnMenu: true },
    { field: "numeroPresenca", headerName: "Nº", width: 45, disableColumnMenu: true },
    {
      field: "nome",
      headerName: "Professor",
      width: 300,
    },
    {
      field: "matricula",
      headerName: "Matricula",
      width: 100,
    },
    {
      field: "data",
      headerName: "Data Registro",
      width: 175,
    },
  ];

  return (
    <Paper sx={{ width: "100%" }}>
      {!linhas ? (
        <p style={{textAlign: "center", padding: "8px"}}>A Formação não possuí presenças</p>
      ) : (
        <DataGrid
          rows={linhas}
          columns={columns}
          initialState={{ pagination: { paginationModel }, columns: {columnVisibilityModel: { id: false}} }}
          slotProps={{
            pagination: { labelRowsPerPage: "Professores por pág:" },
          }}
          pageSizeOptions={[10, 25, 50]}
          sx={{ border: 0 }}
        />
      )}
    </Paper>
  );
}
