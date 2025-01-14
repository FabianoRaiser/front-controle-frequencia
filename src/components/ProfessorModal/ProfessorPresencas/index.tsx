import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Presenca,} from "../../../types/Teacher"
import { Paper } from "@mui/material";


interface ProfessorPresencasProps {
    presencas: Presenca[] | null;
}

function setRows(list: Presenca[] | null) {
    if(list === null){
        return 
    }
    const rows = list.map((presenca: Presenca) => {
      return {
        id: presenca.presenca_id,
        nomeFormacao: presenca.formacoes.nome_formacao,
        date: presenca.formacoes.data,
        turma: presenca.formacoes.turmas.nome_turma,
        etapa: presenca.formacoes.turmas.etapa,
        periodo: presenca.formacoes.periodo,
        modalidade: presenca.formacoes.modalidade,
        cargaHoraria: presenca.formacoes.carga_horaria,

      };
    });
  
    return rows;
  }

  const paginationModel = { page: 0, pageSize: 10 };

export default function ProfessorPresencas ({presencas} : ProfessorPresencasProps) {

    const linhas = setRows(presencas);

    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', width: 45, disableColumnMenu: true},
        {
            field: 'nomeFormacao',
            headerName: 'Formação',
            width: 300,
        },
        {
            field: 'date',
            headerName: 'Data',
            width: 100,
        },
        {
            field: 'turma',
            headerName: 'Turma',
            width: 150,
        },
        {
            field: 'etapa',
            headerName: 'Etapa',
            width: 85,
        },
        {
            field: 'periodo',
            headerName: 'Periodo',
            width: 100,
        },
        {
            field: 'modalidade',
            headerName: 'Modalidade',
            width: 100,
        },
        {
            field: 'cargaHoraria',
            headerName: 'Horas',
            width: 75,
        }
    ]

    return (
        <Paper sx={{ width: '100%'}}>
            { !linhas ? (
                <p>O professor não possuí presenças</p>
            ) : (
               <DataGrid
                    rows={linhas}
                    columns={columns}
                    initialState={{ pagination: { paginationModel},
                    columns: {
                        columnVisibilityModel: {
                            id: false,
                        }
                    }
                }}
                    slotProps={{ pagination: {labelRowsPerPage: 'Presenças por pág'}}}
                    pageSizeOptions={[10, 25, 50]}
                    sx={{ border: 0}}
                />
            )
            }
        </Paper>
    )
}