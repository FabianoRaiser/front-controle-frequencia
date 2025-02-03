import { MoreHoriz } from "@mui/icons-material";
import { Paper } from "@mui/material";
import {
  DataGrid,
  GridActionsCellItem,
  GridColDef,
  GridRowId,
} from "@mui/x-data-grid";
import { fetchFormacoes } from "api/FormacoesData";
import FormacaoModal from "components/FormacaoModal";
import { useCallback, useEffect, useState } from "react";
import { Formacao } from "types/Formacoes";
import { formatDate } from "utils/dates";

export const FormacoesLista = () => {
  const [lista, setLista] = useState<Formacao[] | null | undefined>(null);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [selectedFormacaoId, setSelectedFormacaoId] = useState<GridRowId | null>(null);

  const paginationModel = { page: 0, pageSize: 10 };

  const showFormacao = useCallback(
    (id: GridRowId) => () => {
      setSelectedFormacaoId(id);
      setOpenModal(true);
    },
    []
  );

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedFormacaoId(null);
  };

  const setRows = (list: Formacao[]) => {
    const rows = list.map((formacao: Formacao) => {
      return {
        id: formacao.formacao_id,
        nome: formacao.nome_formacao,
        cargaHoraria: formacao.carga_horaria,
        data: formatDate(formacao.data),
        local: formacao.local,
        modalidade: formacao.modalidade,
        periodo: formacao.periodo,
      };
    });

    return rows;
  };

  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "id",
      width: 45,
    },
    {
      field: "nome",
      headerName: "Nome",
      width: 160,
    },
    {
      field: "cargaHoraria",
      headerName: "Carga Horaria",
      width: 160,
    },
    {
      field: "data",
      headerName: "Data",
      width: 100,
    },
    {
      field: "local",
      headerName: "Local",
      width: 160,
    },
    {
      field: "modalidade",
      headerName: "Modalidade",
      width: 120,
    },
    {
      field: "periodo",
      headerName: "Periodo",
      width: 120,
    },
    {
      field: "actions",
      type: "actions",
      width: 80,
      getActions: (params) => [
        <GridActionsCellItem
          icon={<MoreHoriz />}
          label="Mostrar Mais"
          onClick={showFormacao(params.id)}
        />,
      ],
    },
  ];

  useEffect(() => {
    const fetchListaFormacoes = async () => {
      const fetchFormacoesData = await fetchFormacoes();
      if (!fetchFormacoes) {
        console.error("Erro ao buscar Formacoes");
      } else {
        setLista(fetchFormacoesData);
      }
    };

    fetchListaFormacoes();
  }, []);

  return (
    <Paper sx={{ width: "100%" }}>
      <DataGrid
        rows={!lista ? [] : setRows(lista)}
        columns={columns}
        initialState={{ pagination: { paginationModel }, columns: {columnVisibilityModel: { id: false}} }}
        slotProps={{ pagination: { labelRowsPerPage: "Formações por pág" } }}
        pageSizeOptions={[10, 25, 50]}
        sx={{ border: 0 }}
      />
      <FormacaoModal open={openModal} handleClose={handleCloseModal} formacaoId={selectedFormacaoId} />
    </Paper>
  );
};
